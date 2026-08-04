'use client';

import { useEffect, useState } from 'react';

/**
 * Whether the reader has asked the OS for reduced motion.
 *
 * Starts false and corrects after mount rather than reading the query during
 * render: the server has no `matchMedia`, and a value that differs between the
 * server pass and the first client pass is a hydration mismatch. Starting at
 * false means the honest case is "animate, then stop" rather than a flash of the
 * wrong state for everyone else.
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(query.matches);

        const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    return prefersReduced;
}
