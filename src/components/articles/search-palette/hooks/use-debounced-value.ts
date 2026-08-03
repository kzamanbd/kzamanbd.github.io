'use client';

import { useEffect, useState } from 'react';

/**
 * Trails a fast-changing value by `delayMs`, so ranking runs once the reader
 * pauses rather than on every keystroke. The timer is reset on each change and
 * cleared on unmount, so a stale value can never land after the fact.
 */
export function useDebouncedValue<T>(value: T, delayMs = 120): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
}
