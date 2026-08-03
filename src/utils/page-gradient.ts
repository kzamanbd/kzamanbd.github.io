import { hashString } from '@/utils/article-cover';

// Low saturation keeps every derived colour close to a neutral grey; the wash is
// then mixed down to a very low strength in CSS, so it sits just barely off the
// light or dark background rather than reading as a colourful tint. Only the hue
// really varies per page, and two hues spaced apart give a gentle two-tone shift.
const SATURATION = 35;
const LIGHTNESS = 52;

/**
 * Deterministically derives a two-colour gradient for a page from its route, so
 * every non-home page gets its own wash and any route added later is assigned
 * one automatically, with no config to maintain. Hues come from a hash of the
 * route (reusing the article-cover hash), so distinct routes get distinct
 * colours and the same route always yields the same pair.
 */
export function pageGradientColors(seed: string): { from: string; to: string } {
    const hash = hashString(seed);
    const hueFrom = hash % 360;
    // Offset the second hue by 120 to 200 degrees, so the two colours read as a
    // gradient rather than as a single flat tint.
    const hueTo = (hueFrom + 120 + ((hash >>> 8) % 80)) % 360;

    return {
        from: `hsl(${hueFrom} ${SATURATION}% ${LIGHTNESS}%)`,
        to: `hsl(${hueTo} ${SATURATION}% ${LIGHTNESS}%)`
    };
}
