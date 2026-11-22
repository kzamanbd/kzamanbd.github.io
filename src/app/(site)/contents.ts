/**
 * When the home page's content last really changed, as the sitemap reports it.
 *
 * The home page is assembled from `src/components/home/*`, so this is the one
 * place its date can live. Bump it in the same commit as any visible change to
 * a home section (copy, projects, skills, the hero), not for refactors that
 * leave the rendered page unchanged. A stale stamp costs Google's trust in
 * `lastmod`, and so does one that moves on every deploy.
 */
export const homeLastModified = '2026-11-22';
