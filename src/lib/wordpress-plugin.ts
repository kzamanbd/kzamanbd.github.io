/**
 * Live plugin facts from the wordpress.org plugin API.
 *
 * The plugin page used to carry hardcoded numbers — 25,000+ downloads, a 4.8
 * rating from 487 reviews, 10,000+ active installs — none of which matched the
 * directory. Directory numbers are public and change on their own, so the only
 * way for a page to keep telling the truth about them is to read them at build
 * time rather than restate them.
 *
 * A failed fetch resolves to `null` and the caller hides the affected UI: a
 * network blip during a build should cost a stats row, not the whole page.
 */

/** How long a build's copy of the directory numbers stays fresh: one day. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export interface WordPressPluginInfo {
    slug: string;
    /** Current released version, e.g. `2.0.1`. */
    version: string;
    /** All-time downloads from the directory. */
    downloads: number;
    /**
     * Active installs, as the directory reports them. wordpress.org omits this
     * entirely below its reporting floor, so `null` means "too few to publish",
     * not "zero".
     */
    activeInstalls: number | null;
    /** Rating out of 5, or `null` when nobody has rated the plugin yet. */
    rating: number | null;
    ratingCount: number;
    /** Minimum WordPress version. */
    requiresWordPress: string | null;
    /** Minimum PHP version. */
    requiresPHP: string | null;
    /** Highest WordPress version the plugin is tested against. */
    testedUpTo: string | null;
    /** ISO date of the last release. */
    lastUpdated: string | null;
}

/** The subset of the API response this site reads. */
interface PluginApiResponse {
    version?: string;
    downloaded?: number;
    active_installs?: number;
    /** Percentage out of 100, which is not how anyone displays a rating. */
    rating?: number;
    num_ratings?: number;
    requires?: string | false;
    requires_php?: string | false;
    tested?: string | false;
    last_updated?: string;
}

/** The API returns `false` for an unset field rather than omitting it. */
function optionalString(value: string | false | undefined): string | null {
    return typeof value === 'string' && value.length > 0 ? value : null;
}

export async function getWordPressPluginInfo(slug: string): Promise<WordPressPluginInfo | null> {
    try {
        const response = await fetch(
            `https://api.wordpress.org/plugins/info/1.0/${encodeURIComponent(slug)}.json`,
            { next: { revalidate: REVALIDATE_SECONDS } }
        );

        if (!response.ok) return null;

        const data: PluginApiResponse = await response.json();
        if (!data.version) return null;

        const ratingCount = data.num_ratings ?? 0;

        return {
            slug,
            version: data.version,
            downloads: data.downloaded ?? 0,
            activeInstalls: data.active_installs ?? null,
            // The API reports the rating as a percentage; a 5-point scale is
            // what the directory itself shows and what readers expect.
            rating:
                ratingCount > 0 && data.rating ? Math.round((data.rating / 20) * 10) / 10 : null,
            ratingCount,
            requiresWordPress: optionalString(data.requires),
            requiresPHP: optionalString(data.requires_php),
            testedUpTo: optionalString(data.tested),
            lastUpdated: data.last_updated ?? null
        };
    } catch {
        return null;
    }
}
