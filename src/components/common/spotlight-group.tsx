'use client';

import { useSpotlightSurfaces } from '@/components/common/hooks/use-spotlight-surfaces';
import { useRef, type ReactNode } from 'react';

/**
 * A plain `<div>` that lights whichever of its surfaces the cursor is over: the
 * non-list counterpart of SpotlightList, for groups whose children are not list
 * items. It holds the single delegated pointer listener for the whole group, so
 * the cards inside stay server-rendered.
 */
export default function SpotlightGroup({
    className,
    children
}: {
    className: string;
    children: ReactNode;
}) {
    const groupRef = useRef<HTMLDivElement>(null);
    useSpotlightSurfaces(groupRef);

    return (
        <div ref={groupRef} className={className}>
            {children}
        </div>
    );
}
