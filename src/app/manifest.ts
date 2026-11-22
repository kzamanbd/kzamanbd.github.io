import { authorName, description } from '@/services/metadata';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
// This is a static manifest file for the PWA (Progressive Web App) configuration.

export default function manifest(): MetadataRoute.Manifest {
    return {
        // The canonical name and the site description, rather than a third
        // spelling ("Kamruzzaman's Portfolio - Web Developer, Designer...") that
        // disagreed with the schema and the page titles.
        name: authorName,
        short_name: 'Zaman',
        description,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        orientation: 'portrait',
        icons: [
            {
                src: '/icons/icon-144x144.png',
                sizes: '144x144',
                type: 'image/png'
            },
            {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
        screenshots: [
            {
                src: '/screenshot-2560x1280.png',
                sizes: '2560x1280',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Kamruzzaman - Wide Screenshot'
            },
            {
                src: '/screenshot-1274x1822.png',
                sizes: '1274x1822',
                type: 'image/png',
                form_factor: 'narrow',
                label: 'Kamruzzaman - Narrow Screenshot'
            }
        ]
    };
}
