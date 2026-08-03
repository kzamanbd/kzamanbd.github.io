'use client';

import { useScrollSpy } from '@/components/layout/hooks/use-scroll-spy';
import type { TocItem } from '@/lib/markdown';
import { cn } from '@/utils/cn';
import { useMemo } from 'react';

/**
 * Sticky table of contents for the article body. Highlights the heading the
 * reader is currently under, reusing the same scroll-spy that drives the navbar
 * so both agree on what "current" means.
 */
export default function TableOfContents({ items }: { items: TocItem[] }) {
    // The spy re-subscribes whenever this array identity changes, so keep it
    // stable across the re-renders the spy itself causes.
    const ids = useMemo(() => items.map((item) => item.id), [items]);
    const activeId = useScrollSpy(ids);

    if (items.length === 0) return null;

    return (
        <nav aria-label="Table of contents" className="lg:sticky lg:top-24">
            <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                On this page
            </h2>
            <ul className="mt-4 space-y-1 text-sm">
                {items.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'pl-4' : undefined}>
                        <a
                            href={`#${item.id}`}
                            aria-current={activeId === item.id ? 'location' : undefined}
                            className={cn(
                                'focus-ring block rounded-sm py-1 transition-colors',
                                activeId === item.id
                                    ? 'text-foreground font-semibold'
                                    : 'text-foreground/60 hover:text-foreground'
                            )}>
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
