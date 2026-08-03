import { Noto_Sans, Zain } from 'next/font/google';

/**
 * Noto Sans is the site's body font, applied globally in the root layout. It is
 * a neutral, standard-proportioned sans, so type sizes read at conventional
 * portfolio scales rather than at the tall display proportions of Zain.
 */
export const notoSans = Noto_Sans({
    variable: '--font-noto-sans',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

/**
 * Zain is the display face, scoped to the home hero (the large name and title)
 * by applying `zain.variable` there, so it ships only on the home page.
 *
 * The hero name is the home page's LCP element, so Zain uses `display: 'optional'`:
 * on a fast connection it loads inside the ~100ms block window and paints as
 * Zain; on a slow connection the browser keeps the matched fallback for that
 * page rather than repainting late, so LCP registers at the fallback paint
 * instead of waiting on the font. It applies as Zain on the next visit, once
 * cached.
 */
export const zain = Zain({
    variable: '--font-zain-sans-serif',
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'optional'
});
