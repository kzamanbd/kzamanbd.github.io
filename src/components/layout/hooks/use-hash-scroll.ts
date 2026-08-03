'use client';

import { lockScrollSync } from '@/components/layout/scroll-sync-lock';
import { useEffect } from 'react';

// How long to let web fonts settle the content above the target before gliding,
// so the section's final offset is known. Capped so the glide is never delayed
// noticeably even if fonts are slow.
const SETTLE_TIMEOUT_MS = 300;

/**
 * On a direct visit to a URL with a fragment (e.g. /#skills), glide smoothly to
 * that section instead of letting the browser snap to it.
 *
 * `scroll-behavior: smooth` on <html> makes the browser's own fragment scroll
 * unreliable: it can start before layout settles, get interrupted, and leave the
 * visitor short of the target. So we take over: snap to the top instantly (so
 * the move reads as a deliberate glide down rather than an abrupt jump), wait a
 * beat for fonts to settle the offset, then smooth-scroll to the section
 * ourselves. The section -> URL sync is held off for the duration.
 */
export function useHashScroll() {
    useEffect(() => {
        const { hash } = window.location;
        if (hash.length < 2) return;

        const id = decodeURIComponent(hash.slice(1));
        if (!document.getElementById(id)) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Keep the URL sync quiet across the whole take-over (settle + glide).
        lockScrollSync(1500);

        // Snap to the top instantly, overriding the global smooth behavior, so
        // the glide has somewhere to travel from.
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        root.style.scrollBehavior = previousBehavior;

        let cancelled = false;
        let settleTimer = 0;

        const glideToTarget = () => {
            if (cancelled) return;
            // Re-lock for the glide itself in case fonts settled slowly.
            lockScrollSync(1000);
            document.getElementById(id)?.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        };

        // Glide once fonts are ready, but never wait longer than the cap.
        const settle = new Promise<void>((resolve) => {
            settleTimer = window.setTimeout(resolve, SETTLE_TIMEOUT_MS);
        });
        Promise.race([document.fonts?.ready ?? Promise.resolve(), settle]).then(() => {
            if (cancelled) return;
            requestAnimationFrame(glideToTarget);
        });

        return () => {
            cancelled = true;
            window.clearTimeout(settleTimer);
        };
    }, []);
}
