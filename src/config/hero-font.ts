import { Lato } from 'next/font/google';

/**
 * Lato lives in its OWN module, apart from `fonts.ts`, for the same reason
 * JetBrains Mono does: `fonts.ts` is pulled into every route through the root
 * layout, so a face declared there is preloaded site-wide even where nothing
 * applies its variable.
 *
 * Only the home hero applies `lato.variable`, and it is the one place that needs
 * the 900 weight — the headline treatment is built on it, and Zain (the other
 * display face) tops out at 700.
 *
 * `display: 'optional'` matches Zain's reasoning: the headline is the home
 * page's LCP element, so a slow connection keeps the matched fallback for that
 * paint rather than repainting late, and applies Lato on the next visit.
 */
export const lato = Lato({
    variable: '--font-lato',
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    display: 'optional'
});
