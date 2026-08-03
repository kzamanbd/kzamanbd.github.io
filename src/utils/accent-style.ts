import type { CSSProperties } from 'react';

/**
 * Exposes an accent colour pair as the `--accent-from` / `--accent-to` custom
 * properties, so a component can be tinted with an article's own cover colours
 * (or any other pair) through utilities like
 * `bg-linear-to-r from-[var(--accent-from)]` instead of a hardcoded palette.
 */
export function accentStyle(colors: readonly [string, string]): CSSProperties {
    const [from, to] = colors;
    return { '--accent-from': from, '--accent-to': to } as CSSProperties;
}
