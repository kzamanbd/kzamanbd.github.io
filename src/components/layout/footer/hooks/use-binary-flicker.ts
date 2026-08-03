import { FIELD_CHARACTERS } from '@/components/layout/footer/binary-field';
import { RefObject, useEffect } from 'react';

// How often to flip digits, and how many to flip each tick. A slow cadence and
// a light touch keep the field quietly alive rather than noisy.
const FLICKER_INTERVAL_MS = 420;
const FLIPS_PER_TICK = 6;

/**
 * Keeps the binary field quietly alive: on a slow interval it flips a few random
 * digits in `gridRef`'s text and rewrites the node in place, so the 0s and 1s
 * shift like live data. It only does work while the reveal is actually showing,
 * gauged by the `--spotlight-opacity` that usePointerSpotlight writes to
 * `revealRef`, so an unhovered footer costs nothing but the idle timer. No-ops
 * under prefers-reduced-motion and on coarse / hoverless pointers, matching the
 * spotlight itself, and mutates the DOM directly so React never re-renders.
 */
export function useBinaryFlicker(
    gridRef: RefObject<HTMLElement | null>,
    revealRef: RefObject<HTMLElement | null>
) {
    useEffect(() => {
        const grid = gridRef.current;
        const reveal = revealRef.current;
        if (!grid || !reveal) return;
        if (
            !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        // Work on a mutable character array seeded from the server-rendered text,
        // so the first paint the visitor sees is exactly the hydrated grid.
        const digits = Array.from(grid.textContent ?? '');
        if (digits.length === 0) return;

        const tick = () => {
            const opacity = parseFloat(reveal.style.getPropertyValue('--spotlight-opacity'));
            if (!(opacity > 0.01)) return;

            for (let flip = 0; flip < FLIPS_PER_TICK; flip++) {
                const index = Math.floor(Math.random() * digits.length);
                const current = digits[index];
                // Leave row separators (newlines) alone so the grid stays aligned.
                if (!current || !FIELD_CHARACTERS.includes(current)) continue;
                // Swap to a different character so the flip is always visible
                // (skips when the alphabet has only one entry).
                const alternatives = FIELD_CHARACTERS.filter((character) => character !== current);
                const replacement = alternatives[Math.floor(Math.random() * alternatives.length)];
                if (!replacement) continue;
                digits[index] = replacement;
            }
            grid.textContent = digits.join('');
        };

        const timer = window.setInterval(tick, FLICKER_INTERVAL_MS);
        return () => window.clearInterval(timer);
    }, [gridRef, revealRef]);
}
