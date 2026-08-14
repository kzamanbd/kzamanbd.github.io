import DeferredGoogleTagManager from '@/components/analytics/deferred-google-tag-manager';
import PageviewTracker from '@/components/analytics/pageview-tracker';
import { JsonLdScript } from '@/components/json-ld-script';
import HashScroll from '@/components/layout/hash-scroll';
import ServiceWorkerManager from '@/components/pwa/service-worker-manager';
import { ThemeProviders } from '@/components/theme-providers';
import PageGradientBackground from '@/components/backgrounds/page-gradient';
import { PageGradientProvider } from '@/components/backgrounds/page-gradient/provider';
import { notoSans } from '@/config/fonts';
import type { Metadata, Viewport } from 'next';
import './globals.css';

import {
    authorName,
    description,
    facebookPageId,
    siteKeywords,
    siteName,
    siteThumbnail,
    siteURL
} from '@/lib/metadata';

// GTM, the pageview tracker and the service worker exist only in production:
// analytics should not record local navigation, and the worker would fight
// Turbopack's hot reload in development (it is compiled out there anyway).
const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
    metadataBase: new URL(siteURL),
    title: {
        default: 'Kamruzzaman - Software Engineer',
        template: '%s | Kamruzzaman'
    },
    description,
    // Advertise the three feeds site-wide so a reader can subscribe from any page.
    //
    // `'./'` — not `siteURL`. Next merges metadata down the segment tree, so an
    // absolute canonical here is inherited by every route that does not set its
    // own, and pages like /resume then declare themselves duplicates of the
    // homepage. The relative form resolves against `metadataBase` per route, so
    // each page self-canonicalises.
    alternates: {
        canonical: './',
        types: {
            'application/rss+xml': `${siteURL}/feed.xml`,
            'application/atom+xml': `${siteURL}/atom.xml`,
            'application/feed+json': `${siteURL}/feed.json`
        }
    },
    openGraph: {
        title: authorName,
        description,
        url: siteURL,
        siteName,
        locale: 'en_US',
        type: 'website',
        images: '/opengraph-image.png'
    },
    twitter: {
        card: 'summary_large_image',
        title: authorName,
        description,
        creator: '@_kzamanbd'
    },
    creator: authorName,
    applicationName: siteName,
    publisher: authorName,
    keywords: siteKeywords,
    category: 'portfolio',
    icons: {
        icon: '/icons/icon-192x192.png',
        apple: '/icons/icon-192x192.png',
        shortcut: '/icons/icon-192x192.png'
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    facebook: {
        admins: [facebookPageId]
    },
    other: {
        thumbnail: siteThumbnail
    }
};

export const viewport: Viewport = {
    themeColor: 'white'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    // `data-scroll-behavior="smooth"` tells Next the smooth scrolling on <html>
    // is deliberate: it then suppresses it for the duration of a route
    // transition, so a navigation lands at the top instead of gliding there,
    // while in-page anchors keep gliding.
    return (
        <html
            lang="en"
            className="scroll-smooth"
            data-scroll-behavior="smooth"
            suppressHydrationWarning={true}>
            <head>
                <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Kamruzzaman" />
                <meta property="fb:pages" content={facebookPageId}></meta>
                <JsonLdScript />
            </head>
            {/* `relative` so the page wash below can span the whole document
                and scroll with it rather than staying pinned to the viewport. */}
            <body
                className={`${notoSans.variable} relative font-sans antialiased`}
                suppressHydrationWarning={true}>
                <ThemeProviders>
                    <PageGradientProvider>
                        <PageGradientBackground />
                        <HashScroll />
                        {children}
                    </PageGradientProvider>
                    {isProduction && (
                        <>
                            <DeferredGoogleTagManager />
                            <PageviewTracker />
                            <ServiceWorkerManager />
                        </>
                    )}
                </ThemeProviders>
            </body>
        </html>
    );
}
