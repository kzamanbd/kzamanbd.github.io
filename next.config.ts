import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// A fresh ISO timestamp per build, baked into the client and into the
// version.json route so a running app can detect a newer deploy: the deployed
// build's builtAt is strictly later than the one baked into an older open tab.
// Git plays no part, so it behaves identically locally and in CI regardless of
// clone depth. An explicit NEXT_PUBLIC_BUILD_TIME wins, so a build can be pinned
// to compare two runs byte for byte.
const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME ?? new Date().toISOString();

const nextConfig: NextConfig = {
    poweredByHeader: false,
    // `.dev.tsx` / `.dev.ts` count as routes only in development, which is what
    // keeps the article editor and its filesystem Server Actions out of the
    // production build entirely. This site is server-rendered, so an unguarded
    // /studio route would be live and world-writable on the deployed host; the
    // actions module carries a second, runtime guard for the same reason.
    pageExtensions: isDev
        ? ['tsx', 'ts', 'jsx', 'js', 'dev.tsx', 'dev.ts']
        : ['tsx', 'ts', 'jsx', 'js'],
    env: {
        NEXT_PUBLIC_BUILD_TIME: buildTime
    },
    experimental: {
        turbopackFileSystemCacheForDev: true
    }
};

// Serwist compiles the service worker (src/app/sw.ts) into public/sw.js. It is
// disabled in development so it never fights Turbopack's hot reload.
// Registration is manual (see ServiceWorkerManager) so the update toast can
// drive the waiting-worker swap rather than a new build silently taking over an
// open tab.
//
// `@serwist/next` is a webpack plugin and is a no-op under Turbopack, which is
// Next 16's default bundler: building with it silently produces no sw.js and an
// inert PWA. Hence `next build --webpack` in package.json. Dev still uses
// Turbopack, which is fine because the worker is disabled there anyway.
const withSerwist = withSerwistInit({
    cacheOnNavigation: true,
    swSrc: 'src/app/sw.ts',
    swDest: 'public/sw.js',
    disable: isDev,
    register: false,
    reloadOnOnline: false
});

export default withSerwist(nextConfig);
