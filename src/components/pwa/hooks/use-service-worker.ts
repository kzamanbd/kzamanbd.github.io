'use client';

import { getBuiltAt } from '@/lib/version';
import { Serwist } from '@serwist/window';
import { useCallback, useEffect, useRef, useState } from 'react';

/** How often a long-lived tab re-checks version.json for a newer deploy. */
const VERSION_POLL_INTERVAL_MS = 60_000;

/** Cache Storage buckets whose name contains this are the Serwist precache. */
const PRECACHE_NAME_MARKER = 'serwist-precache';

/**
 * Delete the runtime caches (visited pages, static assets, images) while
 * preserving the Serwist precache. Called when an update takes over, so an asset
 * that changed in place under a stable URL is refetched fresh without dropping
 * the precache: the app shell and /offline.html live there and must stay
 * available offline. The emptied runtime caches repopulate on demand.
 */
async function clearRuntimeCaches(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;
    try {
        const cacheKeys = await caches.keys();
        await Promise.all(
            cacheKeys
                .filter((key) => !key.includes(PRECACHE_NAME_MARKER))
                .map((key) => caches.delete(key))
        );
    } catch {
        // Best effort; the reload below still proceeds.
    }
}

interface ServiceWorkerState {
    /** True once an updated service worker is waiting to take over. */
    updateReady: boolean;
    /** Tell the waiting worker to activate; the page reloads when it takes control. */
    applyUpdate: () => void;
}

/**
 * Registers the service worker and surfaces when a new build is ready.
 *
 * Two triggers feed `updateReady`: the service worker's own `waiting` lifecycle
 * (a new worker installed alongside the running one), and a poll of
 * `version.json` whose `builtAt` is compared against the one baked into this
 * bundle. When the deployed build is strictly newer, `serwist.update()` forces
 * the browser to re-check the worker so `waiting` fires without waiting for its
 * periodic byte-check. Applying the update messages the worker to skip waiting;
 * the resulting `controlling` event clears the runtime caches (keeping the
 * precache) and reloads the page onto the new build.
 */
export function useServiceWorker(): ServiceWorkerState {
    const [updateReady, setUpdateReady] = useState(false);
    const serwistRef = useRef<Serwist | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return;
        }

        // updateViaCache: 'none' makes the browser bypass the HTTP cache when
        // fetching sw.js on every update check, so a client can never install a
        // stale sw.js whose precache manifest lists a previous build's
        // content-hashed assets (already gone) and fail the whole install.
        const serwist = new Serwist('/sw.js', { scope: '/', updateViaCache: 'none' });
        serwistRef.current = serwist;

        const onWaiting = () => setUpdateReady(true);
        serwist.addEventListener('waiting', onWaiting);

        let hasReloaded = false;
        const onControlling = async () => {
            if (hasReloaded) return;
            hasReloaded = true;
            await clearRuntimeCaches();
            window.location.reload();
        };
        serwist.addEventListener('controlling', onControlling);

        void serwist.register();

        const currentBuiltAt = new Date(getBuiltAt()).getTime();
        const checkForNewBuild = async () => {
            try {
                // The per-request query defeats CDN and service-worker caches, so
                // every poll reflects the currently deployed build.
                const response = await fetch(`/version.json?ts=${Date.now()}`, {
                    cache: 'no-store'
                });
                if (!response.ok) return;
                const data: { builtAt?: string } = await response.json();
                const deployedBuiltAt = new Date(data.builtAt ?? '').getTime();
                if (Number.isFinite(deployedBuiltAt) && deployedBuiltAt > currentBuiltAt) {
                    await serwist.update();
                }
            } catch {
                // Offline or transient failure; retry on the next tick.
            }
        };

        // Check once on load so a fresh deploy surfaces immediately rather than
        // only after the first poll tick. Fire and forget, never blocking paint.
        void checkForNewBuild();

        const pollTimer = window.setInterval(checkForNewBuild, VERSION_POLL_INTERVAL_MS);
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') void checkForNewBuild();
        };
        document.addEventListener('visibilitychange', onVisibilityChange);

        // Re-check the moment connectivity returns, so a tab left open through an
        // offline stretch catches up on any deploy it missed.
        const onOnline = () => void checkForNewBuild();
        window.addEventListener('online', onOnline);

        return () => {
            window.clearInterval(pollTimer);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('online', onOnline);
            serwist.removeEventListener('waiting', onWaiting);
            serwist.removeEventListener('controlling', onControlling);
        };
    }, []);

    const applyUpdate = useCallback(() => {
        serwistRef.current?.messageSkipWaiting();
    }, []);

    return { updateReady, applyUpdate };
}
