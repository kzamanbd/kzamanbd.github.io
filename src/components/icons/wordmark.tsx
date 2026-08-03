import { cn } from '@/utils/cn';

// The wordmark geometry, shared by this icon and by the footer's BinaryReveal
// (which uses the same path as a letterform mask), so the two stay in lockstep
// and the path is defined once.
//
// A real glyph outline rather than an SVG <text> element: the solid layer is
// rendered by the DOM and the mask by an SVG-as-image, two engines that resolve
// fonts independently, so text would let a font substitution size them
// differently and drift the digits out of the letters. Generated once from
// Arial Narrow Bold with opentype.js and committed, so nothing at build or run
// time depends on a font being installed.
//
// The condensed face is deliberate: the wordmark spans the footer's full width,
// so its aspect ratio alone decides how tall the signature renders. Eleven wide
// capitals set in regular Arial Bold came out at 10.7:1 and read as a thin
// strip; condensed brings it to 8.8:1, roughly a fifth taller at the same width.
export const SIGNATURE_VIEW_BOX = '0 0 724.407 82.601';
export const SIGNATURE_PATH_D =
    'M13.41 81.22L0 81.22L0 0L13.41 0L13.41 36.07L40.61 0L58.72 0L33.63 31.63L60.05 81.22L42.66 81.22L24.32 43.10L13.41 56.67L13.41 81.22M100.38 0L127.03 81.22L112.41 81.22L106.59 62.77L80 62.77L74.51 81.22L60.22 81.22L86.15 0L100.38 0M84.10 49.08L102.27 49.08L93.13 18.95L84.10 49.08M146.48 81.22L133.96 81.22L133.96 0L154.07 0L166.14 55.40L178.11 0L198.28 0L198.28 81.22L185.81 81.22L185.81 17.28L172.57 81.22L159.61 81.22L146.48 17.28L146.48 81.22M225.09 81.22L211.68 81.22L211.68 0L239.99 0Q250.85 0 255.50 2.19Q260.16 4.38 263.15 9.78Q266.14 15.18 266.14 22.71Q266.14 32.24 261.57 38.06Q257 43.88 248.58 45.37Q252.90 48.47 255.73 52.16Q258.55 55.84 263.43 65.37L271.51 81.22L255.50 81.22L245.75 63.54Q240.49 53.96 238.61 51.55Q236.72 49.14 234.62 48.23Q232.51 47.31 227.86 47.31L225.09 47.31L225.09 81.22M225.09 13.74L225.09 34.35L235.06 34.35Q244.20 34.35 246.70 33.54Q249.19 32.74 250.74 30.30Q252.29 27.87 252.29 23.82Q252.29 19.94 250.74 17.59Q249.19 15.23 246.53 14.35Q244.65 13.74 235.62 13.74L225.09 13.74M278.66 43.32L278.66 0L292.07 0L292.07 43.99Q292.07 54.24 292.57 57.34Q293.45 62.71 296.80 65.65Q300.16 68.58 305.64 68.58Q310.29 68.58 313.23 66.51Q316.17 64.43 317.25 60.75Q318.33 57.06 318.33 44.93L318.33 0L331.79 0L331.79 42.66Q331.79 59 330.04 66.29Q328.30 73.57 322.18 78.09Q316.06 82.60 306.03 82.60Q295.61 82.60 289.77 78.86Q283.92 75.12 281.29 68.34Q278.66 61.55 278.66 43.32M394.28 81.22L340.15 81.22L340.15 66.42L375.17 13.74L344.09 13.74L344.09 0L392.84 0L392.84 12.74L356.39 67.53L394.28 67.53L394.28 81.22M451.12 81.22L396.99 81.22L396.99 66.42L432.01 13.74L400.93 13.74L400.93 0L449.68 0L449.68 12.74L413.23 67.53L451.12 67.53L451.12 81.22M493 0L519.65 81.22L505.02 81.22L499.21 62.77L472.62 62.77L467.13 81.22L452.84 81.22L478.76 0L493 0M476.71 49.08L494.89 49.08L485.74 18.95L476.71 49.08M539.09 81.22L526.57 81.22L526.57 0L546.68 0L558.76 55.40L570.73 0L590.89 0L590.89 81.22L578.43 81.22L578.43 17.28L565.19 81.22L552.22 81.22L539.09 17.28L539.09 81.22M637.65 0L664.30 81.22L649.67 81.22L643.86 62.77L617.26 62.77L611.78 81.22L597.49 81.22L623.41 0L637.65 0M621.36 49.08L639.53 49.08L630.39 18.95L621.36 49.08M684.08 81.22L671.56 81.22L671.56 0L684.63 0L711.89 54.24L711.89 0L724.41 0L724.41 81.22L710.89 81.22L684.08 28.25';

/** The solid wordmark, inheriting its colour from the current text colour. */
export default function Wordmark({ className, ...rest }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox={SIGNATURE_VIEW_BOX}
            xmlns="http://www.w3.org/2000/svg"
            className={cn('block w-full', className)}
            {...rest}>
            <path d={SIGNATURE_PATH_D} fill="currentColor" />
        </svg>
    );
}
