import { homeLastModified } from '@/app/(site)/contents';
import { nowMeta } from '@/app/(site)/now/contents';
import { debugSuitePageLastModified, pluginSlug } from '@/app/(site)/plugins/debug-suite/contents';
import { resumeLastModified } from '@/app/resume/contents';
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
    const pluginInfo = await getWordPressPluginInfo(pluginSlug);
    const pluginReleased = pluginInfo?.lastUpdated?.slice(0, 10) ?? null;

    /**
     * When each static route last really changed. Each date lives next to the
     * content it describes, so the stamp is bumped in the same commit as the
     * edit; they used to sit in a map here and went stale twice.
     *
     * They are never `new Date()`. Google ignores `changefreq` and `priority`
     * outright and starts discounting `lastmod` once it is demonstrably wrong,
     * whether a stamp lags the page or moves on every deploy.
     */
    const staticRouteLastModified: Record<string, string> = {
        '/': homeLastModified,
        '/resume': resumeLastModified,
        '/now': nowMeta.lastUpdated,
        '/plugins/debug-suite': laterDate(debugSuitePageLastModified, pluginReleased)
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
