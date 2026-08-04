'use client';

import { toneStyle } from '@/components/articles/flow-diagram/tones';
import type { FlowTone } from '@/components/articles/flow-diagram/types';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    type Edge,
    type EdgeProps
} from '@xyflow/react';
import { useId } from 'react';

export type FlowEdgeData = {
    label?: string;
    tone?: FlowTone;
    /** True while this hop is the current step. */
    active: boolean;
    /** True when the hop is not part of the current scenario's route. */
    dimmed: boolean;
    /** Whether a packet should travel this hop while it is active. */
    showPacket: boolean;
};

export type FlowCanvasEdge = Edge<FlowEdgeData, 'flow'>;

/**
 * One arrow, with a dot that travels it while the hop is the current step.
 *
 * The packet is a SMIL `<animateMotion>` rather than a CSS or JS animation
 * because it has to follow the edge's actual curve — the same path string the
 * arrow is drawn from — and SMIL is the only way to do that without recomputing
 * point positions on every frame. The browser runs it off the main thread, so a
 * diagram with a dozen live hops still costs nothing in React.
 *
 * Reduced motion is honoured by the caller: `showPacket` arrives false, and the
 * hop still lights up, so the step is legible without anything moving.
 */
export default function FlowPacketEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
}: EdgeProps<FlowCanvasEdge>) {
    const [path, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 12
    });

    const tone = toneStyle(data?.tone);
    const active = data?.active ?? false;
    const dimmed = data?.dimmed ?? false;
    // The motion path needs its own id: React Flow's edge id can contain
    // characters that are not valid in an IRI reference.
    const pathId = useId().replace(/:/g, '');

    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                style={{
                    stroke: tone.line,
                    strokeWidth: active ? 2.5 : 1.5,
                    opacity: dimmed ? 0.25 : 1,
                    transition: 'stroke-width 200ms ease-out, opacity 300ms ease-out'
                }}
            />

            {active && data?.showPacket && (
                <>
                    {/* Hidden twin of the visible edge, purely as the motion path. */}
                    <path id={pathId} d={path} fill="none" stroke="none" />
                    <circle r={4} fill={tone.accent}>
                        <animateMotion dur="1.4s" repeatCount="indefinite">
                            <mpath href={`#${pathId}`} />
                        </animateMotion>
                    </circle>
                </>
            )}

            {data?.label && (
                <EdgeLabelRenderer>
                    <div
                        // `nodrag nopan` keeps a click on the label from starting
                        // a canvas pan, which would make the text unselectable.
                        className="nodrag nopan border-foreground/10 bg-background/85 text-foreground/70 pointer-events-auto absolute rounded-md border px-1.5 py-0.5 text-[0.68rem] backdrop-blur-sm"
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                            opacity: dimmed ? 0.3 : 1,
                            transition: 'opacity 300ms ease-out'
                        }}>
                        {data.label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}
