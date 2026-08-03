import { useEffect, useState } from 'react';

/**
 * Whether the hero (`heroId`) has scrolled roughly halfway out of view on the
 * home page. Unlike `useNavbarVisibility` this toggles both ways (it flips back
 * to false when the hero returns to the top) and never idle-reveals. Off the
 * home page there is no hero, so it reports true. Gates the navbar wordmark so
 * the name is never on screen twice at once.
 */
export function useHeroPassed(isHome: boolean, heroId: string): boolean {
    const [passed, setPassed] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            setPassed(true);
            return;
        }
        const hero = document.getElementById(heroId);
        if (!hero) {
            setPassed(true);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) setPassed(!entry.isIntersecting);
            },
            { rootMargin: '-50% 0px 0px 0px' }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, [isHome, heroId]);

    return passed;
}
