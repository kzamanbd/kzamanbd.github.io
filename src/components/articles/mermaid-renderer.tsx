'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

/**
 * Turns every `<pre class="mermaid">` the markdown renderer emitted into an SVG
 * diagram, re-rendering when the theme flips so the diagram's palette follows the
 * page.
 *
 * Mermaid is imported dynamically and only when a diagram is actually present, so
 * the (large) library never reaches the bundle of an article without one. The
 * original source is kept in a data attribute because mermaid replaces the
 * element's contents with SVG: without it a second render would have nothing left
 * to parse.
 *
 * A parse error is deliberately swallowed: the `<pre>` stays as it was, which
 * renders as legible diagram source rather than an error page. That means a
 * broken diagram fails quietly, so look at a new diagram in the browser rather
 * than assuming it worked.
 */
export default function MermaidRenderer({
    containerRef
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const blocks = container.querySelectorAll<HTMLElement>('pre.mermaid');
        if (blocks.length === 0) return;

        let cancelled = false;

        const render = async () => {
            const { default: mermaid } = await import('mermaid');
            if (cancelled) return;

            mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'strict',
                theme: resolvedTheme === 'dark' ? 'dark' : 'default'
            });

            for (const [index, block] of blocks.entries()) {
                // Stash the source on first pass; reuse it on every re-render.
                const source = block.dataset.mermaidSource ?? block.textContent ?? '';
                if (!source.trim()) continue;
                block.dataset.mermaidSource = source;

                try {
                    const { svg } = await mermaid.render(
                        `mermaid-diagram-${index}-${resolvedTheme}`,
                        source
                    );
                    if (cancelled) return;
                    block.innerHTML = svg;
                    block.dataset.mermaidRendered = 'true';
                } catch {
                    // Leave the source visible; see the note above.
                    block.textContent = source;
                    delete block.dataset.mermaidRendered;
                }
            }
        };

        void render();
        return () => {
            cancelled = true;
        };
    }, [containerRef, resolvedTheme]);

    return null;
}
