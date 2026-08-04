'use client';

import { studioItems } from '@/components/layout/navbar/contents';
import { useCloseOnClickOutside } from '@/components/layout/hooks/use-close-on-click-outside';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { useCloseOnRouteChange } from '@/components/layout/hooks/use-close-on-route-change';
import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import { cn } from '@/utils/cn';
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

/**
 * The development-only entry to the authoring tools.
 *
 * The editor routes are `.dev.tsx`, so in a production build they do not exist —
 * a link to them would 404. Rendering nothing when the list is empty means the
 * check lives in one place (`studioItems`) rather than being repeated at every
 * call site, and the menu simply disappears from the deployed bar.
 *
 * A dropdown rather than another top-level pill: these are tools for one person,
 * and they should not take space from the links every visitor uses.
 */
export default function StudioMenu() {
    const { open, toggle, close } = useDisclosure();
    // An <li>, because the desktop bar is a <ul> and this sits among the links.
    const containerRef = useRef<HTMLLIElement>(null);

    useCloseOnClickOutside(containerRef, open, close);
    useCloseOnEscape(open, close);
    useCloseOnRouteChange(close);

    if (studioItems.length === 0) return null;

    return (
        <li ref={containerRef} className="relative flex items-center">
            <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-haspopup="menu"
                aria-label="Studio"
                title="Studio"
                className={cn(
                    'focus-ring flex size-8 items-center justify-center rounded-full transition-colors',
                    open
                        ? 'bg-foreground/10 text-foreground'
                        : 'text-foreground/70 hover:text-foreground'
                )}>
                <PenLine aria-hidden="true" className="size-4" />
            </button>

            {open && (
                <ul
                    role="menu"
                    className="border-foreground/10 bg-background/90 absolute top-full right-0 mt-2 min-w-44 rounded-xl border p-1 shadow-lg backdrop-blur-lg">
                    {studioItems.map((item) => (
                        <li key={item.href} role="none">
                            <Link
                                role="menuitem"
                                href={item.href}
                                onClick={close}
                                className="focus-ring text-foreground/70 hover:text-foreground hover:bg-foreground/5 block rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}
