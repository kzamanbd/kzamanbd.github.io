'use client';

import FlowDiagram from '@/components/articles/flow-diagram/flow-diagram';
import { useFlowDiagramIslands } from '@/components/articles/flow-diagram/use-flow-diagram-islands';
import { createPortal } from 'react-dom';

/**
 * Mounts a real FlowDiagram into every ```flow fence in the article body.
 *
 * Rendered as a sibling of the body rather than inside it: the body is injected
 * with `dangerouslySetInnerHTML` and React must not own those nodes, so each
 * diagram is portalled into the `<pre>` the markdown renderer left behind.
 */
export default function FlowDiagrams({
    containerRef
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    const islands = useFlowDiagramIslands(containerRef);

    return (
        <>
            {islands.map(({ host, definition }, index) =>
                createPortal(<FlowDiagram definition={definition} />, host, `flow-${index}`)
            )}
        </>
    );
}
