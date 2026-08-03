import { JetBrains_Mono } from 'next/font/google';

/**
 * JetBrains Mono lives in its OWN module, apart from `fonts.ts`, so it ships
 * only on the routes that opt in by applying `jetBrainsMono.variable` (the
 * article pages and the terminal-path breadcrumb).
 *
 * next/font preloads every font co-instantiated in an imported module, and
 * `fonts.ts` is pulled into every route through the root layout (Noto Sans) and
 * the home hero (Zain). Keeping the monospace face out of that module is what
 * actually keeps it off the home page and every other route that does not ask
 * for it.
 */
export const jetBrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin']
});
