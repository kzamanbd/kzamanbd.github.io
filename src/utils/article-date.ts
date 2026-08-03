// The single place a `YYYY-MM-DD` frontmatter date turns into a `Date`. Parsing
// is fixed to UTC: a bare `YYYY-MM-DDT00:00:00` is local midnight by spec, so
// serialising it with `toISOString`/`toUTCString` would shift every feed and
// sitemap stamp by the build machine's offset (a UTC+6 build publishing Aug 1 as
// Jul 31). Anchoring to UTC makes the emitted timestamp equal the authored date
// on every host. Display formatting must pin `timeZone: 'UTC'` to match; see
// `formatArticleDate`.

/**
 * A frontmatter date value as `YYYY-MM-DD`. An unquoted YAML date
 * (`date: 2026-08-01`) reaches us as a real `Date` from gray-matter rather than
 * a string, so coerce that back rather than letting it through a `string` field.
 */
export function toDateString(value: unknown): string {
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return value == null ? '' : String(value);
}

/** Parse an article date as UTC midnight, or null when missing or malformed. */
export function parseArticleDate(value: string): Date | null {
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Parse an article date that has already been validated at load time. Throws
 * rather than returning an Invalid Date, so a malformed value surfaces here
 * instead of deep inside XML or JSON serialisation. Prefer `parseArticleDate`
 * where a miss is expected.
 */
export function requireArticleDate(value: string): Date {
    const parsed = parseArticleDate(value);
    if (!parsed) {
        throw new RangeError(
            `Expected a YYYY-MM-DD article date, received ${JSON.stringify(value)}.`
        );
    }
    return parsed;
}
