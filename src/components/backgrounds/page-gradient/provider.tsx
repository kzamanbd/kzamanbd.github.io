'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type GradientColors = readonly [string, string];

interface PageGradientContextValue {
    /** Colours a page has claimed for the wash, or null to fall back to the route. */
    override: GradientColors | null;
    setOverride: (colors: GradientColors | null) => void;
}

const PageGradientContext = createContext<PageGradientContextValue | null>(null);

/**
 * Lets a page override the global wash colours (through `SyncPageGradient`) so
 * the full-page gradient can match that page's own accent rather than the
 * generic route-hash colour. It wraps both the background and the page content
 * in the root layout, so the two share one override slot.
 */
export function PageGradientProvider({ children }: { children: ReactNode }) {
    const [override, setOverride] = useState<GradientColors | null>(null);
    const value = useMemo(() => ({ override, setOverride }), [override]);

    return <PageGradientContext.Provider value={value}>{children}</PageGradientContext.Provider>;
}

/**
 * Reads the current wash override. Outside a provider it returns a null
 * override and a no-op setter, so the background degrades to route-derived
 * colours instead of throwing.
 */
export function usePageGradientOverride(): PageGradientContextValue {
    return useContext(PageGradientContext) ?? { override: null, setOverride: () => {} };
}
