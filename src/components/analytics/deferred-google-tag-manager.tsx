'use client';

import { googleTagManagerId } from '@/lib/metadata';
import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

/**
 * Mounts GTM only after the window `load` event plus an idle callback, keeping
 * its sizeable `gtm.js` download out of the LCP bandwidth window on throttled
 * mobile (the hero name is the LCP element). `@next/third-parties`'
 * `GoogleTagManager` loads its script `afterInteractive` with no way to override
 * the strategy, so gating the render is how the deferral is expressed.
 *
 * No events are lost: `sendGTMEvent` pushes into `window.dataLayer[]`, created
 * lazily, so anything fired before GTM boots buffers in the array and is
 * processed once it initialises.
 */
export default function DeferredGoogleTagManager() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const scheduleMount = () => {
            const idle =
                window.requestIdleCallback ??
                ((callback: IdleRequestCallback) =>
                    window.setTimeout(() => callback({} as IdleDeadline), 1));
            idle(() => setMounted(true));
        };

        if (document.readyState === 'complete') {
            scheduleMount();
            return;
        }

        window.addEventListener('load', scheduleMount, { once: true });
        return () => window.removeEventListener('load', scheduleMount);
    }, []);

    if (!mounted) return null;

    return <GoogleTagManager gtmId={googleTagManagerId} />;
}
