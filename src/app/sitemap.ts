import { lastModified } from '@/app/last-modified';
import { debugSuitePluginSlug } from '@/services/metadata';
import { getAllArticles } from '@/services/posts';
import { getWordPressPluginInfo } from '@/services/wordpress-plugin';
import { parseArticleDate } from '@/utils/article-date';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/** The later of two `YYYY-MM-DD` dates; ISO dates compare correctly as strings. */
const laterDate = (a: string, b: string | null) => (b && b > a ? b : a);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kzaman.com';
    const articles = getAllArticles();

    // The plugin page renders live directory data, so a release is a real change
    // to it. `last_updated` arrives as "2026-10-18 3:51pm GMT"; the date part is
    // enough. If the API is unreachable, the page's own copy date still stands.
    const pluginInfo = await getWordPressPluginInfo(debugSuitePluginSlug);
    const pluginReleased = pluginInfo?.lastUpdated?.slice(0, 10) ?? null;

    // The dates themselves, and the rules for bumping them, live in
    // `src/app/last-modified.ts`.
    const staticRouteLastModified: Record<string, string> = {
        '/': lastModified.home,
        '/resume': lastModified.resume,
        '/now': lastModified.now,
        '/plugins/debug-suite': laterDate(lastModified.debugSuite, pluginReleased)
    };

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
