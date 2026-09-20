# kzaman.com search re-check — 20 Sep 2026

Delta against [`seo-audit-2026-08-15.md`](./seo-audit-2026-08-15.md) and
[`entity-consolidation-checklist.md`](./entity-consolidation-checklist.md), 36 days later.

Everything below was verified live on 20 Sep 2026 by HTTP request against the deployed site, the
wordpress.org plugin API, the GitHub API and DNS, or by source inspection at `main` / `cef4a44`.
Ranking claims are marked for what they are: the tooling available here is a US web index, not
Search Console, so treat SERP observations as directional and confirm in Search Console.

---

## 1. Verdict

The technical layer held and improved. The entity layer moved. **The content strategy went the
opposite direction from the one the audit named**, and that is the only finding that matters for
the stated goal.

The audit said, in §4 and §5: the Netflix system-design article "will get close to zero search
traffic… do not write nine more like it," and named Dokan / multi-vendor WordPress engineering and
WordPress plugin debugging as the only winnable territory. Since then, **eight articles shipped, all
of them the thing the audit said not to write** — COUNT(\*) at scale, N+1, cache stampede, TOTP,
stateless auth, cron duplication, row deletion, data corruption — and **zero** on Dokan, multi-vendor
WordPress, plugin debugging or the WordPress–Laravel seam. One article mentions WordPress at all.

The site is now technically excellent at publishing content that cannot rank.

---

## 2. Scoreboard

| Metric                               | 15 Aug (audit) | 20 Sep (now)  |
| ------------------------------------ | -------------- | ------------- |
| Indexable pages canonicalised away   | 3 → 0          | 0 ✅          |
| Live duplicate sites                 | 1              | 0 ✅          |
| URLs in `sitemap.xml`                | 5 → 6          | 14            |
| Published articles                   | 1              | 9             |
| Articles in the named territory      | 0              | 0 ❌          |
| Dead outbound links on the homepage  | 4 → 0          | 0 ✅          |
| Fabricated metrics on the site       | 7 → 0          | 0 ✅          |
| Search Console verified              | ❌ task zero   | ✅ verified   |
| Bing Webmaster verified              | ❌             | ✅            |
| Plugin `Plugin URI` on a dead domain | ❌             | ❌ still dead |

---

## 3. Closed since the audit

| Item                           | Evidence today                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Search Console (open item 2)   | `google-site-verification` meta live on every page                                                                             |
| Bing Webmaster (open item 2)   | `public/BingSiteAuth.xml` served                                                                                               |
| github.io duplicate (C-02)     | `kzamanbd.github.io` root returns 200 with canonical → `kzaman.com/` + `location.replace`                                      |
| GitHub profile name/website    | API: `name: Md Kamruzzaman`, `blog: kzaman.com`, `company: weDevs`                                                             |
| GitHub profile README (item 9) | Portfolio CTA now `https://kzaman.com`; the `kzamanbd.github.io` link is gone                                                  |
| wordpress.org profile          | Title renders `Md Kamruzzaman (@kzamanbd)`                                                                                     |
| Canonicals (C-01)              | All six sampled routes self-canonicalise                                                                                       |
| Schema scope (C-04)            | Home: `WebSite` + `Person` + `ProfilePage`. Article: `WebSite` + `Person` + `BlogPosting` + `BreadcrumbList`, no `ProfilePage` |
| `BreadcrumbList`               | New since the audit — not present in Round 2, present now on article pages                                                     |
| Plugin metrics (T-07)          | Live from the directory API: v2.0.4, 866 downloads, WP 6.8+, PHP 8.1+                                                          |
| Resume `?variant=` duplication | All three variants canonicalise to `https://kzaman.com/resume` — correctly handled                                             |
| Feeds                          | `/feed.xml`, `/atom.xml`, `/feed.json` all 200 with correct content types                                                      |

---

## 4. Still open from the audit

**4.1 — Plugin `Plugin URI` still points at dead DNS. Regressed in severity.**

The wordpress.org directory API returns:

```
homepage = https://kzaman.me/plugins/debug-suite?utm_source=wp-plugins&utm_campaign=plugin-uri&utm_medium=wp-dash
```

`dig kzaman.me` returns nothing — the domain has no DNS record at all. Debug Suite shipped **2.0.4
on 1 Sep 2026**, after the audit, so a release went out and the header was not corrected. This is the
single highest-authority inbound link available (wordpress.org plugin directory → your site) and it
currently resolves to nothing. Fix `Plugin URI:` to `https://kzaman.com/plugins/debug-suite` and
release.

**4.2 — Facebook Links field.** Still `kzaman.me` per the checklist; could not re-verify (Facebook
bot-blocks). Same dead DNS as above. 1K-follower profile, one outbound link, pointing at nothing.

**4.3 — X and YouTube name strings.** Checklist P1: both read `Kamruzzaman`, want `Md Kamruzzaman`
to match the schema's `Person.name`. Codeforces website field still unset.

**4.4 — The DraftScripts YouTube channel** as a second brand: source is clean (only a comment
referencing the old helper remains), but the channel itself is outside this repo.

**4.5 — The empty Medium profile.** `medium: 'https://medium.com/@kzamanbd'` still in
`src/lib/metadata.ts:123`. It is correctly **out** of `sameAs` now — good — but if it is still linked
in the UI it nominates an empty property.

---

## 5. New defects found today

N-01, N-02 and N-03 were fixed in this pass; N-04 and N-05 are decisions, not code. All three
changes verified against `pnpm lint`, `pnpm check-types` and `pnpm build`, and confirmed in the
generated output — `"image":"https://kzaman.com/thumbnail.png"` and
`"jobTitle":"Full Stack Software Engineer"` in `.next/server/app/index.html`, `<lastmod>2026-09-20`
on `/resume` in the built sitemap, and the resume titles checked against `pnpm start`.

**N-01 — `Person.image` is a relative URL in JSON-LD. ✅ Fixed.**
`src/utils/jsonLd.ts:50` sets `image: siteThumbnail`, which emits `"image": "/thumbnail.png"`.
Structured-data consumers expect an absolute URL; a relative one is not reliably resolved. Every
other image on the site is absolute (`og:image`, `BlogPosting.image`, sitemap images). Fix:
`image: \`${siteURL}${siteThumbnail}\``.

**N-02 — `/resume` `lastmod` is stale and now demonstrably wrong. ✅ Fixed.**
`src/app/sitemap.ts` hardcodes `'/resume': '2026-08-15'`, but `/resume` changed in four commits on
20 Sep (variants, Node/React cut) and twice on 8 Sep. The file's own comment explains that Google
discounts `lastmod` once it is demonstrably wrong — the map is now producing exactly that. Bump the
entry, or derive it from git.

**N-03 — Job-title string diverges across surfaces. ✅ Fixed.**
`Person.jobTitle` = `Software Engineer (Full Stack)`; homepage title = `Full Stack Software
Engineer`; `/resume` title = `Backend Engineer Resume`. Round 2 verified the resume as
`Full Stack Software Engineer Resume`; the resume-variant work changed it. Entity resolution keys on
consistent strings, and this is a third one. Pick one and derive the rest, the way `authorName`
already works.

**N-04 — Article publication dates are backdated.**
All nine articles were committed on 16 Aug 2026 (plus a `fix(dates)` commit the same day), but carry
`date:` values spread from 26 Feb to 23 Jul 2026, and those feed `datePublished` in `BlogPosting`.
If the pieces were genuinely drafted then, fine — but the first-crawl date will not match, and the
audit's whole truthfulness pass (C-03, T-07) was about not asserting things the site cannot back.
Worth a deliberate decision rather than an accident.

**N-05 — Article cadence stopped.** Last article: 16 Aug. Thirty-five days, zero articles, while the
same window produced 12 resume/licensing commits. The audit's weeks 5–12 plan was "occupy the
territory"; the territory is unoccupied.

---

## 6. Rank reality

Measured with a general web-search index, not Google Search Console. Directional only.

| Query                                  | Result                                                                                       |
| -------------------------------------- | -------------------------------------------------------------------------------------------- |
| `kzamanbd`                             | Ten results, **all GitHub repos**. kzaman.com does not appear.                               |
| `Kamruzzaman weDevs software engineer` | LinkedIn `/in/kzamanbd` ranks first ✅, then four unrelated Kamruzzamans. kzaman.com absent. |
| `"Your cron ran twice"` (exact title)  | Zero results from kzaman.com — generic cron pages instead.                                   |

The audit's Day-90 checkpoint (due ~13 Nov) asks three questions. Early read:

1. _Are the pages indexed?_ — Cannot confirm here; Search Console is verified now, so **go read it**.
2. _Does kzaman.com rank for `kzamanbd`?_ — Not in this index. LinkedIn winning `Kamruzzaman weDevs`
   is the entity work paying off; the hub is not yet the destination.
3. _Do the articles have impressions?_ — An exact-phrase query on an article title returning nothing
   is a bad early sign, but impressions ≠ ranking. Search Console answers this properly.

The audit pre-wrote the interpretation: if 1 and 2 are yes and 3 is no, "the technical work succeeded
and the topic selection needs revisiting — not more volume." On current evidence that is where this
is heading, and topic selection is already the known problem.

---

## 7. Priority

1. **Ship Debug Suite with `Plugin URI: https://kzaman.com/plugins/debug-suite`.** One line, one
   release, recovers the best link you have. (§4.1)
2. **Open Search Console.** It has been verified for weeks and is the only source of real data.
   Everything in §6 is guesswork until then.
3. **Write in the territory.** One Dokan or plugin-debugging article outweighs the next five generic
   backend pieces. Concretely: vendor-scale query counts in Dokan, hook-order failure modes, what
   Debug Suite's own log data shows about real WordPress installs.
4. **Fix N-01, N-02, N-03** — three small code changes, all in this repo.
5. **Facebook link + X/YouTube name strings** — account settings, ten minutes. (§4.2, §4.3)
