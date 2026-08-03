'use client';

import { spotlightSurfaceAttribute } from '@/components/common/spotlight-surface';
import { RefObject, useEffect } from 'react';

/**
 * Follows the pointer across a group of spotlit surfaces so CSS can draw a
 * highlight under the cursor. Takes a ref to the group container; one delegated
 * `pointermove` listener there covers every surface inside it, however many
 * there are, instead of one listener per card. On each frame it resolves the
 * surface under the pointer and writes the position, in that surface's own
 * coordinates, straight to its inline style:
 *
 *   --pointer-x / --pointer-y   the highlight's centre, consumed by the radial
 *                               gradient and the border mask in the surface's
 *                               own CSS module.
 *
 * Delegating keeps the surfaces themselves server components: only the thin
 * group wrapper is a client component.
 *
 * Opacity is deliberately not written here: each module fades its spotlight
 * layers in on :hover, so they need no pointerenter/leave bookkeeping. Reads are
 * throttled to one per animation frame and writes go straight to the DOM, so the
 * cursor path never re-renders React. No-ops on coarse / hoverless pointers and
 * for reduced-motion visitors, who keep the centred defaults from the module.
 */
export function useSpotlightSurfaces(groupRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const group = groupRef.current;
        if (!group) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let frame = 0;
        let surface: HTMLElement | null = null;
        let clientX = 0;
        let clientY = 0;

        const paint = () => {
            frame = 0;
            if (!surface) return;
            const rect = surface.getBoundingClientRect();
            surface.style.setProperty('--pointer-x', `${clientX - rect.left}px`);
            surface.style.setProperty('--pointer-y', `${clientY - rect.top}px`);
        };

        const onPointerMove = (event: PointerEvent) => {
            const target = event.target as Element | null;
            const hovered = target?.closest<HTMLElement>(`[${spotlightSurfaceAttribute}]`) ?? null;
            // Over the gaps between surfaces there is nothing to light; leave the
            // last one as it was, since its hover state is already gone.
            if (!hovered) return;
            surface = hovered;
            clientX = event.clientX;
            clientY = event.clientY;
            if (frame) return;
            frame = requestAnimationFrame(paint);
        };

        group.addEventListener('pointermove', onPointerMove);
        return () => {
            group.removeEventListener('pointermove', onPointerMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [groupRef]);
}
