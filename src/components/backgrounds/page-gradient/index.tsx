'use client';

import styles from '@/components/backgrounds/page-gradient/page-gradient.module.css';
import {
    usePageGradientOverride,
    type GradientColors
} from '@/components/backgrounds/page-gradient/provider';
import { coverGradientForSlug } from '@/utils/article-cover';
import { cn } from '@/utils/cn';
import { pageGradientColors } from '@/utils/page-gradient';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';

/** The single path segment of an `/articles/<slug>` detail route, or null. */
function articleSlugFromPath(pathname: string): string | null {
    const match = pathname.match(/^\/articles\/([^/]+)\/?$/);
    return match?.[1] ?? null;
}

/**
 * The wash colours for a route when no page has claimed an override: an article
 * detail route uses its slug's cover gradient, so the wash is already
 * article-coloured on first paint; home stays transparent because it paints its
 * own section swells; every other route gets its deterministic colour.
 */
function routeGradientColors(pathname: string): GradientColors {
    const articleSlug = articleSlugFromPath(pathname);
    if (articleSlug) {
        return coverGradientForSlug(articleSlug);
    }
    if (pathname === '/') {
        return ['transparent', 'transparent'];
    }

    const { from, to } = pageGradientColors(pathname);
    return [from, to];
}

/**
 * The full-page gradient wash. It is absolutely positioned over the relative
 * body, so it spans the whole document and scrolls with the page. The gradient
 * itself, and its light/dark tuning, live in the co-located CSS module; this
 * component only feeds it the two accent colours.
 *
 * It stays mounted on every route (transparent on home) rather than unmounting,
 * so the registered colour properties transition on navigation and the wash
 * cross-fades in, out, and between pages.
 */
export default function PageGradientBackground() {
    const pathname = usePathname();
    const { override } = usePageGradientOverride();

    const [from, to] = override ?? routeGradientColors(pathname);

    return (
        <div
            aria-hidden="true"
            className={cn(
                styles.pageGradient,
                'pointer-events-none absolute inset-0 -z-10 print:hidden'
            )}
            style={
                {
                    '--page-grad-from': from,
                    '--page-grad-to': to
                } as CSSProperties
            }
        />
    );
}
