import { cn } from '@/utils/cn';

/**
 * The lit edge of a surface's cursor spotlight: a hairline ring that the
 * caller's CSS module tints and masks to a soft circle at the pointer, so only
 * the stretch of border nearest the cursor brightens. It needs a real element
 * rather than a pseudo-element because the spotlit surfaces already spend
 * `::before` on their ambient accent bloom and `::after` on the inner glow.
 *
 * `-inset-px` (not `inset-0`) puts the ring on the surface's border rather than
 * a pixel inside it, since an absolutely positioned child is placed against the
 * padding box. The radius is inherited rather than restated, so the ring tracks
 * the surface if its rounding ever changes.
 *
 * `className` carries the caller's module class: the tint and the pointer mask.
 */
export default function SpotlightBorder({ className }: { className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute -inset-px rounded-[inherit] border',
                className
            )}
        />
    );
}
