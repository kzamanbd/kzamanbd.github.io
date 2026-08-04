'use client';

import DiagramModal from '@/components/articles/diagram/diagram-modal';
import type { OpenDiagram } from '@/components/articles/diagram/types';
import { useMermaidDiagrams } from '@/components/articles/hooks/use-mermaid-diagrams';
import { useState } from 'react';

/**
 * Turns every `<pre class="mermaid">` the markdown renderer emitted into an SVG
 * diagram, re-rendering when the theme flips so the diagram's palette follows the
 * page, and gives each one an expand control that opens it in a pan-and-zoom
 * viewer.
 *
 * Mermaid is imported dynamically and only when a diagram is actually present, so
 * the (large) library never reaches the bundle of an article without one.
 *
 * The rendering itself lives in `useMermaidDiagrams`, which owns the DOM the
 * markdown pipeline injected; this component owns only the modal, which is real
 * React.
 */
export default function MermaidRenderer({
    containerRef
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    const [open, setOpen] = useState<OpenDiagram | null>(null);
    useMermaidDiagrams(containerRef, setOpen);

    if (!open) return null;

    return (
        <DiagramModal
            html={open.html}
            source={open.source}
            title={open.title}
            onClose={() => setOpen(null)}
        />
    );
}
