import type { Article } from '@/lib/posts';
import { authorName, siteThumbnail, siteURL } from '@/lib/metadata';
import type { BlogPosting, BreadcrumbList, WithContext } from 'schema-dts';

/** Approximate word count from rendered HTML (tags stripped). */
function countWords(html: string): number {
    const text = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text ? text.split(' ').length : 0;
}

export function buildArticleJsonLd(article: Article): WithContext<BlogPosting> {
    const url = `${siteURL}/articles/${article.slug}`;
    // Tags plus the concrete stack make a richer keyword set than tags alone.
    const keywords = [...new Set([...article.tags, ...article.tech])];
    // Structured-data images should be crawlable rasters, so mirror the OG image:
    // the generated PNG route unless the article ships its own cover.
    const image = article.cover
        ? `${siteURL}${article.cover}`
        : `${siteURL}/articles/${article.slug}/opengraph-image`;
    const wordCount = countWords(article.html);

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        image: image || siteThumbnail,
        inLanguage: 'en',
        timeRequired: `PT${article.readingMinutes}M`,
        ...(wordCount > 0 && { wordCount }),
        ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
        ...(article.category && { articleSection: article.category }),
        author: {
            '@type': 'Person',
            '@id': `${siteURL}#person`,
            name: authorName,
            url: siteURL
        },
        publisher: {
            '@type': 'Person',
            '@id': `${siteURL}#person`,
            name: authorName
        }
    };
}

export interface BreadcrumbEntry {
    label: string;
    href: string;
}

/**
 * A `BreadcrumbList` for the trail rendered on the page. Positions are 1-based
 * and every item is an absolute URL, which is what crawlers expect.
 */
export function buildBreadcrumbJsonLd(trail: BreadcrumbEntry[]): WithContext<BreadcrumbList> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.label,
            item: `${siteURL}${entry.href}`
        }))
    };
}
