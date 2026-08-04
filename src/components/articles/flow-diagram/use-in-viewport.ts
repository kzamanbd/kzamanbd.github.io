'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Whether an element is currently on screen.
 *
 * Used to stop a diagram's walk when it scrolls away: an article can carry
 * several diagrams, and every one of them stepping and animating packets while
 * the reader is three sections further down is work nobody sees.
 *
 * The margin lets playback start just before the diagram is fully in view, so a
 * reader scrolling to it does not arrive at a frozen first frame.
 */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = '120px'): boolean {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
            { rootMargin }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, rootMargin]);

    return isVisible;
}
