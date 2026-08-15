# Entity consolidation checklist

Field-by-field changes on the external profiles that already rank for your name, so they point at
kzaman.com instead of competing with it. Most of this is account settings, not code.

Current state verified 15 Aug 2026 via each platform's public API or profile HTML.

## Status — P0 closed ✅

Re-verified 15 Aug 2026. All six P0 items and four P1 items are live and confirmed at the source:

| Profile       | Field   | Verified value           |
| ------------- | ------- | ------------------------ |
| LinkedIn      | Website | `kzaman.com (Portfolio)` |
| LeetCode      | Website | `https://kzaman.com`     |
| LeetCode      | Name    | `Md Kamruzzaman`         |
| LeetCode      | Company | `weDevs`                 |
| wordpress.org | Website | `kzaman.com`             |
| wordpress.org | Name    | `Md Kamruzzaman`         |
| GitHub        | Website | `https://kzaman.com`     |
| GitHub        | Name    | `Md Kamruzzaman`         |
| GitHub        | Company | `weDevs`                 |
| Codeforces    | Name    | `Md` / `Kamruzzaman`     |

Every profile that outranks kzaman.com for `kzamanbd` now points at it. **That was the gate, and it
is closed.**

### P1 — website fields all done, three name fields left

| Profile    | Website                     | Name                                 |
| ---------- | --------------------------- | ------------------------------------ |
| X          | `kzaman.com` ✅             | `Kamruzzaman` — wants `Md` prefix    |
| YouTube    | `kzaman.com` ✅             | `Kamruzzaman` — wants `Md` prefix    |
| Codeforces | not set ❌                  | `Md Kamruzzaman` ✅                  |
| Facebook   | `kzaman.me` ❌ **dead DNS** | `Zaman (زمان)` — no canonical string |

### The two links still pointing at dead or retired domains

> **Facebook (item 8).** The Links field reads `kzaman.me`, which has **no DNS record at all** —
> the single outbound link on a 1K-follower profile resolves to nothing.
>
> **GitHub profile README (item 9).** Still
> `Want to know more about me? [Check out my Portfolio.](https://kzamanbd.github.io/)`.
> That page ranks for `kzamanbd`, and its one call-to-action nominates the retired domain.

Those two are the highest-value open items. After them, the rest of P1 is name strings, and the
gating factor becomes Google's crawl schedule — the pages were queued for indexing on 15 Aug.

---

## The two targets

You have set two keywords. Both are **person-entity queries**, which means neither is won with
content — they are won by being the entity Google resolves the name to. What follows is the full
path to both, with an honest read on each.

### Target 1 — `Kamruzzaman`

Live SERP today is a disambiguation page: a set of different people who share the name.

| #   | Who holds it                          | What they are                            |
| --- | ------------------------------------- | ---------------------------------------- |
| 1   | **Wikipedia** — Muhammad Kamaruzzaman | Bangladeshi politician, executed 2015    |
| 2   | Dr. Md. Kamruzzaman                   | Professor, Khulna University             |
| 3   | News video carousel                   | MP Kamruzzaman, Dhaka Tribune / Somoy TV |
| 4   | Kamruzzaman Kamruzzaman               | Facebook public figure, 116.7K followers |
| 5   | Dr. Md Kamruzzaman                    | ResearchGate, DU Physics                 |
| 6   | Muhammad Kamruzzaman                  | Jahangirnagar University                 |
| 7   | Muhammad Kamruzzaman                  | Cricketer, Cricinfo                      |
| 8   | Dr. M Kamruzzaman                     | Gazipur Agricultural University          |
| 9   | Mohammad Kamruzzaman                  | Google Scholar, cited 2,212 times        |

Google is already asking _"What is Kamruzzaman known for?"_ in People Also Ask — it knows the name
is ambiguous and is looking for entities to attach to it. **That is the opening.** You do not have
to beat the politician; you have to become one of the people Google lists. Page 1 is realistic.
Position 1 means outranking a Wikipedia biography plus an active news cycle, which is not.

### Target 2 — `Zaman`

Harder, and a different problem. That SERP is commercial, not personal:

| #   | Who holds it                                                           | What they are                                  |
| --- | ---------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | zaman-it.com **+ sitelinks**                                           | Web agency, founded 2008                       |
| 2   | zamanit.com.bd                                                         | Their second domain                            |
| 3   | zamangroup.com.bd                                                      | Conglomerate, 15+ units, owns Best Electronics |
| 4–8 | LinkedIn, zamanworld.com, K ZAMAN sneakers, DU faculty, zamanwater.com | fashion, retail, water purifiers               |

Google's own _People also search for_ on `zaman`: **Zaman clothing, Zaman jeans, Zaman jacket,
Zaman world, Zaman meaning, Zaman Group owner, Zaman Corporation, Zaman pants.**

The demand behind the word is shopping and company lookup, and "zaman" is also the Arabic word for
_time_. There is no ranking factor that converts that intent into a personal portfolio, and the
work needed is not SEO — it is brand search volume, which only exists if people start typing
_"zaman"_ meaning you.

**The one legitimate route to this query is the entity route:** get Google to recognise you as a
notable _Person_ entity named Kamruzzaman/Zaman, at which point you can surface in the Zaman entity
cluster and in Knowledge Graph results for name variants. That is what §"Entity authority" below
builds. It is a 12-month-plus play with real uncertainty, and it is the version of this target that
can actually happen. Chasing the blue link at position 1 cannot.

**Both targets share the same first step**, which is the rest of this document: right now
kzaman.com does not even rank for `kzamanbd`, your own username. Google's AI Overview describes you
correctly and cites LinkedIn, GitHub and Codeforces — never your site — because every profile that
ranks points somewhere else. Fix that before anything else; a site Google cannot attach to your
name cannot compete for the name.

---

## The name string — settled: `Md Kamruzzaman`

Every profile reads exactly **`Md Kamruzzaman`**, matching `Person.name` on the site. `kzamanbd`
stays as the handle, which is correct — it is the `alternateName`.

This was worth arguing about, because the target keyword is `Kamruzzaman` without the prefix, so
the shorter form looks like the better choice. It is not:

- **The prefix does not block the match.** Google tokenizes. A title reading
  `Md Kamruzzaman — Full Stack Software Engineer` contains the token `Kamruzzaman` and is fully
  eligible for that query. The prefix is one extra token, not a barrier — so the exact-match
  argument for the short form is much weaker than the consistency argument against it.
- **Consistency is the actual mechanism.** Google has to decide that eight profiles and this site
  are one person. Matching name strings is how it does that, and one string across all eight beats
  a string that is right on six.
- **It is the name of record** — LinkedIn, the resume, the professional identity. Knowledge Graph
  prefers the fullest form of a person's name, and that is what a panel would eventually display.
- **It is less work.** Five profiles already carry it; standardising on the short form would mean
  six changes and undoing finished work.

**What the name choice does _not_ do:** help the `Zaman` target. `Kamruzzaman` and `Zaman` are
different tokens — the shared substring does not transfer. That association comes from
`alternateName` and the `kzaman.com` domain. Do not let target 2 influence this decision.

**What actually disambiguates you is the descriptor, not the prefix.** Nine people named
Kamruzzaman rank on page 1 and most of them carry `Md`/`Mohammad`/`Muhammad` too — the prefix
separates you from none of them. `Software Engineer`, `weDevs`, `Dokan`, `Dhaka` do. Every profile
should carry those, and that is a bigger lever than either name variant.

---

## Do these three first

Everything still open is either a link or a name. **The links are worth an order of magnitude
more** — a name variant is a weak signal, a link pointing at a dead domain is an active one.

| Order | Item | Where                 | Current                         | Change to            |
| ----- | ---- | --------------------- | ------------------------------- | -------------------- |
| 1     | 8    | Facebook → Links      | `kzaman.me` — **no DNS record** | `https://kzaman.com` |
| 2     | 9    | GitHub profile README | `kzamanbd.github.io`            | `https://kzaman.com` |
| 3     | 5    | Codeforces → Website  | unset                           | `https://kzaman.com` |

The three remaining name fields — X, YouTube, Facebook — are cosmetic by comparison. Do them when
convenient, not before the links.

---

## P0 — actively wrong, fix first

### 1. LeetCode website points at a stranger's site

`leetcode.com/u/kzamanbd` → Edit Profile

| Field   | Current                     | Change to            |
| ------- | --------------------------- | -------------------- |
| Website | `https://kzaman.vercel.app` | `https://kzaman.com` |
| Name    | `KAMRUZZAMAN`               | `Md Kamruzzaman`     |
| Company | `Mononsoft Ltd.`            | `weDevs`             |

`kzaman.vercel.app` is live and returns **200**, but its title is **"Md Kzaman Chowdhury"** — it
belongs to a different person. You are currently telling Google that kzamanbd's website is someone
else's portfolio. That is worse than having no link: it associates your identity with another
person's domain.

The company field is also two years stale — you left MononSoft in October 2024.

- [x] LeetCode website → `https://kzaman.com`
- [x] LeetCode name → `Md Kamruzzaman`
- [x] LeetCode company → `weDevs`

### 2. LinkedIn portfolio points at GitHub

`linkedin.com/in/kzamanbd` → Edit intro → Website (or Contact info → Website)

| Field               | Current                       | Change to                  |
| ------------------- | ----------------------------- | -------------------------- |
| Website / Portfolio | `https://github.com/kzamanbd` | `https://kzaman.com`       |
| Name                | `Md Kamruzzaman` ✅           | already correct — leave it |

LinkedIn is your strongest-ranking profile and it currently nominates GitHub as your portfolio, so
Google ranks GitHub. Keep a GitHub link if you want one, but the field labelled _portfolio_ should
be the site.

- [x] LinkedIn website → `https://kzaman.com`
- [ ] Add `kzaman.com` to the About section text as well — plain text is fine, it still corroborates

### 3. wordpress.org profile has no website

`profiles.wordpress.org/kzamanbd` → Edit profile

| Field        | Current       | Change to            |
| ------------ | ------------- | -------------------- |
| Website      | not set       | `https://kzaman.com` |
| Display name | `Kamruzzaman` | `Md Kamruzzaman`     |

This is the single most topically relevant profile you own — it is the one that corroborates
"this person builds WordPress plugins", which is the territory the content strategy targets. It is
in the site's `sameAs` list already; right now that claim is one-directional.

- [x] wordpress.org website → `https://kzaman.com`
- [x] wordpress.org display name → `Md Kamruzzaman`

---

## P1 — reciprocate the rest of `sameAs`

The site now claims eight profiles in its `Person.sameAs`. A `sameAs` claim is worth what the
destination confirms, so each one should carry kzaman.com back.

### 4. GitHub — nearly right

`github.com/settings/profile`

| Field   | Current                    | Change to            |
| ------- | -------------------------- | -------------------- |
| Website | `kzaman.com`               | `https://kzaman.com` |
| Name    | `Kamruzzaman`              | `Md Kamruzzaman`     |
| Company | `weDevs ` (trailing space) | `weDevs`             |
| Twitter | `kzamanhq` ✅              | already correct      |

The website field is already set, which is good — adding the scheme just removes any ambiguity
about what it resolves to.

- [x] GitHub website → `https://kzaman.com`
- [x] GitHub name → `Md Kamruzzaman`
- [x] GitHub company → `weDevs` (drop trailing space)

### 5. Codeforces

`codeforces.com/settings/social`

| Field      | Current       | Change to            |
| ---------- | ------------- | -------------------- |
| First name | `Kamruzzaman` | `Md`                 |
| Last name  | not set       | `Kamruzzaman`        |
| Website    | —             | `https://kzaman.com` |

Organization (`Southeast University`), city and country are already correct.

- [x] Codeforces first/last name → `Md` / `Kamruzzaman`
- [ ] Codeforces website → `https://kzaman.com` — not set yet; no kzaman.com link renders on the profile page

### 6. X — `@kzamanhq`

Verified in a browser 15 Aug 2026. Website now reads `kzaman.com` ✅. Display name is still
`Kamruzzaman`.

- [x] Profile → Edit profile → Website → `https://kzaman.com`
- [ ] Name → `Md Kamruzzaman` — low priority, cosmetic; do the links first

### 7. YouTube — `@kzamanhq`

Verified 15 Aug 2026: `kzaman.com` renders on the channel ✅.

The channel description is still DraftScripts-era copy — _"Crafting Creativity Through Words! Join
us on a journey of scriptwriting tips…"_. A profile that corroborates your identity should describe
the identity it corroborates; right now this one says you make scriptwriting videos.

- [x] Channel customization → Basic info → Links → add `kzaman.com` as the featured link
- [ ] Rewrite the channel description to the software-engineering bio (this one matters — the
      descriptor is what disambiguates), and set the name to `Md Kamruzzaman` (cosmetic)

### 8. Facebook — links to the dead domain

Read in a browser 15 Aug 2026 (Facebook blocks automated requests).

| Field | Current                            | Change to                             |
| ----- | ---------------------------------- | ------------------------------------- |
| Links | `kzaman.me` — **does not resolve** | `https://kzaman.com`                  |
| Name  | `Zaman (زمان)`                     | `Md Kamruzzaman` — see the note below |

The bio, employer and education are already right — _"Software Engineer | PHP & Laravel
Enthusiast"_, weDevs Software Engineer II since Nov 2024, Southeast University. Only the link is
wrong, and it is wrong in the worst way: `kzaman.me` has no DNS record at all, so the one outbound
link on a 1K-follower profile goes nowhere.

**On the name.** `Zaman (زمان)` is the only profile not carrying the canonical string, and
consistency is the whole mechanism behind entity resolution. If you want to keep the Zaman
association — reasonable, given it is the second keyword target — use
**`Md Kamruzzaman (Zaman)`**: the canonical string stays matchable and the variant is still
present. What does not work is `Zaman` alone, because nothing then ties this profile to the other
seven.

- [x] Facebook links → `https://kzaman.com` (remove the dead `kzaman.me`)
- [ ] Facebook name → `Md Kamruzzaman` — low priority. Note Facebook limits name changes to
      roughly once per 60 days, so do not spend that change casually

---

## P2 — loose ends

### 9. Repository READMEs — profile README is now P0

**The profile README actively points away from the site.** `github.com/kzamanbd` renders the
`kzamanbd/kzamanbd` README, that page ranks for `kzamanbd`, and its closing call-to-action is:

```markdown
Want to know more about me? [**Check out my Portfolio.**](https://kzamanbd.github.io/)
```

The link resolves — it hits the redirect shell and forwards to kzaman.com — but it costs a hop, and
more importantly it tells Google the portfolio _is_ github.io. Every other profile was corrected
today; this is the last one still nominating the old domain.

- [ ] Change that link to `https://kzaman.com` in the `kzamanbd/kzamanbd` README
- [ ] Add it to the READMEs of the repos featured on the site: `debug-suite`, `cf-stats`,
      `github-stats`, `fly-cli`, `wp-magic-login`, `laravel-tenancy`, `typeon`, `browser-terminal`

### 10. The Debug Suite plugin header

The plugin's `Plugin URI` on wordpress.org points at `https://kzaman.me/plugins/debug-suite` — a
domain that no longer resolves. Every WordPress install showing that plugin links to a dead host.

- [ ] Change `Plugin URI` to `https://kzaman.com/plugins/debug-suite` and ship a release

### 11. Medium

`medium.com/@kzamanbd` is linked from your homepage and has zero stories. An empty profile
presented as a credential is a weak signal.

- [ ] Either publish there with canonicals pointing at kzaman.com, or remove the link from the site

### 12. `kzamanbd.vercel.app`

Your Vercel production alias serves the identical build and is indexable. It already carries
`<link rel="canonical" href="https://kzaman.com">`, so Google will consolidate it — this is
handled, not urgent. If you want it airtight, add an `X-Robots-Tag: noindex` response header for
that hostname so the alias is never a candidate at all.

- [ ] Optional: noindex the `.vercel.app` alias

---

## P1.5 — entity authority (this is what the name targets need)

The checklist above makes kzaman.com the destination for people already looking for you. This
section is what makes Google treat **Md Kamruzzaman** as an entity worth listing on an ambiguous
name query. Every person ahead of you on that SERP has the same thing: an authoritative third-party
page that states who they are, in a form Google's Knowledge Graph ingests — a university faculty
page, Google Scholar, Cricinfo, Wikipedia.

You need the engineering equivalents. In rough order of value per hour:

### 13. Gravatar profile

`gravatar.com` — free, tied to your email, and it is the profile system behind every WordPress
site and `profiles.wordpress.org`. Gravatar profiles are crawled, rank on name queries, and expose
structured name/bio/links data. This is the closest thing to a "faculty page" available to you.

- [ ] Create/complete a Gravatar profile: name `Md Kamruzzaman`, job title, weDevs, kzaman.com,
      and every profile link from `sameAs`

### 14. Get named on weDevs' own domain

An employer domain stating _"Md Kamruzzaman, Software Engineer"_ is high-authority, topically
perfect corroboration — the single strongest third-party signal realistically available to you.

- [ ] Ask about a team/about page listing, or author a post on the weDevs engineering blog under
      your own name with a bio linking kzaman.com

### 15. WordCamp speaker profile

WordCamp speaker pages are on `*.wordcamp.org`, carry real authority, and are exactly the
"authoritative page about this person" pattern Google looks for. Barrier is a talk proposal, not a
budget.

- [ ] Submit a talk to WordCamp Dhaka or a regional WordCamp — Dokan internals or plugin
      performance, straight from the content plan

### 16. Secondary entity directories

Each is a crawlable person page carrying the same name string and the same link.

- [ ] about.me profile
- [ ] Crunchbase person profile (linked to weDevs)
- [ ] dev.to / Hashnode profile with canonical cross-posts pointing at kzaman.com

### 17. Wikidata — read this before trying

Wikidata is the entity database Google ingests directly, so an item would matter. **But** it
requires the subject be "clearly identifiable" with serious independent sources, and self-created
items for non-notable people are routinely deleted. Attempting it now would fail and wastes
goodwill.

Revisit only once items 14–15 exist — an employer page plus conference speaking is the kind of
independent sourcing that makes an item survive.

- [ ] Deferred: reassess Wikidata after a WordCamp talk and third-party coverage exist

### 18. Site-side: claim the name variants

One code change supports both targets. `Person.alternateName` in `src/utils/jsonLd.ts` currently
carries only `kzamanbd`; it should carry every string people actually use for you, so the entity
matches whichever variant is typed.

- [x] `alternateName` extended to `Kamruzzaman`, `kzamanbd`, `Zaman` — done. `Md Kamruzzaman`
      stays as `name`, so it is not repeated here
- [ ] Build a standalone `/about` page (audit §7 item 12). Right now the only page about you is the
      homepage, which has to serve every purpose at once. An `/about` URL whose single job is
      "who is Md Kamruzzaman" is the page that competes on a name query — H1 = the name,
      first paragraph = a direct one-sentence answer, then the evidence

---

## Verify it worked

Run these after making the changes. Each reads the platform's own public data, so it confirms what
a crawler would see rather than what the settings page shows you.

```bash
# GitHub — expect blog "https://kzaman.com", name "Md Kamruzzaman"
curl -s https://api.github.com/users/kzamanbd | grep -E '"(name|blog|company)"'

# LeetCode — expect websites ["https://kzaman.com"], realName "Md Kamruzzaman"
curl -s -X POST https://leetcode.com/graphql \
  -H 'Content-Type: application/json' -H 'Referer: https://leetcode.com/u/kzamanbd/' \
  -d '{"query":"query($u:String!){matchedUser(username:$u){profile{realName websites company}}}","variables":{"u":"kzamanbd"}}'

# Codeforces — expect firstName "Md", lastName "Kamruzzaman"
curl -s "https://codeforces.com/api/user.info?handles=kzamanbd"
```

LinkedIn, wordpress.org, X, YouTube and Facebook have no open API for this — check those in a
browser.

---

## The ladder to the two targets

Name queries are won in order. Each rung is the prerequisite for the next — Google will not treat
you as _the_ Kamruzzaman while it cannot even resolve `kzamanbd` to your site.

| Rung | Query                           | Today                        | Target                    | When         | Confidence                      |
| ---- | ------------------------------- | ---------------------------- | ------------------------- | ------------ | ------------------------------- |
| 1    | `kzamanbd`                      | absent; #1 is a T-shirt shop | **#1**                    | 2–6 weeks    | 90%                             |
| 1    | `kzaman`                        | absent                       | top 3                     | 4–8 weeks    | 80%                             |
| 2    | `Kamruzzaman weDevs`            | LinkedIn only                | **#1**                    | 2–4 months   | 80%                             |
| 2    | `Kamruzzaman software engineer` | not present                  | top 5                     | 3–6 months   | 60%                             |
| 3    | `Kamruzzaman Dokan`             | nothing ranks                | **#1**                    | 4–6 months   | 70%, needs the content          |
| 4    | **`Kamruzzaman`**               | 9 other people               | page 1                    | 9–18 months  | 30%                             |
| 4    | `Kamruzzaman`                   | —                            | **#1**                    | —            | **<5%** — Wikipedia + live news |
| 5    | **`Zaman`**                     | 8 companies                  | page 1 as a Person entity | 12–24 months | **10–15%**                      |
| 5    | `Zaman`                         | —                            | **#1**                    | —            | **~0%** — see below             |

Rungs 1–3 are ordinary work with high confidence, and they are worth doing on their own merits:
`Kamruzzaman weDevs` and `Kamruzzaman Dokan` are the queries a hiring manager actually types.

Rung 4 is a real fight against a Wikipedia biography, an active news cycle and several academics
with institutional pages. Page 1 is a legitimate goal. Position 1 is not, and I would not spend
against it.

Rung 5, stated plainly so the decision is yours with full information: `Zaman` at #1 is not
achievable. The query's demand is jeans, electronics and water purifiers, held by an 18-year-old
agency and a conglomerate, and Google will not rank a personal portfolio above them for a
commercial term. What **is** possible is appearing on that SERP as a recognised Person entity once
rungs 1–4 land — the way Samia Zaman (a Dhaka University faculty page) currently does at position 7. That is the honest ceiling, and everything in P1.5 is aimed at it.

### The measurement that tells you it is working

Re-check `kzamanbd` in an incognito window in about a week. The first visible change should be
kzaman.com appearing at all; position follows once Google crawls the pages queued for indexing on
15 Aug. If kzaman.com has not appeared for `kzamanbd` within four weeks of finishing P0, nothing
further up the ladder will happen and the problem is crawling, not competition.

### One thing this cannot do

None of it creates demand. It captures searches that already resolve to you and makes you eligible
for name queries — but nobody is searching for you in meaningful numbers yet, and a #1 ranking on a
query nobody types is worth nothing. The queries with real people behind them are in
`seo-audit-2026-08-15.md` §7. Run both tracks; do not let the name targets displace the content,
because the content is also what makes the name targets winnable — a site with twelve substantial
articles is an entity Google can justify listing, and a five-page portfolio is not.
