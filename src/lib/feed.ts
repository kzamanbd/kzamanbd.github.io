// Feed generation. Assembles the published-article corpus once into a
// format-neutral model, then serialises it to RSS 2.0, Atom 1.0 and JSON Feed
// 1.1. Channel and author values come from `@/lib/metadata` (never hardcoded),
// and every link and image is absolute.

import { getAllArticles, getArticle } from '@/lib/posts';
import { authorName, description as siteDescription, siteName, siteURL } from '@/lib/metadata';
import { user } from '@/lib/metadata';
import { requireArticleDate } from '@/utils/article-date';

/** One article as a feed entry, with absolute URLs and parsed dates. */
interface FeedItem {
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    tags: string[];
    published: Date;
    updated: Date;
    contentHtml: string;
}

/** The format-neutral feed model shared by all three serialisers. */
interface FeedData {
    title: string;
    description: string;
    updated: Date;
    items: FeedItem[];
}

/** Absolute URL for a public path, rooted at the configured site URL. */
function absoluteUrl(pathOrUrl: string): string {
    return pathOrUrl.startsWith('http') ? pathOrUrl : `${siteURL}${pathOrUrl}`;
}

/**
 * Assemble the feed model from every published article (newest first), loading
 * full rendered HTML through the same pipeline the article pages use. Returns a
 * valid model with zero items when there are no articles yet.
 */
export async function getFeedData(): Promise<FeedData> {
    const summaries = getAllArticles();

    const items = await Promise.all(
        summaries.map<Promise<FeedItem>>(async (summary) => {
            const article = await getArticle(summary.slug);
            // Readers do not render the CSS gradient cover, so point at the
            // route-generated OpenGraph PNG unless the article ships its own image.
            const image = summary.cover ?? `/articles/${summary.slug}/opengraph-image`;
            return {
                title: summary.title,
                description: summary.description,
                url: absoluteUrl(`/articles/${summary.slug}`),
                imageUrl: absoluteUrl(image),
                tags: summary.tags,
                published: requireArticleDate(summary.date),
                updated: requireArticleDate(summary.updated ?? summary.date),
                contentHtml: article?.html ?? ''
            };
        })
    );

    // The feed's own timestamp is the most recent article change. Wall-clock time
    // would make an unchanged corpus produce a different feed on every request,
    // so only an empty corpus falls back to "now".
    const updated = items.reduce<Date>(
        (latest, item) => (item.updated > latest ? item.updated : latest),
        new Date(0)
    );

    return {
        title: siteName,
        description: siteDescription,
        updated: items.length > 0 ? updated : new Date(),
        items
    };
}

/** Escape text for safe inclusion in an XML text node or attribute. */
function xmlEscape(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/** Wrap an HTML body in CDATA, splitting any literal `]]>` so it stays valid. */
function cdata(html: string): string {
    return `<![CDATA[${html.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

/** RFC-822 date for RSS `pubDate`/`lastBuildDate`. */
function toRfc822(date: Date): string {
    return date.toUTCString();
}

/** RFC-3339 date for Atom and JSON Feed timestamps. */
function toRfc3339(date: Date): string {
    return date.toISOString();
}

/** Serialise the feed model to RSS 2.0. */
export function renderRssFeed(data: FeedData): string {
    const items = data.items
        .map((item) =>
            [
                '    <item>',
                `      <title>${xmlEscape(item.title)}</title>`,
                `      <link>${xmlEscape(item.url)}</link>`,
                `      <guid isPermaLink="true">${xmlEscape(item.url)}</guid>`,
                `      <pubDate>${toRfc822(item.published)}</pubDate>`,
                `      <description>${xmlEscape(item.description)}</description>`,
                ...item.tags.map((tag) => `      <category>${xmlEscape(tag)}</category>`),
                `      <content:encoded>${cdata(item.contentHtml)}</content:encoded>`,
                '    </item>'
            ].join('\n')
        )
        .join('\n');

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
        '  <channel>',
        `    <title>${xmlEscape(data.title)}</title>`,
        `    <link>${siteURL}</link>`,
        `    <description>${xmlEscape(data.description)}</description>`,
        '    <language>en</language>',
        `    <managingEditor>${xmlEscape(user.email)} (${xmlEscape(authorName)})</managingEditor>`,
        `    <lastBuildDate>${toRfc822(data.updated)}</lastBuildDate>`,
        `    <atom:link href="${siteURL}/feed.xml" rel="self" type="application/rss+xml"/>`,
        items,
        '  </channel>',
        '</rss>',
        ''
    ].join('\n');
}

/** Serialise the feed model to Atom 1.0. */
export function renderAtomFeed(data: FeedData): string {
    const entries = data.items
        .map((item) =>
            [
                '  <entry>',
                `    <id>${xmlEscape(item.url)}</id>`,
                `    <title>${xmlEscape(item.title)}</title>`,
                `    <link href="${xmlEscape(item.url)}"/>`,
                `    <published>${toRfc3339(item.published)}</published>`,
                `    <updated>${toRfc3339(item.updated)}</updated>`,
                `    <summary>${xmlEscape(item.description)}</summary>`,
                ...item.tags.map((tag) => `    <category term="${xmlEscape(tag)}"/>`),
                `    <content type="html">${cdata(item.contentHtml)}</content>`,
                '  </entry>'
            ].join('\n')
        )
        .join('\n');

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<feed xmlns="http://www.w3.org/2005/Atom">',
        `  <id>${siteURL}/</id>`,
        `  <title>${xmlEscape(data.title)}</title>`,
        `  <subtitle>${xmlEscape(data.description)}</subtitle>`,
        `  <updated>${toRfc3339(data.updated)}</updated>`,
        `  <link href="${siteURL}"/>`,
        `  <link href="${siteURL}/atom.xml" rel="self" type="application/atom+xml"/>`,
        '  <author>',
        `    <name>${xmlEscape(authorName)}</name>`,
        `    <email>${xmlEscape(user.email)}</email>`,
        '  </author>',
        entries,
        '</feed>',
        ''
    ].join('\n');
}

/** Serialise the feed model to JSON Feed 1.1. */
export function renderJsonFeed(data: FeedData): string {
    const feed = {
        version: 'https://jsonfeed.org/version/1.1',
        title: data.title,
        description: data.description,
        home_page_url: siteURL,
        feed_url: `${siteURL}/feed.json`,
        language: 'en',
        authors: [{ name: authorName, url: siteURL }],
        items: data.items.map((item) => ({
            id: item.url,
            url: item.url,
            title: item.title,
            summary: item.description,
            content_html: item.contentHtml,
            image: item.imageUrl,
            date_published: toRfc3339(item.published),
            date_modified: toRfc3339(item.updated),
            tags: item.tags
        }))
    };
    return `${JSON.stringify(feed, null, 2)}\n`;
}
