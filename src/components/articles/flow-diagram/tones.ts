import type { FlowTone } from '@/components/articles/flow-diagram/types';

/**
 * The four diagram tones as CSS values.
 *
 * Kept as custom-property references rather than hex literals so a diagram
 * re-tints with the theme instead of staying lit for a light page after the
 * reader switches to dark. The mermaid theme cannot do this (mermaid inlines the
 * values into the SVG and derives shades from them), which is why that file
 * carries literals and this one does not.
 */
export interface ToneStyle {
    /** Border and arrow colour. */
    line: string;
    /** Node fill, mixed against the page so it works on either theme. */
    fill: string;
    /** The travelling packet and the lit-edge glow. */
    accent: string;
}

export const flowTones: Record<FlowTone, ToneStyle> = {
    neutral: {
        line: 'color-mix(in oklab, var(--foreground) 30%, transparent)',
        fill: 'color-mix(in oklab, var(--foreground) 5%, var(--background))',
        accent: 'color-mix(in oklab, var(--foreground) 55%, transparent)'
    },
    secure: {
        line: 'var(--color-emerald-500)',
        fill: 'color-mix(in oklab, var(--color-emerald-500) 10%, var(--background))',
        accent: 'var(--color-emerald-500)'
    },
    blocked: {
        line: 'var(--color-rose-500)',
        fill: 'color-mix(in oklab, var(--color-rose-500) 10%, var(--background))',
        accent: 'var(--color-rose-500)'
    },
    allowed: {
        line: 'var(--color-indigo-500)',
        fill: 'color-mix(in oklab, var(--color-indigo-500) 10%, var(--background))',
        accent: 'var(--color-indigo-500)'
    }
};

export function toneStyle(tone: FlowTone = 'neutral'): ToneStyle {
    return flowTones[tone];
}
