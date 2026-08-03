import { useEffect, useState } from 'react';

/**
 * Tracks which section (by element id) the reader is currently in: the last
 * element whose top has scrolled past a line near the top of the viewport.
 * Returns null before the first section (e.g. over the hero) and when disabled.
 * The last section stays active once the page is scrolled to the bottom, so a
 * short final section still highlights. Pass a stable `sectionIds` reference to
 * avoid re-subscribing on every render.
 */
export function useScrollSpy(sectionIds: string[], enabled = true): string | null {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) {
            setActiveId(null);
            return;
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const sections = sectionIds
                .map((id) => document.getElementById(id))
                .filter((element): element is HTMLElement => element !== null);
            if (!sections.length) {
                setActiveId(null);
                return;
            }
            // The "current" line sits ~30% down the viewport, clear of the
            // floating navbar; a section is active from when its top crosses
            // that line until the next section's top does.
            const line = window.innerHeight * 0.3;
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            let current: string | null = null;
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= line) {
                    current = section.id;
                }
            }
            // Once scrolled to the very bottom keep the last section lit even if
            // its top never reaches the line (a short final section).
            const last = sections[sections.length - 1];
            if (atBottom && last) current = last.id;
            setActiveId(current);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [sectionIds, enabled]);

    return activeId;
}
