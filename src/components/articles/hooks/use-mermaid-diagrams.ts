'use client';

import { mermaidConfig } from '@/components/articles/diagram/mermaid-theme';
import type { OpenDiagram } from '@/components/articles/diagram/types';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

/** Marks the button this hook injects, so the delegated click handler can find it. */
const EXPAND_BUTTON_CLASS = 'mermaid-expand-button';

/**
 * Renders every `<pre class="mermaid">` inside `containerRef` and wires an expand
 * control onto each one.
 *
 * The nodes belong to the markdown pipeline (the body arrives as an HTML string
 * through `dangerouslySetInnerHTML`), so React cannot render children into them:
 * the button is built with `document.createElement`, exactly as the code-block
 * copy buttons are. Building it on mount also means a reader with JavaScript off
 * never sees a control that would not work.
 *
 * A parse error is deliberately swallowed: the `<pre>` keeps its source, which
 * renders as legible diagram text rather than an error page. That means a broken
 * diagram fails quietly, so look at a new diagram in the browser rather than
 * assuming it worked.
 */
export function useMermaidDiagrams(
    containerRef: React.RefObject<HTMLElement | null>,
    onExpand: (diagram: OpenDiagram) => void
) {
    const { resolvedTheme } = useTheme();

    // Kept in a ref so a new callback identity from the parent's render never
    // re-runs the (expensive) mermaid pass.
    const onExpandRef = useRef(onExpand);
    onExpandRef.current = onExpand;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const blocks = container.querySelectorAll<HTMLElement>('pre.mermaid');
        if (blocks.length === 0) return;

        let cancelled = false;

        const render = async () => {
            const { default: mermaid } = await import('mermaid');
            if (cancelled) return;

            mermaid.initialize(mermaidConfig(resolvedTheme === 'dark'));

            for (const [index, block] of blocks.entries()) {
                // Stash the source on first pass; reuse it on every re-render,
                // since mermaid replaces the element's contents with SVG and a
                // second pass would otherwise have nothing left to parse.
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
                    addExpandButton(block);
                } catch {
                    // Leave the source visible; see the note above.
                    block.textContent = source;
                    delete block.dataset.mermaidRendered;
                }
            }
        };

        void render();

        // One delegated listener for every diagram in the article, rather than
        // one per injected button.
        const onClick = (event: MouseEvent) => {
            const target = event.target as Element | null;
            const button = target?.closest(`.${EXPAND_BUTTON_CLASS}`);
            if (!button) return;

            const block = button.closest<HTMLElement>('pre.mermaid');
            const svg = block?.querySelector('svg');
            if (!block || !svg) return;

            onExpandRef.current({
                html: svg.outerHTML,
                source: block.dataset.mermaidSource ?? ''
            });
        };

        container.addEventListener('click', onClick);
        return () => {
            cancelled = true;
            container.removeEventListener('click', onClick);
        };
    }, [containerRef, resolvedTheme]);
}

/** Adds the expand control to a rendered diagram, once. */
function addExpandButton(block: HTMLElement) {
    if (block.querySelector(`.${EXPAND_BUTTON_CLASS}`)) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = EXPAND_BUTTON_CLASS;
    button.setAttribute('aria-label', 'Expand diagram');
    button.title = 'Expand diagram';
    // Inline SVG rather than an icon component: this node is outside React's
    // tree, so there is nothing to render into it.
    button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>';

    block.append(button);
}
