'use client';

import { usePageGradientOverride } from '@/components/backgrounds/page-gradient/provider';
import { useEffect } from 'react';

/**
 * Claims the global page wash for the current page's colours while it is
 * mounted, and releases it on unmount so other routes fall back to their
 * route-derived wash. Rendered by pages that want the gradient to match their
 * own accent, such as an article feeding its exact cover colours. Renders
 * nothing itself.
 */
export default function SyncPageGradient({ colors }: { colors: readonly [string, string] }) {
    const { setOverride } = usePageGradientOverride();
    const [from, to] = colors;

    useEffect(() => {
        setOverride([from, to]);
        return () => setOverride(null);
    }, [from, to, setOverride]);

    return null;
}
