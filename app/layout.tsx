import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });


const description = `Over three years of experience building web applications, updating existing web applications, and fixing bugs. I like to learn and use new technology in web development. I have worked extensively on various stages of application development by creating & implementing application architecture, which includes various stages in development, code signing, and releasing to Market and collaborative environments for the web platform.`;

const authorName = 'KAMRUZZAMAN';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<title>KAMRUZZAMAN</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
				/>

				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/icons/icon-192x192.png" />
				<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
				<meta name="theme-color" content="#009EF7" />
				<meta name="apple-mobile-web-app-status-bar" content="#009EF7" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content={authorName} />
				<meta name="application-name" content={authorName} />
				<meta name="description" content={description} />
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
				<div className={inter.className}>{children}</div>
			</body>
		</html>
	);
}
