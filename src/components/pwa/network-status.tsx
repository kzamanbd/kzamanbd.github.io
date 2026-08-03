'use client';

import Button from '@/components/ui/button';
import ButtonLink from '@/components/ui/button-link';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';

/** How long the probe waits before retrying while still offline. */
const PROBE_RETRY_MS = 3000;

/**
 * Live connectivity readout for /network-status.
 *
 * Connectivity is confirmed with an active fetch probe rather than trusting
 * `navigator.onLine`, which stays true under DevTools "Offline" and behind
 * captive portals. The `online` event is only a hint and can be missed entirely,
 * so the probe is also polled while offline and stops once connectivity is
 * confirmed; the trustworthy `offline` event resumes it.
 *
 * Unlike the static /offline.html shell (which the service worker serves in
 * place of an uncached page), this route never auto-reloads: reloading the page
 * a visitor deliberately opened would just loop.
 */
export default function NetworkStatus() {
    const [online, setOnline] = useState<boolean | null>(null);

    useEffect(() => {
        let cancelled = false;
        let retryTimer: ReturnType<typeof setTimeout> | undefined;

        const probe = async () => {
            let reachable = false;
            try {
                const response = await fetch(`/version.json?ts=${Date.now()}`, {
                    cache: 'no-store'
                });
                reachable = response.ok;
            } catch {
                reachable = false;
            }
            if (cancelled) return;
            setOnline(reachable);
            if (!reachable) retryTimer = setTimeout(probe, PROBE_RETRY_MS);
        };

        const onOffline = () => {
            setOnline(false);
            void probe();
        };

        void probe();
        window.addEventListener('online', () => void probe());
        window.addEventListener('offline', onOffline);

        return () => {
            cancelled = true;
            clearTimeout(retryTimer);
            window.removeEventListener('offline', onOffline);
        };
    }, []);

    const checking = online === null;
    const accent = checking ? 'text-foreground/50' : online ? 'text-emerald-500' : 'text-amber-500';

    return (
        <div className="flex flex-col items-center text-center">
            <span
                aria-hidden="true"
                className={cn(
                    'relative grid size-3 place-items-center rounded-full',
                    checking ? 'bg-foreground/40' : online ? 'bg-emerald-500' : 'bg-amber-500'
                )}>
                {!checking && online && (
                    <span className="absolute size-3 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                )}
            </span>

            <p className={cn('mt-4 text-xs font-semibold tracking-[0.12em] uppercase', accent)}>
                {checking ? 'Checking' : online ? 'Back online' : 'No connection'}
            </p>

            <h1 className="text-foreground mt-3 text-3xl font-bold sm:text-4xl">
                {checking ? 'Checking connection' : online ? 'Online' : 'Offline'}
            </h1>

            <p className="text-foreground/70 mt-4 max-w-xl text-lg leading-relaxed text-balance">
                {online
                    ? 'You are back online. Everything should load normally again.'
                    : 'You have slipped off the grid. Pages you have already visited are still available; anything else needs the connection back.'}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Check again
                </Button>
                <ButtonLink href="/">Back home</ButtonLink>
            </div>
        </div>
    );
}
