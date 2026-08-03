// Deterministic cover art for articles that do not ship their own image.
//
// The reference this was ported from generates an SVG file per article with a
// build script and rasterises it with resvg. This app renders server-side, so it
// needs neither: the card paints the gradient in CSS (see ArticleCover) and the
// OpenGraph PNG is produced on demand by `next/og` from the same colour pair.
// One hash, one palette, so the card and the social image always agree.

/**
 * Diagonal gradient [from, to] pairs, picked deterministically per article. Each
 * pair blends two adjacent hues (rather than a light/dark shade of one) so the
 * transition reads as a real gradient instead of a flat fill.
 */
const COVER_GRADIENTS: ReadonlyArray<readonly [string, string]> = [
    ['#4f46e5', '#7c3aed'], // indigo -> violet
    ['#0d9488', '#0891b2'], // teal -> cyan
    ['#2563eb', '#4f46e5'], // blue -> indigo
    ['#db2777', '#9333ea'], // pink -> purple
    ['#0284c7', '#2563eb'], // sky -> blue
    ['#059669', '#0d9488'], // emerald -> teal
    ['#dc2626', '#db2777'], // red -> pink
    ['#7c3aed', '#c026d3'], // violet -> fuchsia
    ['#d97706', '#dc2626'], // amber -> red
    ['#0891b2', '#2563eb'], // cyan -> blue
    ['#e11d48', '#db2777'], // rose -> pink
    ['#c026d3', '#9333ea'], // fuchsia -> purple
    ['#9333ea', '#4f46e5'], // purple -> indigo
    ['#65a30d', '#16a34a'], // lime -> green
    ['#16a34a', '#059669'], // green -> emerald
    ['#ea580c', '#d97706'], // orange -> amber
    ['#0284c7', '#0891b2'], // sky -> cyan
    ['#4f46e5', '#2563eb'], // indigo -> blue
    ['#e11d48', '#dc2626'], // rose -> red
    ['#6366f1', '#8b5cf6'] // indigo -> violet (soft)
];

/** Deterministic, stable string hash (djb2). Same input, same output. */
export function hashString(seed: string): number {
    let hash = 5381;
    for (let index = 0; index < seed.length; index++) {
        hash = (hash * 33) ^ seed.charCodeAt(index);
    }
    // Coerce to an unsigned 32-bit integer.
    return hash >>> 0;
}

/**
 * The [from, to] gradient pair for a slug. Falls back to the first pair only if
 * the table were ever emptied; the modulo already guarantees a hit.
 */
export function coverGradientForSlug(slug: string): readonly [string, string] {
    const index = hashString(slug) % COVER_GRADIENTS.length;
    return COVER_GRADIENTS[index] ?? ['#4f46e5', '#7c3aed'];
}
