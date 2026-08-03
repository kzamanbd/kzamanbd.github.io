/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import { Serwist, type PrecacheEntry, type SerwistGlobalConfig } from 'serwist';

// Serwist injects the precache manifest (the app shell) at build time; runtime
// caching (defaultCache) then handles visited pages and assets so they work
// offline.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

// Serwist's stock defaultCache ends with two greedy rules: a NetworkFirst that
// caches every cross-origin response, and a NetworkOnly wildcard. When a
// third-party script (an analytics tag, say) is blocked or offline, that
// NetworkFirst finds no cached fallback and rejects the fetch event with
// `no-response`, surfacing as an uncaught service-worker error. Drop both
// catch-alls so third-party requests fall through to the browser; same-origin
// pages and assets keep their specific rules above.
const runtimeCaching = defaultCache.slice(0, -2);

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    // The update toast drives the swap, so a new worker waits until the client
    // messages SKIP_WAITING rather than activating over an open tab.
    skipWaiting: false,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching,
    // When an unvisited page is opened offline, serve the precached offline
    // shell instead of the browser's default error page. It is a plain static
    // file rather than a Next route on purpose: a Next document served under an
    // arbitrary URL would re-run the client router and render not-found instead
    // of the offline message.
    fallbacks: {
        entries: [
            {
                url: '/offline.html',
                matcher({ request }) {
                    return request.destination === 'document';
                }
            }
        ]
    }
});

serwist.addEventListeners();
