---
title: 'The cache scheduled the outage: stampedes, avalanches and how to survive midnight'
description: 'A backend interview classic — 10,000 rps in front of a 1,000 rps database, one cache, one shared TTL, and a database that dies at 00:00:00. What the failure is actually called, why it does not recover on its own, and the full ladder of fixes: TTL jitter, single-flight coalescing, stale-while-revalidate, probabilistic early expiry and load shedding.'
date: '2026-08-16'
cover: '/images/articles/cache-stampede-cover.webp'
tags:
    - Caching
    - Reliability
    - System Design
    - Redis
category: 'System Design'
difficulty: 'Intermediate'
tech:
    - Redis
    - PostgreSQL
    - Laravel
    - TypeScript
learn:
    - The precise names — stampede, avalanche, penetration, hot key — and which one this is
    - Why the database does not recover once the herd arrives, even after midnight passes
    - TTL jitter, single-flight locks, stale-while-revalidate and probabilistic early expiry
    - How to make a cache an optimisation again instead of a load-bearing dependency
draft: false
---

The setup is one of the cleanest interview questions in backend systems, because
everything in it is correct except the outcome:

> Your API is getting 10,000 requests per second. The database can handle 1,000 per
> second. You add a cache. The cache expires at midnight. At 12:00:00 AM, 10,000
> requests hit the database simultaneously. The database crashes. The cache was supposed
> to protect the database — it just scheduled the attack. What's this called and how do
> you fix it?

Two questions, so two answers. The name is **cache stampede** — also called a
_thundering herd_ or the _dogpile effect_. The specific flavour here, where a whole
population of keys expires on the same instant, is usually called a **cache avalanche**.

But the fix is not one technique, and the interesting part of the answer is _why_. The
cache did not fail. It did exactly what it was told. The design error is that a
**synchronised deadline was allowed to exist at all**, and underneath that, a deeper
one: the system was built so that a cache miss is free to fan out.

## Step 0: get the names right

Four failures get muddled under "cache problem". They have different triggers and
different fixes, and naming yours correctly is half the interview.

| Name                                    | Trigger                                                            | Fix direction                                   |
| --------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| **Stampede** (dogpile, thundering herd) | One hot key expires; every concurrent request misses at once       | Coalesce the miss — one recompute, many waiters |
| **Avalanche**                           | Many keys expire simultaneously (shared TTL, cache restart, flush) | Desynchronise — jitter every TTL                |
| **Penetration**                         | Requests for keys that will never exist; every one is a miss       | Negative caching, bloom filter, validation      |
| **Hot key**                             | One key so popular it saturates a single cache shard/node          | Replicate the key, add an in-process L1 tier    |

The scenario in the question is an **avalanche that becomes a stampede**: one clock edge
invalidates everything, and then each individual key is stampeded by the thousands of
requests that arrive in the same second.

Worth saying plainly, because it is the sentence the interviewer is waiting for: _the
cache was never protecting the database. It was hiding the fact that the database was
already 10× under-provisioned for the offered load._

## Step 1: the napkin math, including why it never recovers

Do the arithmetic before proposing anything. It changes what "fix" means.

> **Napkin math:** 10,000 rps arriving, 1,000 rps of database capacity.
>
> - The cache must absorb **9,000 rps** — a **90% hit ratio is load-bearing**, not an
>   optimisation.
> - At 00:00:00 the hit ratio goes to **0%**. Offered load is **10× capacity**.
> - Queue growth ≈ `10,000 − 1,000 = 9,000 requests per second` of backlog. A 500-slot
>   connection pool is exhausted in **~55 ms**.
> - Every queued request is still holding a connection, a thread and memory while it
>   waits, so latency climbs until clients time out — and then **retry**.

That last line is the whole reason "the database crashes" rather than "the database gets
slow for a moment". Timeouts turn one request into three. Retries add load exactly when
load is the problem, so the arrival rate _rises_ as capacity falls.

> [!IMPORTANT]
> Once that loop is running, removing the trigger does not fix it. It is 00:00:04, the
> midnight edge has passed, and the system stays down — because the retries are now the
> load. This is a **metastable failure**: a stable-but-broken state sustained by a
> feedback loop the original trigger no longer participates in.[^metastable]
>
> The practical consequence: your recovery plan cannot be "wait". It has to be **shed
> load** — drop or reject enough traffic to let the cache refill, then let it back in.

That is also why the fixes below come in two families. Steps 2–5 stop the herd forming.
Step 6 makes sure that when something else forms a herd anyway, the system bends instead
of dying. You need both; only one of them is about caching.

## Step 2: jitter every TTL

The one-line fix, and the one that specifically kills the avalanche. If every key gets
the same TTL, or worse a TTL computed to a wall-clock boundary, every key expires
together forever after.

```ts
const BASE_TTL = 300; // 5 minutes

/** Base TTL plus up to 20% of random spread, so two keys never share a deadline. */
const ttlWithJitter = () => BASE_TTL + Math.floor(Math.random() * BASE_TTL * 0.2);

await redis.set(key, JSON.stringify(value), 'EX', ttlWithJitter());
```

```php
// Laravel: same idea, and the place people usually forget it is the "cache until
// midnight" helper, which is a synchronised deadline by construction.
Cache::put($key, $value, now()->addMinutes(5)->addSeconds(random_int(0, 60)));
```

> [!CAUTION]
> `Cache::put($key, $value, now()->endOfDay())` and `EXPIREAT <midnight>` are the exact
> bug in the question. Any TTL expressed as _a moment_ rather than _a duration_
> synchronises every key that uses it. Search your codebase for `endOfDay`,
> `midnight`, `startOfDay` and `EXPIREAT` — that grep is the first thing to run.

Jitter costs nothing and removes the correlated failure. It does not, however, help when
a single hot key expires — for that, keep going.

## Step 3: coalesce the miss (single-flight)

Even a perfectly jittered cache has misses, and a hot key's miss is served to every
concurrent request at once. 10,000 requests miss the same key; 10,000 identical queries
hit the database; 9,999 of them are pure waste, because they all compute the same
answer.

The fix is a lock per key: **one request recomputes, the rest wait for it.**

```ts
const RELEASE = `if redis.call("get", KEYS[1]) == ARGV[1]
                 then return redis.call("del", KEYS[1]) else return 0 end`;

async function getCoalesced<T>(key: string, load: () => Promise<T>): Promise<T> {
    const hit = await redis.get(key);
    if (hit) return JSON.parse(hit) as T;

    // NX + PX: exactly one caller wins, and the lock self-heals if that caller dies.
    const lockKey = `lock:${key}`;
    const token = crypto.randomUUID();
    const won = await redis.set(lockKey, token, 'NX', 'PX', 5_000);

    if (!won) {
        // Someone else is already computing this. Wait for their result — with jitter,
        // so the losers do not re-converge into a second herd.
        await sleep(50 + Math.random() * 50);
        const filled = await redis.get(key);
        if (filled) return JSON.parse(filled) as T;
        throw new ServiceBusyError(); // shed, rather than pile onto the database
    }

    try {
        const fresh = await load();
        await redis.set(key, JSON.stringify(fresh), 'EX', ttlWithJitter());
        return fresh;
    } finally {
        // Release only if we still hold it: our 5s lease may have expired mid-flight.
        await redis.eval(RELEASE, 1, lockKey, token);
    }
}
```

```php
// Laravel ships this: the second argument is how long to wait for the holder.
$value = Cache::lock("lock:{$key}", 5)->block(2, fn () => Cache::remember(
    $key,
    $ttl,
    fn () => $this->expensiveQuery()
));
```

Three details that separate a working lock from a decorative one:

1. **The lock must expire** (`PX 5000`). A holder that crashes without a TTL wedges the
   key forever, converting a stampede into a permanent outage.
2. **Release must be conditional** on still owning the token. Otherwise a slow holder
   deletes the lock a _later_ holder is using, and you are back to concurrent recomputes.
3. **The waiters need a plan.** Waiting forever just moves the queue from the database
   into your app servers. Wait briefly, then either serve stale (Step 4) or shed.

## Step 4: serve stale while you revalidate

Locking makes the herd wait. Not waiting at all is better: keep the old value available
_past_ its freshness deadline, hand it to everyone, and refresh in the background.

The mechanism is a **logical expiry inside the value**, with the physical TTL set well
beyond it — so the key is never actually absent.

```ts
type Cached<T> = { value: T; freshUntil: number };

async function getSWR<T>(key: string, load: () => Promise<T>): Promise<T> {
    const raw = await redis.get(key);

    if (raw) {
        const entry = JSON.parse(raw) as Cached<T>;
        if (Date.now() > entry.freshUntil) {
            // Stale but usable: one caller refreshes, everyone gets an answer now.
            void refreshInBackground(key, load);
        }
        return entry.value;
    }

    return getCoalesced(key, load); // genuinely cold: fall back to the lock
}
```

```php
// Laravel 11.23+: fresh for 5 minutes, usable for 15, refreshed after the response.
$value = Cache::flexible($key, [300, 900], fn () => $this->expensiveQuery());
```

This changes the failure mode qualitatively. Under lock-only, a miss means _latency_ for
thousands of users. Under stale-while-revalidate, a miss means _slightly old data_ for
one refresh interval, which is almost always the better trade for the kind of data
worth caching in the first place.

```flow
title: One key expires — three designs
packets: on

scenario "Naive TTL (the outage)"
> Every concurrent request misses, and every miss becomes its own query.
Clients [10,000 rps] --> Cache (GET key) {neutral}
Cache [expired] --> Clients (MISS x 10,000) {blocked}
Clients --> DB (10,000 identical queries) {blocked}
DB [ceiling 1,000 rps] --> Clients (timeouts, then retries) {blocked}
> Retries raise the load. The system stays down after midnight passes.

scenario "Single-flight lock"
> One request recomputes; the rest wait on the winner and read the filled key.
Clients --> Cache (GET key) {neutral}
Cache --> Clients (MISS) {neutral}
Clients --> Lock (SET NX PX 5000) {secure}
Lock [one winner] --> DB (1 query) {secure}
DB --> Cache (SET key, ttl + jitter) {allowed}
Cache --> Clients (HIT for the 9,999 waiters) {allowed}
> The database sees one query instead of ten thousand — but the waiters queued.

scenario "Stale-while-revalidate"
> Nobody waits: the old value is served while one background job refreshes it.
Clients --> Cache (GET key) {neutral}
Cache [stale but present] --> Clients (HIT, slightly old) {allowed}
Cache --> Refresh (spawn one refresh) {secure}
Refresh --> DB (1 query, off the request path) {secure}
DB --> Cache (SET key, fresh) {allowed}
> Latency never moves. Freshness degrades for one interval instead.
```

## Step 5: expire early, on purpose

There is a subtler technique worth knowing because it is the one interviewers rarely
hear: rather than every client discovering expiry at the same instant, let each client
_probabilistically decide to refresh early_, with a probability that rises as the
deadline approaches. Expensive-to-compute values get refreshed sooner than cheap ones,
automatically.

```ts
/**
 * XFetch: recompute early with rising probability near expiry.
 *  delta = how long the last recompute took, beta = aggressiveness (1 is a good start)
 */
function shouldRecomputeEarly(delta: number, beta: number, expiryMs: number): boolean {
    return Date.now() - delta * beta * Math.log(Math.random()) >= expiryMs;
}
```

Because `-ln(random())` is usually small and occasionally large, most requests do
nothing and a few refresh ahead of time — so the key is almost never found expired, and
no coordination is required between clients.[^xfetch] It composes well with Step 4:
stale-while-revalidate guarantees an answer, early expiry means you rarely need it.

## Step 6: make the database survivable when the herd forms anyway

Everything above reduces the probability of a herd. None of it bounds the damage when
one forms for a reason you did not anticipate — a cache node restart, a deploy that
changes the key prefix, a `FLUSHDB`, a bug. So the database needs its own protection,
and this is the half of the answer most candidates miss.

**Cap concurrency, don't queue infinitely.** The database can serve 1,000 rps. Let it
receive at most what it can serve, and reject the rest immediately.

```ts
// A semaphore in front of the pool: fail fast instead of queueing forever.
const dbSlots = new Semaphore(200);

async function query<T>(fn: () => Promise<T>): Promise<T> {
    if (!dbSlots.tryAcquire()) throw new ServiceBusyError(); // 503, in ~0 ms
    try {
        return await fn();
    } finally {
        dbSlots.release();
    }
}
```

A fast `503` is a vastly better outcome than a slow success: it releases the client's
connection, keeps your app servers healthy, and — crucially — keeps the database alive
so the cache can refill.

**Kill retry amplification.** Retries are what convert overload into collapse. Every
retry must use exponential backoff with **full jitter**, must have a maximum attempt
count, and should be gated by a circuit breaker that stops trying at all once the error
rate is obviously systemic.

```ts
const backoff = (attempt: number) => Math.random() * Math.min(30_000, 200 * 2 ** attempt);
```

**Bound the work per request.** `statement_timeout` in PostgreSQL, `max_execution_time`
in MySQL. A query that will be abandoned by its client at 2 s should not keep burning
database CPU for 30 s.

**Add a second cache tier.** An in-process LRU in front of Redis (an L1) collapses a
node's simultaneous misses to one network call and survives a Redis restart. It costs
memory and a few seconds of extra staleness.

**Warm deliberately.** For a known cold start — a deploy, a failover, a planned flush —
refill the top keys from a background job before traffic reaches them, and ramp traffic
in rather than opening the gate at once.

## Which fix for which symptom

| Symptom                                   | Fix                                                     | Cost                      |
| ----------------------------------------- | ------------------------------------------------------- | ------------------------- |
| Everything expires at once                | **TTL jitter** (durations, never wall-clock moments)    | None                      |
| One hot key, many concurrent misses       | **Single-flight lock**                                  | Waiters queue briefly     |
| Latency spikes on every refresh           | **Stale-while-revalidate**                              | Serves slightly old data  |
| Refreshes still cluster at the deadline   | **Probabilistic early expiry**                          | A few extra recomputes    |
| Repeated misses for keys that don't exist | **Negative caching / bloom filter**                     | Memory; false positives   |
| Cache node restart floods the DB          | **L1 in-process tier + warm-up job**                    | Memory, extra staleness   |
| Any herd at all reaches the database      | **Concurrency cap + fast 503**                          | Some requests fail loudly |
| Overload does not recover on its own      | **Load shedding, backoff with jitter, circuit breaker** | Deliberate rejection      |

The first row is the answer to the question as asked. The rest is the answer to _"and
what else would you do?"_, which is the question actually being asked.

## The one-paragraph answer

If the interviewer wants it in thirty seconds: _It's a cache stampede — a thundering
herd — and because every key shares one expiry instant it's the avalanche variant. The
proximate bug is a TTL expressed as a wall-clock moment instead of a duration, so I'd
jitter every TTL first: `ttl + rand(0, 0.2 × ttl)`. That fixes the correlation but not
the hot-key case, so next I'd coalesce misses behind a per-key lock with `SET NX PX` so
one request recomputes while the rest wait, and better still serve stale-while-revalidate
— keep a logical expiry inside the value with a longer physical TTL, so the key is never
absent and refreshes happen off the request path. Probabilistic early expiry spreads the
refreshes further. But I'd also point out the real problem: a 90% hit ratio is
load-bearing, so the cache isn't an optimisation, it's a dependency — and once the herd
arrives, retries sustain the overload after midnight has passed, which is a metastable
failure. So the database needs a concurrency cap that returns a fast 503, statement
timeouts, and retries with full-jitter backoff behind a circuit breaker, so it degrades
instead of crashing and the cache gets a chance to refill._

## What the question is really testing

The midnight TTL is a prop. The transferable moves:

1. **Never let a deadline be shared.** Anything scheduled — TTLs, cron jobs, token
   refreshes, retry timers, health checks — needs jitter, or you have built a
   synchronised load spike.
2. **Know when an optimisation became a dependency.** If removing the cache means an
   outage, it is infrastructure, and it needs the availability design of infrastructure.
3. **Deduplicate work that is identical.** 10,000 requests for one value is one query
   plus a fan-out, not 10,000 queries.
4. **Prefer stale to absent.** For most cached data, slightly old is a far cheaper
   failure than slow or missing.
5. **Design the overload path, not just the happy path.** Systems do not fail gracefully
   by default; shedding load is a feature you build on purpose, and it is the only thing
   that gets you out of a metastable collapse.

The same five apply to a token that all clients refresh hourly, a cron that runs at
`0 * * * *` on every node, and a mobile app that retries on the same schedule after a
blip. Midnight is just where they are easiest to see.

[^metastable]:
    Metastable failure describes a system that stays in a degraded, self-sustaining
    state after its trigger is gone, because a feedback loop — usually retries — has
    become the load. The distinguishing test is that removing the original trigger does
    not restore service; only reducing the load does.

[^xfetch]:
    The probabilistic early-expiry approach is from Vattani, Chierichetti and Lowenstein,
    _Optimal Probabilistic Cache Stampede Prevention_ (VLDB 2015). Storing `delta` — the
    time the last recomputation took — is what makes expensive keys refresh earlier than
    cheap ones without any per-key tuning.
