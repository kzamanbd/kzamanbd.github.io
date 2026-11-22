# kzaman.com search re-check — 22 Nov 2026

Delta against [`seo-recheck-2026-09-20.md`](./seo-recheck-2026-09-20.md), 63 days later, and nine
days past the audit's Day-90 checkpoint (~13 Nov).

Everything below was verified live on 22 Nov 2026: HTTP requests against the deployed site (build
`2026-11-22T09:40Z`, which already serves the new hero), the wordpress.org plugin and stats APIs,
the GitHub API, DNS, a local Lighthouse 12.8 mobile run against production, and source at `main` /
`10dc8df`. The PageSpeed Insights API was out of daily quota, so there is no CrUX field data here.
As before, ranking observations come from a general US web index, not Search Console, so treat §6 as
directional.

---

## 1. Verdict

The technical layer is still sound: canonicals, schema, feeds, robots and the github.io redirect all
hold, and the September code fixes (N-01, N-03) are live. **But the three things that decide the
outcome have not moved:**

1. **No new content in 96 days.** The last article commit was 18 Aug. The 26 commits since September
   went to the resume (13), redirects, dependencies and the home page. Articles in the named
   territory (Dokan, multi-vendor WordPress, plugin debugging) are still at **zero**.
2. **The plugin's `Plugin URI` is still dead after two more releases.** Debug Suite went out as 2.0.5
   → 2.0.7 (last on 18 Oct), and each release kept pointing wordpress.org at `kzaman.me`, which has no
   DNS record.
3. **kzaman.com is still absent from the index sampled here.** It does not appear for its own
   domain, its handle, the owner's name with employer, or an exact article title.

There were also two new technical regressions, both since fixed in this pass (§5): Mermaid diagrams caused layout shift on 8 of 9
articles, and every hard-coded sitemap `lastmod` is stale again.

---

## 2. Scoreboard

| Metric                               | 20 Sep       | 22 Nov (now)                         |
| ------------------------------------ | ------------ | ------------------------------------ |
| Indexable pages canonicalised away   | 0 ✅         | 0 ✅                                 |
| Live duplicate sites                 | 0 ✅         | 0 ✅ (stub, but stale in index — §6) |
| URLs in `sitemap.xml`                | 14           | 14                                   |
| Published articles                   | 9            | 9 ❌ none in 96 days                 |
| Articles in the named territory      | 0 ❌         | 0 ❌                                 |
| Plugin `Plugin URI` on a dead domain | ❌           | ❌ +2 releases shipped with it       |
| Debug Suite all-time downloads       | 866          | 1,115 (+249, ~33/week)               |
| Sitemap `lastmod` accurate           | ✅ fixed     | ❌ stale on all 4 static routes      |
| Article CLS (mobile, Lighthouse)     | not measured | 0.263 ❌ (8 of 9 articles affected)  |
| Lighthouse SEO / Accessibility       | not measured | 100 / 100 ✅                         |
| Search Console data reviewed         | ❌           | ❓ not visible from here             |

---

## 3. Holding since September

| Item                         | Evidence today                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| All key routes 200           | `/`, `/articles`, `/resume`, `/now`, `/plugins/debug-suite`, article, feeds, `robots.txt`, `sitemap.xml`       |
| Self-canonicals              | All six sampled routes canonicalise to themselves                                                              |
| One `<h1>` per page          | Home, articles index, article, resume, now, plugin page                                                        |
| N-01 `Person.image` absolute | `"image":"https://kzaman.com/thumbnail.png"` on home and article                                               |
| N-03 job title unified       | `Person.jobTitle`, home `<title>` and `/resume` `<title>` all say `Software Engineer`                          |
| Schema scope                 | Home: `WebSite` + `Person` + `ProfilePage`. Article: `WebSite` + `Person` + `BlogPosting` + `BreadcrumbList`   |
| `sameAs`                     | LinkedIn, GitHub, wordpress.org, LeetCode, Codeforces, YouTube, X, Facebook. Medium correctly excluded         |
| Plugin page schema           | `SoftwareApplication` with live `dateModified: 2026-10-18`                                                     |
| github.io redirect           | Root serves canonical → `kzaman.com/`, `meta refresh` and `location.replace`. No repo files leak through Pages |
| GitHub profile               | `name: Md Kamruzzaman`, `blog: kzaman.com`, `company: weDevs`                                                  |
| Search Console / Bing        | Verification meta and `BingSiteAuth.xml` still served                                                          |
| Robots                       | `Allow: /`, disallows only `/private/` and `/shorturl/`, sitemap advertised                                    |

**New since September, positive:** the home hero now carries topical body text ("multi-vendor
commerce, payment gateways and ERP systems…") and focus chips, where it used to be the name alone.
This is the first on-topic prose on the home page above the fold.

---

## 4. Still open

**4.1 — Plugin `Plugin URI` → dead DNS. Third time listed, and the worst kind of open item.**

```
version   = 2.0.7   (last_updated 2026-10-18)
homepage  = https://kzaman.me/plugins/debug-suite?utm_source=wp-plugins&...
dig kzaman.me A  → (empty)
```

The plugin now has 1,115 downloads and about 33 a week, and every plugin page view and wp-admin
"Visit plugin site" click goes to a domain that does not resolve. It is still the single
highest-authority link you control. Set `Plugin URI: https://kzaman.com/plugins/debug-suite` and
release 2.0.8.

**4.2 — Content in the territory: zero.** See §1. This was priority 3 in September and the audit's
weeks 5–12 plan. Nothing else on this list matters as much for ranking.

**4.3 — Account-side items, unverified from here.** Facebook Links field (`kzaman.me`), X and
YouTube display names (`Kamruzzaman` → `Md Kamruzzaman`), Codeforces website field. Facebook and
Medium block automated requests, so these could not be re-checked.

**4.4 — Medium is still linked in the UI.** It is out of `sameAs`, but it is in the hero's social row
and the contact section (`src/components/home/hero/contents.ts`). If the profile is still empty, the
home page links to an empty property from its most prominent position. Either publish there or drop
it from `socialLinks`. **✅ Fixed:** removed from `socialLinks`, with a note to add it back once the
profile has posts. `user.medium` stays in metadata.

**4.5 — N-04 backdated article dates.** No decision recorded. `datePublished` still runs from 26 Feb
to 23 Jul for files first committed 16–18 Aug.

---

## 5. New defects

**N-06 — Mermaid diagrams cause CLS 0.263 on article pages. High. ✅ Fixed.**
Lighthouse mobile on `/articles/cron-ran-twice`: performance 67, LCP 3.1 s, TBT 490 ms,
**CLS 0.263** (the "poor" threshold is 0.25). The single shift is attributed to
`article > pre.mermaid`. **8 of the 9 articles contain at least one Mermaid block**, so this applied
to nearly the whole article corpus. Core Web Vitals are a page-experience signal, and "poor" CLS is
the one bucket worth avoiding.

_Root cause (found while fixing; the first guess above was wrong):_ it was not the source-to-SVG
height change. The diagrams sit around 10,000 px down the page, where a resize cannot count. The
`<pre>` had `overflow-x: auto`, which made it a scroll container. Chrome reported the swap inside
it in the container's own coordinates (`previousRect` at 0,0), so it was scored as a full-viewport
shift. Lighthouse and CrUX both read that value. Removing the overflow, or blocking Mermaid, each
brought CLS to 0.

_Fix:_ `pre.mermaid` is no longer a scroll container. Its source wraps (`pre-wrap`) instead of
scrolling, and the rendered SVG already scales to the column (`article-content.module.css`).
Verified with a `layout-shift` PerformanceObserver: **CLS 0 on all 9 articles at 412 px and
1440 px**, with no diagram overflowing its column. Build-time SVG would still cut Mermaid's JS
(likely most of the 490 ms TBT), but CLS no longer depends on it.

The same pass found that `millions-of-rows-nobody-uses` scrolled 47 px sideways on phones, also live:
a long inline `<code>` with no break opportunities. Inline code now has `overflow-wrap: anywhere`.

**N-07 — Sitemap `lastmod` is stale on three of four static routes. Medium. ✅ Fixed.**
`src/app/sitemap.ts` hard-coded four dates:

| Route                  | `lastmod`  | Last content change                                                            |
| ---------------------- | ---------- | ------------------------------------------------------------------------------ |
| `/`                    | 2026-09-20 | 2026-11-22 (hero rework) ❌                                                    |
| `/resume`              | 2026-09-20 | 2026-11-22 (education fix, plus 13 commits in Oct) ❌                          |
| `/now`                 | 2026-08-15 | 2026-08-15 ✅ (the 18 Oct commit was only the `lib` → `services` rename)       |
| `/plugins/debug-suite` | 2026-08-15 | 2026-10-18 ❌ (plugin 2.0.7; the page's own schema says `dateModified` 18 Oct) |

An earlier draft of this report listed `/now` as stale. It was correct: its only commit after
15 Aug was a path rename.

The September fix was a manual bump, so it regressed as soon as the pages changed.

_Fix:_ each date now lives next to the content it describes: `homeLastModified` in
`src/app/(site)/contents.ts`, `resumeLastModified` in `src/app/resume/contents.ts`, and
`nowMeta.lastUpdated` (now ISO, and also the source of the page's "Last updated" badge). The plugin
page reports the later of its own copy date and the plugin's `last_updated` from the directory API,
so a release updates it automatically. Built sitemap: `/` and `/resume` 2026-11-22, `/now`
2026-08-15, `/plugins/debug-suite` 2026-10-18.

**N-08 — Meta descriptions run well past the snippet length. Low. ✅ Fixed.**
Home: 263 characters, ending mid-thought without a full stop ("…in team environments"). Articles:
286–359 characters (all nine). Google rewrites or truncates at roughly 150–160, so the clause that
survives is the opening one.

_Fix:_ the site description is now 141 characters ("Software engineer at weDevs with 6+ years
building multi-vendor marketplaces, payment gateways and WordPress plugins in Laravel and
Next.js."). The PWA manifest, which still said "Web Developer, Designer, and Content Creator", now
reads the same name and description. Articles gained an optional `metaDescription` frontmatter field
for the `<meta>`, OpenGraph and Twitter tags. The longer `description` stays as the on-page summary,
which is also the article LCP element. All nine now have one, 146–155 characters. The article
editor reads and writes the field, with a character counter.

**N-09 — Home page performance not measurable in this run. Info.**
Lighthouse 12.8 hit a trace-engine error on `/` twice. CLS was 0, and accessibility and SEO were
both 100. Re-run in PageSpeed Insights tomorrow, once the API quota resets, for both the lab score
and CrUX field data, and confirm the new hero's grid spotlight adds no main-thread cost.

---

## 6. Rank reality

Same queries as September, same caveat: general web index, not Google Search Console.

| Query                                  | 20 Sep                                     | 22 Nov                                                                                                        |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `kzamanbd`                             | Ten results, all GitHub repos; site absent | Unrelated "zaman" pages; **neither the GitHub profile nor kzaman.com** appears                                |
| `Kamruzzaman weDevs software engineer` | LinkedIn `/in/kzamanbd` first ✅           | **`kzamanbd.github.io` first, titled "Available for freelance work"** (an old cached snapshot); LinkedIn gone |
| `"Your cron ran twice"` (exact title)  | Zero results from kzaman.com               | Zero results from kzaman.com                                                                                  |
| `kzaman.com`                           | —                                          | Not found; look-alike domains only                                                                            |
| Debug Suite (descriptive query)        | —                                          | wordpress.org listing ranks ✅; kzaman.com's plugin page absent                                               |

**Reading it:**

- The entity is being resolved, but **onto the wrong URL.** For the name+employer query, the index
  holds a stale snapshot of the old github.io portfolio. That snapshot still advertises freelance
  availability, which now contradicts "Currently at weDevs". The live github.io page is a correct
  redirect stub, so this is crawl lag in this index rather than a defect. It does show that the
  redirect has not yet transferred the entity to kzaman.com here.
- For a five-month-old domain with no inbound links, absence for its own domain name is consistent
  with "not indexed in this index" more than "indexed and ranking poorly". That is why §4.1, a real
  inbound link from wordpress.org, matters more than any on-page change.

**Day-90 checkpoint (due ~13 Nov).** The audit's three questions remain unanswerable without Search
Console, which is verified but has no recorded review in this repo. If Search Console shows (1)
pages indexed, (2) impressions for brand queries but (3) none for articles, the audit's
pre-written conclusion applies: the technical work succeeded, and topic selection needs revisiting.
More volume will not fix it.

---

## 7. Priority

1. **Release Debug Suite 2.0.8 with `Plugin URI: https://kzaman.com/plugins/debug-suite`.** One line,
   third time asked. (§4.1)
2. **Open Search Console and record the Day-90 numbers**: indexed pages, brand-query impressions,
   article impressions. Add them to the next re-check so it can show real data rather than proxies.
3. **Write one article in the territory**, e.g. vendor-scale query counts in Dokan, hook-order failure
   modes, or what Debug Suite's own logs show about real installs. It can link to the plugin page,
   and the plugin page back to it. (§4.2)
4. ~~Fix N-06 (Mermaid CLS)~~ ✅ done. Optional follow-up: build-time Mermaid SVG to cut article TBT.
5. ~~Fix N-07 (sitemap `lastmod`)~~ ✅ done; dates now live next to their content.
6. ~~Tighten meta descriptions (N-08) and decide on Medium (§4.4)~~ ✅ done.
7. **Re-run PageSpeed Insights** for home-page lab and field data once the quota resets, and
   confirm article CLS reads 0 after the next deploy. (N-09)
