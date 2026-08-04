'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Keeps the highlighted entry of a scrollable table of contents visible.
 *
 * A long article's TOC overflows its own sticky box, so the entry the reader is
 * currently under can sit outside it and the highlight goes unseen. This nudges
 * the container — never the page — so following along never fights the reader's
 * own scrolling.
 *
 * Scrolls only when the entry is actually out of view, and only when the
 * container really overflows, so a short TOC never moves at all.
 */
export function useScrollActiveIntoView(
    containerRef: RefObject<HTMLElement | null>,
    activeId: string | null
) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !activeId) return;
        if (container.scrollHeight <= container.clientHeight) return;

        const active = container.querySelector<HTMLElement>(
            `[data-toc-id="${CSS.escape(activeId)}"]`
        );
        if (!active) return;

        const top = active.offsetTop - container.offsetTop;
        const bottom = top + active.offsetHeight;
        const viewTop = container.scrollTop;
        const viewBottom = viewTop + container.clientHeight;

        if (top >= viewTop && bottom <= viewBottom) return;

        container.scrollTo({
            top: top - container.clientHeight / 2 + active.offsetHeight / 2,
            behavior: 'smooth'
        });
    }, [containerRef, activeId]);
}
