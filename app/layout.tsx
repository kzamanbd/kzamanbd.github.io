import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

import { authorName, description, profileImage } from '@/app/metadata';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="scroll-smooth" lang="en" suppressHydrationWarning={true}>
            <head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />

                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href={profileImage} />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta name="theme-color" content="#009EF7" />
                <meta name="apple-mobile-web-app-status-bar" content="#009EF7" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content={authorName} />
                <meta name="application-name" content={authorName} />
                <meta name="description" content={description} />
                <meta
                    name="keywords"
                    content="kzamanbd, kzaman, kamruzzaman, software engineer, problem solving, kzamanbn, "
                />
                <meta name="author" content={authorName} />
                <meta name="theme-color" content="#009EF7" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://kzaman.vercel.app" />
                <meta name="twitter:title" content={authorName} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="/images/icons/android-chrome-192x192.png" />
                <meta name="twitter:creator" content="@kzaman" />
                <meta name="title" property="og:title" content={authorName} key="title" />
                <meta name="description" property="og:description" content={description} key="desc" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={authorName} />
                <meta property="og:url" content="https://kzaman.vercel.app" />
                <meta property="og:image" content="/images/icons/android-chrome-192x192.png" />
            </head>
            <body suppressHydrationWarning={true}>
                <div className={inter.className}>
                    <NextTopLoader
                        color="#2299DD"
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={true}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    />
                    {children}
                </div>
                <ToastContainer />
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-3HFZXXGGM3" />
                <Script id="google-analytics">
                    {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'GA_MEASUREMENT_ID');
                `}
                </Script>
            </body>
        </html>
    );
}
