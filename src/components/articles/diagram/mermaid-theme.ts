import type { MermaidConfig } from 'mermaid';

/**
 * Mermaid's palette, pinned to the site's own.
 *
 * Mermaid's stock `default` and `dark` themes are built for a white or near-black
 * page; dropped onto this site's washed background they read as a screenshot from
 * somewhere else. `base` plus explicit variables is the only way to override the
 * palette — the named themes ignore `themeVariables`.
 *
 * The values are literals rather than `var(--foreground)` because mermaid inlines
 * them into the generated SVG's own `<style>` and also uses some of them to
 * compute derived shades, which it cannot do with an unresolved custom property.
 */

interface DiagramPalette {
    background: string;
    surface: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
    accentText: string;
}

const light: DiagramPalette = {
    background: 'transparent',
    surface: '#f4f5f9',
    border: '#c7cad6',
    text: '#1c1e26',
    muted: '#5b6070',
    accent: '#6366f1',
    accentText: '#ffffff'
};

const dark: DiagramPalette = {
    background: 'transparent',
    surface: '#1e212b',
    border: '#3b404f',
    text: '#e6e8ef',
    muted: '#9aa0b0',
    accent: '#818cf8',
    accentText: '#0f1117'
};

/** The mermaid init config for a resolved theme. */
export function mermaidConfig(isDark: boolean): MermaidConfig {
    const palette = isDark ? dark : light;

    return {
        startOnLoad: false,
        // `strict` keeps mermaid from honouring click handlers or raw HTML in a
        // diagram: article markdown is trusted, but the setting costs nothing.
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: 'var(--font-sans, ui-sans-serif), system-ui, sans-serif',
        themeVariables: {
            background: palette.background,
            primaryColor: palette.surface,
            primaryTextColor: palette.text,
            primaryBorderColor: palette.border,
            secondaryColor: palette.surface,
            tertiaryColor: palette.surface,
            lineColor: palette.muted,
            textColor: palette.text,
            mainBkg: palette.surface,
            nodeBorder: palette.border,
            clusterBkg: 'transparent',
            clusterBorder: palette.border,
            titleColor: palette.text,
            edgeLabelBackground: palette.surface,
            // Sequence diagrams carry their own variable set; without these the
            // actors keep mermaid's stock beige.
            actorBkg: palette.surface,
            actorBorder: palette.border,
            actorTextColor: palette.text,
            actorLineColor: palette.muted,
            signalColor: palette.text,
            signalTextColor: palette.text,
            labelBoxBkgColor: palette.accent,
            labelBoxBorderColor: palette.accent,
            labelTextColor: palette.accentText,
            loopTextColor: palette.text,
            noteBkgColor: palette.accent,
            noteTextColor: palette.accentText,
            noteBorderColor: palette.accent
        }
    };
}
