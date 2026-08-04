'use client';

import FlowNode, { type FlowCanvasNode } from '@/components/articles/flow-diagram/flow-node';
import FlowPacketEdge, {
    type FlowCanvasEdge
} from '@/components/articles/flow-diagram/flow-packet-edge';
import {
    NODE_HEIGHT,
    NODE_WIDTH,
    layoutFlowDiagram
} from '@/components/articles/flow-diagram/layout';
import type { FlowDiagramDefinition, FlowScenario } from '@/components/articles/flow-diagram/types';
import { Background, ReactFlow, type NodeTypes, type EdgeTypes } from '@xyflow/react';
import { useMemo } from 'react';
// Imported here rather than in globals.css so React Flow's stylesheet travels in
// the same lazily-loaded chunk as the canvas: an article with no diagram, or a
// reader who never opens the interactive view, never downloads it.
import '@xyflow/react/dist/style.css';

// Registered outside the component: React Flow warns (and remounts every custom
// node) if these object identities change between renders.
const nodeTypes: NodeTypes = { flow: FlowNode };
const edgeTypes: EdgeTypes = { flow: FlowPacketEdge };

interface FlowCanvasProps {
    definition: FlowDiagramDefinition;
    scenario: FlowScenario;
    /** Index of the hop currently being stepped through, or -1 for none. */
    step: number;
    showPackets: boolean;
    onSelectStep: (step: number) => void;
}

/**
 * The interactive rendering: a laid-out, pannable graph with the active hop lit.
 *
 * The layout is memoised on the definition rather than the scenario, so the
 * boxes hold still across a scenario switch — see `layout.ts` for why that
 * matters. Only the `active` and `dimmed` flags differ between scenarios, which
 * makes a switch a re-style rather than a re-layout.
 */
export default function FlowCanvas({
    definition,
    scenario,
    step,
    showPackets,
    onSelectStep
}: FlowCanvasProps) {
    const layout = useMemo(() => layoutFlowDiagram(definition), [definition]);

    const routed = useMemo(() => new Set(scenario.edgeIds), [scenario]);
    const activeEdgeId = step >= 0 ? scenario.edgeIds[step] : undefined;
    const activeEdge = definition.edges.find((edge) => edge.id === activeEdgeId);

    const nodes = useMemo<FlowCanvasNode[]>(() => {
        // A node is on the route if any routed hop touches it.
        const onRoute = new Set<string>();
        for (const edge of definition.edges) {
            if (!routed.has(edge.id)) continue;
            onRoute.add(edge.source);
            onRoute.add(edge.target);
        }

        return definition.nodes.map((node) => {
            const position = layout.positions.get(node.id);
            return {
                id: node.id,
                type: 'flow' as const,
                position: { x: position?.x ?? 0, y: position?.y ?? 0 },
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                draggable: false,
                connectable: false,
                data: {
                    label: node.label,
                    detail: node.detail,
                    tone: node.tone,
                    active: activeEdge?.source === node.id || activeEdge?.target === node.id,
                    dimmed: onRoute.size > 0 && !onRoute.has(node.id)
                }
            };
        });
    }, [definition, layout, routed, activeEdge]);

    const edges = useMemo<FlowCanvasEdge[]>(() => {
        // A hop is a "return" when it runs against the layout's own direction:
        // dagre placed its target to the left of its source. Those are drawn out
        // of the bottom handles so they bow under the row instead of overlapping
        // the forward arrow and burying both labels.
        const isReturn = (source: string, target: string) => {
            const from = layout.positions.get(source);
            const to = layout.positions.get(target);
            return from !== undefined && to !== undefined && to.x < from.x;
        };

        return definition.edges.map((edge) => {
            const backwards = isReturn(edge.source, edge.target);
            return {
                id: edge.id,
                type: 'flow' as const,
                source: edge.source,
                target: edge.target,
                sourceHandle: backwards ? 'return-out' : 'out',
                targetHandle: backwards ? 'return-in' : 'in',
                data: {
                    label: edge.label,
                    tone: edge.tone,
                    active: edge.id === activeEdgeId,
                    dimmed: !routed.has(edge.id),
                    showPacket: showPackets
                }
            };
        });
    }, [definition, layout, routed, activeEdgeId, showPackets]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            // The diagram is a picture, not an editor: nothing here should be
            // draggable, connectable or deletable, and the canvas must not eat
            // the page's scroll as the reader passes over it.
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnScroll={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            onEdgeClick={(_, edge) => {
                const index = scenario.edgeIds.indexOf(edge.id);
                if (index !== -1) onSelectStep(index);
            }}>
            <Background gap={20} size={1} className="opacity-40" />
        </ReactFlow>
    );
}
