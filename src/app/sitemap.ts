import { getAllArticles } from '@/lib/posts';
import { parseArticleDate } from '@/utils/article-date';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * When each static route last really changed. Bump the entry when you edit the
 * page's content.
 *
 * These used to be `new Date()`, which claimed every static page changed on
 * every deploy. Google ignores `changefreq` and `priority` outright and starts
 * discounting `lastmod` once it is demonstrably wrong, so a wall-clock stamp
 * costs the signal rather than strengthening it — which is the same reasoning
 * already applied to the article entries below.
 */
const staticRouteLastModified: Record<string, string> = {
    '/': '2026-08-15',
    '/resume': '2026-08-15',
    '/now': '2026-08-15',
    '/plugins/debug-suite': '2026-08-15'
};

export default function sitemap(): MetadataRoute.Sitemap {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kzaman.com';
    const articles = getAllArticles();

    // The corpus only changes on deploy, so the index's lastModified is the most
    // recent article change rather than wall-clock time, which would otherwise
    // claim every page changed on every build.
    const latestArticleChange = articles.reduce<Date | null>((latest, article) => {
        const changed = parseArticleDate(article.updated ?? article.date);
        if (!changed) return latest;
        return !latest || changed > latest ? changed : latest;
    }, null);

    const staticEntry = (path: string, images?: string[]): MetadataRoute.Sitemap[number] => ({
        url: path === '/' ? siteURL : `${siteURL}${path}`,
        lastModified: staticRouteLastModified[path],
        ...(images && { images })
    });

    return [
        staticEntry('/', [`${siteURL}/kzaman.jpg`]),
        staticEntry('/resume'),
        staticEntry('/now'),
        staticEntry('/plugins/debug-suite'),
        ...(articles.length > 0
            ? [
                  {
                      url: `${siteURL}/articles`,
                      lastModified: latestArticleChange ?? undefined
                  }
              ]
            : []),
        ...articles.map((article) => ({
            url: `${siteURL}/articles/${article.slug}`,
            lastModified: parseArticleDate(article.updated ?? article.date) ?? undefined,
            images: [
                article.cover
                    ? `${siteURL}${article.cover}`
                    : `${siteURL}/articles/${article.slug}/opengraph-image`
            ]
        }))
    ];
}
