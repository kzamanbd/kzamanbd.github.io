'use client';

import { lockScrollSync } from '@/components/layout/scroll-sync-lock';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';

interface NavLogoProps {
    className?: string;
    onNavigate?: () => void;
    /**
     * Collapse the wordmark to just the surname below the lg breakpoint and
     * reveal the full name at lg and up. The desktop bar uses this: the full
     * wordmark would otherwise push the pill wider than the viewport between the
     * md and lg breakpoints (roughly 768 to 1023px).
     */
    collapsible?: boolean;
    /**
     * Collapsible only: when false the wordmark collapses to zero width and
     * fades out, so the desktop bar does not duplicate the hero name near the
     * top of the home page.
     */
    revealed?: boolean;
}

/**
 * Home logo. On the home page it smooth-scrolls back to the top and strips any
 * hash from the URL, so the address bar stays at "/". On other pages it is a
 * plain link home. We scroll in JS rather than linking to "#hero" because Next
 * skips hash scrolling when the target is already partly in view, so a "#hero"
 * link would do nothing while the hero is still on screen.
 */
export default function NavLogo({
    className,
    onNavigate,
    collapsible = false,
    revealed = true
}: NavLogoProps) {
    const pathname = usePathname();

    const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
        onNavigate?.();
        if (pathname !== '/') return;
        event.preventDefault();
        // Hold the URL sync off so the hash clears cleanly to "/" instead of
        // being rewritten to each section the upward glide passes.
        lockScrollSync(1000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(
            window.history.state,
            '',
            window.location.pathname + window.location.search
        );
    };

    const wordmark = (
        <span className="text-sm font-bold tracking-[0.18em] whitespace-nowrap uppercase">
            <span>Kamruzzaman</span>
        </span>
    );

    return (
        <Link
            href="/"
            aria-label="Home"
            onClick={scrollToTop}
            className={cn('focus-ring rounded-sm', className)}>
            {collapsible ? (
                // The wrapper clips the wordmark and animates its max-width, so
                // the name slides in toward the divider once the bar has room.
                <span
                    className={cn(
                        'block overflow-clip transition-[max-width,opacity] duration-500 ease-out [overflow-clip-margin:2px] motion-reduce:transition-none',
                        revealed ? 'max-w-[9rem] opacity-100' : 'max-w-0 opacity-0'
                    )}>
                    {wordmark}
                </span>
            ) : (
                wordmark
            )}
        </Link>
    );
}
