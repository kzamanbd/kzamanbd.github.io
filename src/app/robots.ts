import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    const sitemapURL =
        process.env.NEXT_PUBLIC_SITEMAP_URL || 'https://draftscripts.com/sitemap.xml';
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/'
        },
        sitemap: sitemapURL
    };
}
