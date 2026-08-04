'use client';

import TocList from '@/components/articles/toc-list';
import { useScrollActiveIntoView } from '@/components/articles/hooks/use-scroll-active-into-view';
import { useScrollSpy } from '@/components/layout/hooks/use-scroll-spy';
import type { TocItem } from '@/lib/markdown';
import { useMemo, useRef } from 'react';

/**
 * Sticky table of contents for the article body. Highlights the heading the
 * reader is currently under, reusing the same scroll-spy that drives the navbar
 * so both agree on what "current" means.
 *
 * Hidden below `lg`, where MobileTableOfContents takes over: there is no column
 * for an aside on a phone, and a sticky list would eat the reading width.
 */
export default function TableOfContents({ items }: { items: TocItem[] }) {
    // The spy re-subscribes whenever this array identity changes, so keep it
    // stable across the re-renders the spy itself causes.
    const ids = useMemo(() => items.map((item) => item.id), [items]);
    const activeId = useScrollSpy(ids);
    const listRef = useRef<HTMLDivElement>(null);
    useScrollActiveIntoView(listRef, activeId);

    if (items.length === 0) return null;

    return (
        <nav aria-label="Table of contents" className="hidden lg:sticky lg:top-24 lg:block">
            <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                On this page
            </h2>
            {/* Capped so a long article's TOC scrolls inside the sticky box
                instead of running off the bottom of the viewport. */}
            <div ref={listRef} className="mt-4 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1">
                <TocList items={items} activeId={activeId} />
            </div>
        </nav>
    );
}
