'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Where the bar starts once it appears. */
const initialValue = 0.08;
/** A navigation has this long to finish before the bar appears at all, in ms.
 *  A prefetched route commits in a few frames, and flashing a full bar through
 *  that is noise; anything slower is worth acknowledging. */
const revealDelay = 160;
/** The creep approaches this asymptotically and never reaches it: the last
 *  slice of the bar belongs to the moment the route actually commits. */
const ceiling = 0.92;
/** Share of the remaining distance the bar covers on each tick. */
const trickleStep = 0.18;
/** How often the creep advances, in ms. */
const trickleInterval = 200;
/** How often the committed URL is compared against the pending one, in ms. */
const pollInterval = 100;
/** How long the full bar lingers at 100% before it fades out, in ms. */
const settleDelay = 240;
/** How long the fade-out lasts, in ms. Must match the CSS transition. */
const fadeDuration = 260;
/** Nothing keeps the bar on screen longer than this, in ms. It is a backstop for
 *  a click something else cancels, so it sits well past any real navigation:
 *  cutting a slow one short would hide the bar exactly when it is most useful. */
const safetyTimeout = 12000;

export interface RouteProgressState {
    /** Fill fraction, 0..1. */
    value: number;
    /** Whether a navigation is in flight (or just finished and still fading). */
    active: boolean;
}

const idleState: RouteProgressState = { value: 0, active: false };

/** The part of the current location a client navigation can change. */
function currentUrl(): string {
    return window.location.pathname + window.location.search;
}

/**
 * Resolves the click target to the internal destination it navigates to, or
 * `null` when the click is not a same-tab navigation to a different URL —
 * modified clicks, new tabs, downloads, external hosts, and pure `#fragment`
 * links all fall through, since none of them run a route transition.
 */
function navigationTarget(event: MouseEvent): string | null {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return null;
    }

    const element = event.target instanceof Element ? event.target : null;
    const anchor = element?.closest('a');
    if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download')) {
        return null;
    }
    if (anchor.target && anchor.target !== '_self') {
        return null;
    }

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) {
        return null;
    }

    const target = url.pathname + url.search;
    return target === currentUrl() ? null : target;
}

/**
 * Tracks client-side route transitions as a 0..1 fraction for the top progress
 * bar.
 *
 * There is no navigation-start event in the App Router, so a transition is
 * picked up where it begins — a left click on an internal link, captured at the
 * document so it is seen before `Link` calls `preventDefault()` — and from
 * `popstate` for back/forward. Since the real duration is unknowable, the bar
 * creeps towards a ceiling and only fills once the route commits. A transition
 * that finishes inside the reveal delay never shows anything at all, so a
 * prefetched route does not flash a bar on its way in.
 *
 * A commit is observed two ways: `usePathname()` changing covers ordinary
 * navigation and history moves, and polling the URL covers query-only
 * navigations (`?page=2`), where the pathname never changes. A safety timeout
 * closes the bar out if a click is cancelled by something else on the page and
 * no navigation ever happens.
 */
export function useRouteProgress(): RouteProgressState {
    const pathname = usePathname();
    const [state, setState] = useState<RouteProgressState>(idleState);

    // The listeners run outside React's render, so the in-flight status is kept
    // in a ref: reading it from state would capture a stale value.
    const pending = useRef(false);
    const shown = useRef(false);
    const target = useRef<string | null>(null);
    const timers = useRef<number[]>([]);

    const clearTimers = useCallback(() => {
        for (const timer of timers.current) {
            window.clearTimeout(timer);
            window.clearInterval(timer);
        }
        timers.current = [];
    }, []);

    const complete = useCallback(() => {
        if (!pending.current) {
            return;
        }
        pending.current = false;
        target.current = null;
        clearTimers();
        // A navigation that beat the reveal delay never painted anything, so
        // there is nothing to fill or fade out. Resetting rather than returning
        // covers the case where this run interrupted a bar that was still
        // fading out, whose own timers were cleared when it started.
        if (!shown.current) {
            setState(idleState);
            return;
        }
        shown.current = false;
        setState({ value: 1, active: true });
        timers.current.push(
            window.setTimeout(() => setState({ value: 1, active: false }), settleDelay),
            // Rewinding only after the fade has finished keeps the reset
            // invisible; the bar drops its transition while inactive.
            window.setTimeout(() => setState(idleState), settleDelay + fadeDuration)
        );
    }, [clearTimers]);

    const start = useCallback(
        (destination: string | null) => {
            clearTimers();
            pending.current = true;
            target.current = destination;

            // A click on a second link while the bar is already up continues
            // the run it can see rather than rewinding to the start.
            const carry = shown.current;
            const reveal = () => {
                shown.current = true;
                setState((previous) => ({
                    value: carry ? Math.max(previous.value, initialValue) : initialValue,
                    active: true
                }));
                timers.current.push(
                    window.setInterval(() => {
                        setState((previous) => ({
                            value: previous.value + (ceiling - previous.value) * trickleStep,
                            active: true
                        }));
                    }, trickleInterval)
                );
            };

            timers.current.push(
                window.setTimeout(reveal, carry ? 0 : revealDelay),
                window.setInterval(() => {
                    if (target.current && currentUrl() === target.current) {
                        complete();
                    }
                }, pollInterval),
                window.setTimeout(complete, safetyTimeout)
            );
        },
        [clearTimers, complete]
    );

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const destination = navigationTarget(event);
            if (destination) {
                start(destination);
            }
        };

        // `popstate` fires after the URL has already moved, so there is no
        // destination to watch for: that transition ends on the pathname change.
        const handlePopState = () => start(null);

        document.addEventListener('click', handleClick, { capture: true });
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleClick, { capture: true });
            window.removeEventListener('popstate', handlePopState);
            clearTimers();
        };
    }, [clearTimers, start]);

    useEffect(() => {
        complete();
        // The pathname is the signal here: a render for any other reason must
        // not end a transition that is still in flight.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return state;
}
