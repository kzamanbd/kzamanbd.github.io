import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://draftscripts.com';
    return [
        {
            url: siteURL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
            images: [`${siteURL}/kzaman.jpg`]
        }
    ];
}
