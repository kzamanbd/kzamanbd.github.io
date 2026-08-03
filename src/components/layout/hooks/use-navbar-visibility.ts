import { useEffect, useState } from 'react';

// How long a visitor must linger at the very top of the home page, without
// scrolling, before the navbar reveals itself on its own.
const IDLE_REVEAL_DELAY_MS = 1000;

/**
 * Whether the navbar should be shown. On the home page it stays hidden until the
 * hero element (`heroId`) is scrolled roughly halfway out of view, then appears
 * and stays shown (it never hides again on scroll-up); on every other page it is
 * always visible. As a friendlier first impression, a visitor who lands at the
 * very top and lingers without scrolling for `IDLE_REVEAL_DELAY_MS` gets the
 * navbar revealed once; any scroll before then cancels that and leaves the
 * scroll-driven reveal in charge.
 */
export function useNavbarVisibility(isHome: boolean, heroId: string): boolean {
    const [visible, setVisible] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            setVisible(true);
            return;
        }
        const hero = document.getElementById(heroId);
        if (!hero) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                // Reveal once the hero is scrolled ~50% out, then leave the
                // navbar shown: it never hides again when scrolling back up.
                const entry = entries[0];
                if (entry && !entry.isIntersecting) setVisible(true);
            },
            // Shrink the root to the bottom half of the viewport so the hero
            // "leaves" (and the navbar appears) once it is scrolled ~50% out.
            { rootMargin: '-50% 0px 0px 0px' }
        );
        observer.observe(hero);

        // One-shot idle reveal, armed only when the page is actually at the top
        // on mount. Scrolling within the delay cancels the timer; once it fires
        // we drop the scroll listener and let the observer drive from then on.
        let idleRevealTimer: ReturnType<typeof setTimeout> | undefined;
        const cancelIdleReveal = () => {
            clearTimeout(idleRevealTimer);
            window.removeEventListener('scroll', cancelIdleReveal);
        };
        if (window.scrollY === 0) {
            idleRevealTimer = setTimeout(() => {
                setVisible(true);
                window.removeEventListener('scroll', cancelIdleReveal);
            }, IDLE_REVEAL_DELAY_MS);
            window.addEventListener('scroll', cancelIdleReveal, { passive: true });
        }

        return () => {
            observer.disconnect();
            cancelIdleReveal();
        };
    }, [isHome, heroId]);

    return visible;
}
