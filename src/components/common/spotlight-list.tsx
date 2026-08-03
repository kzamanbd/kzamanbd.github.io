'use client';

import { useSpotlightSurfaces } from '@/components/common/hooks/use-spotlight-surfaces';
import { useRef, type ReactNode } from 'react';

/**
 * A `<ul>` that lights whichever of its surfaces the cursor is over. It is the
 * only client component in the spotlight, holding the single delegated pointer
 * listener for the whole list, so the cards or tiles inside stay server-rendered
 * and their icon modules never reach the client bundle.
 *
 * Each surface inside must carry `spotlightSurfaceProps` and read --pointer-x /
 * --pointer-y in its own CSS module.
 */
export default function SpotlightList({
    className,
    children
}: {
    className: string;
    children: ReactNode;
}) {
    const listRef = useRef<HTMLUListElement>(null);
    useSpotlightSurfaces(listRef);

    return (
        <ul ref={listRef} className={className}>
            {children}
        </ul>
    );
}
