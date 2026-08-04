import type { FlowDiagramDefinition } from '@/components/articles/flow-diagram/types';
import dagre from '@dagrejs/dagre';

/** Fixed node box, so dagre can lay out before anything is measured in the DOM. */
export const NODE_WIDTH = 190;
export const NODE_HEIGHT = 72;

export interface LaidOutNode {
    id: string;
    x: number;
    y: number;
}

export interface FlowLayout {
    positions: Map<string, LaidOutNode>;
    width: number;
    height: number;
}

/**
 * Runs dagre over the union of every scenario's hops.
 *
 * Laying out the union rather than the active scenario is the whole point: a
 * node keeps its position when the reader switches scenarios, so the toggle
 * lights a different route through a picture that holds still. Laying out per
 * scenario would rearrange the diagram on every click and make the two states
 * impossible to compare.
 *
 * Positions are computed once per definition and cached by the caller — this is
 * synchronous work on the render path, and dagre is not cheap on a large graph.
 */
export function layoutFlowDiagram(definition: FlowDiagramDefinition): FlowLayout {
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({
        // Left-to-right reads as "a request travelling", which is what almost
        // every diagram in an article about a request path wants.
        rankdir: 'LR',
        nodesep: 40,
        ranksep: 90,
        marginx: 16,
        marginy: 16
    });
    graph.setDefaultEdgeLabel(() => ({}));

    for (const node of definition.nodes) {
        graph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
    }
    for (const edge of definition.edges) {
        graph.setEdge(edge.source, edge.target);
    }

    dagre.layout(graph);

    const positions = new Map<string, LaidOutNode>();
    for (const node of definition.nodes) {
        const laidOut = graph.node(node.id);
        if (!laidOut) continue;
        // dagre reports a centre; React Flow wants a top-left corner.
        positions.set(node.id, {
            id: node.id,
            x: laidOut.x - NODE_WIDTH / 2,
            y: laidOut.y - NODE_HEIGHT / 2
        });
    }

    const graphSize = graph.graph();
    return {
        positions,
        width: graphSize.width ?? 0,
        height: graphSize.height ?? 0
    };
}
