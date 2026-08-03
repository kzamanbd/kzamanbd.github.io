import { JsonLdScript } from '@/components/json-ld-script';
import HashScroll from '@/components/layout/hash-scroll';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { GoogleTagManager } from '@next/third-parties/google';
import { ThemeProviders } from '@/components/theme-providers';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const googleTagManagerId = 'G-NB5NCE8041';
const facebookPageId = '561025357095593';

import {
    authorName,
    description,
    siteKeywords,
    siteName,
    siteThumbnail,
    siteURL
} from '@/lib/metadata';

export const metadata: Metadata = {
    metadataBase: new URL(siteURL),
    title: {
        default: 'Kamruzzaman - Software Engineer',
        template: '%s | Kamruzzaman'
    },
    description,
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
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
            <head>
                <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Kamruzzaman" />
                <meta property="fb:pages" content={facebookPageId}></meta>
                <JsonLdScript />
            </head>
            <GoogleTagManager gtmId={googleTagManagerId} />
            <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
                <ThemeProviders>
                    <HashScroll />
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProviders>
            </body>
        </html>
    );
}
