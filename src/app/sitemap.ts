import { getAllArticles } from '@/lib/posts';
import { parseArticleDate } from '@/utils/article-date';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://draftscripts.com';
    const articles = getAllArticles();

    // The corpus only changes on deploy, so the index's lastModified is the most
    // recent article change rather than wall-clock time, which would otherwise
    // claim every page changed on every build.
    const latestArticleChange = articles.reduce<Date | null>((latest, article) => {
        const changed = parseArticleDate(article.updated ?? article.date);
        if (!changed) return latest;
        return !latest || changed > latest ? changed : latest;
    }, null);

    return [
        {
            url: siteURL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
            images: [`${siteURL}/kzaman.jpg`]
        },
        {
            url: `${siteURL}/resume`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: `${siteURL}/uses`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6
        },
        {
            url: `${siteURL}/now`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6
        },
        ...(articles.length > 0
            ? [
                  {
                      url: `${siteURL}/articles`,
                      lastModified: latestArticleChange ?? new Date(),
                      changeFrequency: 'weekly' as const,
                      priority: 0.9
                  }
              ]
            : []),
        ...articles.map((article) => ({
            url: `${siteURL}/articles/${article.slug}`,
            lastModified: parseArticleDate(article.updated ?? article.date) ?? new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
            images: [
                article.cover
                    ? `${siteURL}${article.cover}`
                    : `${siteURL}/articles/${article.slug}/opengraph-image`
            ]
        }))
    ];
}
