'use client';

import { toneStyle } from '@/components/articles/flow-diagram/tones';
import type { FlowTone } from '@/components/articles/flow-diagram/types';
import { cn } from '@/utils/cn';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';

export type FlowNodeData = {
    label: string;
    detail?: string;
    tone?: FlowTone;
    /** True while this node is an endpoint of the hop being stepped through. */
    active: boolean;
    /** True when the node is not on the current scenario's route. */
    dimmed: boolean;
};

export type FlowCanvasNode = Node<FlowNodeData, 'flow'>;

/**
 * One box on the canvas.
 *
 * Nodes off the current route are dimmed rather than removed, so switching
 * scenarios lights a different path through a picture that stays put — the
 * reader can compare the two states instead of re-reading a new diagram.
 *
 * There are two pairs of handles. The left/right pair carries the forward path.
 * The bottom pair carries return hops — a response travelling back the way the
 * request came — which would otherwise be drawn straight through the forward
 * arrow, burying both labels. Routing them out of the bottom bows them under the
 * row instead, so a request and its response read as two distinct legs.
 *
 * All four are invisible: React Flow needs them to anchor an edge, and visible
 * ports would add four dots of noise per box to a diagram whose whole job is to
 * be glanceable.
 */
export default function FlowNode({ data }: NodeProps<FlowCanvasNode>) {
    const tone = toneStyle(data.tone);

    return (
        <div
            className={cn(
                'flex h-full w-full flex-col justify-center rounded-xl border px-3 py-2 text-center transition-opacity duration-300',
                data.dimmed && 'opacity-35'
            )}
            style={{
                borderColor: tone.line,
                background: tone.fill,
                // The lit ring marks the current step. Applied as a shadow rather
                // than a border so the box does not change size as it activates.
                boxShadow: data.active ? `0 0 0 2px ${tone.accent}` : undefined
            }}>
            <Handle id="in" type="target" position={Position.Left} className="!opacity-0" />
            <Handle
                id="return-in"
                type="target"
                position={Position.Bottom}
                className="!opacity-0"
            />

            <p className="text-foreground truncate text-sm font-semibold">{data.label}</p>
            {data.detail && <p className="text-foreground/60 truncate text-xs">{data.detail}</p>}

            <Handle id="out" type="source" position={Position.Right} className="!opacity-0" />
            <Handle
                id="return-out"
                type="source"
                position={Position.Bottom}
                className="!opacity-0"
            />
        </div>
    );
}
