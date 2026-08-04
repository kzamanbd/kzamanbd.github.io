'use client';

import TocList from '@/components/articles/toc-list';
import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import { useScrollSpy } from '@/components/layout/hooks/use-scroll-spy';
import type { TocItem } from '@/lib/markdown';
import { cn } from '@/utils/cn';
import { ChevronDown, List } from 'lucide-react';
import { useMemo } from 'react';

/**
 * The phone counterpart of the sticky TOC aside, which has no column to live in
 * below `lg`. Collapsed by default so it costs one line above the article, and
 * it closes itself on selection: the disclosure would otherwise stay open over
 * the heading the reader just jumped to.
 *
 * The trigger keeps showing the current heading while collapsed, so the reader
 * still gets the "where am I" half of a table of contents without opening it.
 */
export default function MobileTableOfContents({ items }: { items: TocItem[] }) {
    const ids = useMemo(() => items.map((item) => item.id), [items]);
    const activeId = useScrollSpy(ids);
    const { open, toggle, close } = useDisclosure();

    if (items.length === 0) return null;

    const current = items.find((item) => item.id === activeId);

    return (
        <nav
            aria-label="Table of contents"
            className="border-foreground/10 bg-background/70 rounded-xl border backdrop-blur-sm lg:hidden">
            <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                className="focus-ring flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left">
                <List aria-hidden="true" className="text-foreground/50 size-4 shrink-0" />
                <span className="min-w-0 flex-1">
                    <span className="text-foreground/50 block text-[0.7rem] tracking-wide uppercase">
                        On this page
                    </span>
                    <span className="text-foreground block truncate text-sm font-medium">
                        {current?.text ?? 'Jump to a section'}
                    </span>
                </span>
                <ChevronDown
                    aria-hidden="true"
                    className={cn(
                        'text-foreground/50 size-4 shrink-0 transition-transform duration-200',
                        open && 'rotate-180'
                    )}
                />
            </button>

            {open && (
                <div className="border-foreground/10 max-h-72 overflow-y-auto border-t px-4 py-3">
                    <TocList items={items} activeId={activeId} onNavigate={close} />
                </div>
            )}
        </nav>
    );
}
