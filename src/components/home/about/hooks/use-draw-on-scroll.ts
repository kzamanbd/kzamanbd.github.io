'use client';

import { useEffect, useRef, useState } from 'react';

export type DrawState = 'static' | 'collapsed' | 'drawn';

/**
 * Drives a draw-in-on-scroll effect, such as the SVG connector lines in the
 * about diagram. It mirrors the AnimatedUnderline approach: render fully drawn
 * for no-JS and reduced-motion visitors, otherwise collapse the stroke while
 * the element is still off-screen and draw it once it scrolls into view.
 */
export function useDrawOnScroll<T extends Element>(threshold = 0.4) {
    const ref = useRef<T>(null);
    const [state, setState] = useState<DrawState>('static');

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Keep the static, fully drawn lines.
            return;
        }

        const element = ref.current;
        if (!element || !('IntersectionObserver' in window)) {
            setState('drawn');
            return;
        }

        // Collapse first. This happens off-screen, so there is no visible flash.
        setState('collapsed');

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setState('drawn');
                        observer.disconnect();
                        break;
                    }
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, state };
}
