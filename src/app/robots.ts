import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    const sitemapURL = process.env.NEXT_PUBLIC_SITEMAP_URL || 'https://kzaman.com/sitemap.xml';
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/private/',
                // The shortener's redirect targets are user-supplied, so a
                // crawled /shorturl/<code> would lend this domain's name to
                // whatever it points at. The tool's own page stays indexable;
                // the redirects do not.
                '/shorturl/'
                // /articles/search is deliberately NOT listed: it carries a
                // `noindex` robots tag, and a crawler that is blocked here can
                // never fetch the page to see it. Blocking a page you want
                // dropped from the index is what keeps it in the index.
            ]
        },
        sitemap: sitemapURL
    };
}
