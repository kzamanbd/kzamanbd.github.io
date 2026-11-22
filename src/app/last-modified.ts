/**
 * When each static route's content last really changed, in one place.
 *
 * `sitemap.ts` reports these as `lastmod`, and `/now` also shows its date as the
 * "Last updated" badge, so the page and the sitemap can never disagree. Articles
 * are not listed here: their dates come from each file's `date` / `updated`
 * frontmatter.
 *
 * Bump an entry in the same commit as a visible change to that page (copy,
 * projects, resume entries, the hero), not for refactors that leave the rendered
 * page unchanged. The check: `git log -1 --date=short -- <the route's files>`.
 * These are never `new Date()`. Google ignores `changefreq` and `priority`
 * outright and starts discounting `lastmod` once it is demonstrably wrong,
 * whether a stamp lags the page or moves on every deploy.
 *
 * All values are `YYYY-MM-DD`.
 */
export const lastModified = {
    /** `/`. Assembled from `src/components/home/*`. */
    home: '2026-11-22',
    /** `/resume`. `src/app/resume/contents.ts` and `src/components/resume/*`. */
    resume: '2026-11-22',
    /** `/now`. `src/app/(site)/now/contents.ts`. Also the page's badge. */
    now: '2026-08-15',
    /**
     * `/plugins/debug-suite`: the page's own copy. The page also renders live
     * directory data, so the sitemap reports the later of this date and the
     * plugin's last release on wordpress.org.
     */
    debugSuite: '2026-08-15'
} as const;
