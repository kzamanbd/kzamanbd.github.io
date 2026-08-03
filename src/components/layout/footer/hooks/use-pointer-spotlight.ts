import { RefObject, useEffect } from 'react';

// How far, in pixels, the glow reaches past the glyphs before it fully fades.
// The signature sits at the page edge, so it reaches farther above and to the
// sides than below.
const REACH_TOP = 72;
const REACH_SIDE = 56;
const REACH_BOTTOM = 28;
// Peak opacity of the binary reveal layer, reached when the pointer is over the
// glyphs; enough for the thin 0/1 digits to read clearly against the solid base.
const MAX_OPACITY = 0.6;

/**
 * Lights the footer signature as the pointer approaches it, not only when the
 * pointer is directly over the glyphs. A window-level `pointermove` listener
 * (throttled to one read per animation frame) measures the pointer against
 * `targetRef` (the glyph layer) and writes three custom properties to it:
 *
 *   --pointer-x / --pointer-y  the spotlight circle's centre, in the glyph
 *                              box's own coordinates, so the mask stays aligned
 *                              even when the pointer sits outside the letters.
 *   --spotlight-opacity        how lit the reveal layer is: full over the
 *                              glyphs, fading to zero across a proximity margin
 *                              (REACH_*) that stretches farther above and to the
 *                              sides than below.
 *
 * Driving opacity from measured proximity, rather than the element's own
 * `:hover` box, is what lets the glow wake before the pointer reaches the
 * letters, and keeps the signature's own size and position untouched. Writes go
 * straight to the DOM, so the cursor path never re-renders React. No-ops on
 * coarse / hoverless pointers, so touch devices never attach a listener.
 */
export function usePointerSpotlight(targetRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        let frame = 0;
        let clientX = 0;
        let clientY = 0;

        const paint = () => {
            frame = 0;
            const rect = target.getBoundingClientRect();

            // How far the pointer sits outside the glyph box on each axis, each
            // normalised by that side's reach, then combined into one radial
            // falloff: 0 while over the glyphs, 1 at the edge of reach, beyond 1
            // once out of range.
            const outsideX = Math.max(rect.left - clientX, 0, clientX - rect.right) / REACH_SIDE;
            const outsideY =
                clientY < rect.top
                    ? (rect.top - clientY) / REACH_TOP
                    : Math.max(clientY - rect.bottom, 0) / REACH_BOTTOM;
            const distance = Math.hypot(outsideX, outsideY);
            const opacity = Math.max(0, 1 - distance) * MAX_OPACITY;

            target.style.setProperty('--pointer-x', `${clientX - rect.left}px`);
            target.style.setProperty('--pointer-y', `${clientY - rect.top}px`);
            target.style.setProperty('--spotlight-opacity', `${opacity}`);
        };

        const onPointerMove = (event: PointerEvent) => {
            clientX = event.clientX;
            clientY = event.clientY;
            if (frame) return;
            frame = requestAnimationFrame(paint);
        };

        window.addEventListener('pointermove', onPointerMove);
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [targetRef]);
}
