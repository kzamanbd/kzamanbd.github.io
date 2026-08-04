'use client';

import type { FlowDiagramDefinition, FlowScenario } from '@/components/articles/flow-diagram/types';

/**
 * The prose under the canvas: what the current hop is doing, or the scenario's
 * own summary before the walk has started.
 *
 * A live region, so a reader on a screen reader hears each step as playback
 * advances instead of watching a picture change silently. `polite` rather than
 * `assertive`: the walk is ambient, and interrupting whatever is being read to
 * announce a hop would be worse than waiting for a pause.
 *
 * The box holds its height whether or not there is text, so the diagram does not
 * jump as the caption appears and disappears.
 */
export default function FlowCaption({
    definition,
    scenario,
    step
}: {
    definition: FlowDiagramDefinition;
    scenario: FlowScenario;
    step: number;
}) {
    const edgeId = step >= 0 ? scenario.edgeIds[step] : undefined;
    const edge = definition.edges.find((item) => item.id === edgeId);

    let text = scenario.summary;
    if (edge) {
        const source = definition.nodes.find((node) => node.id === edge.source);
        const target = definition.nodes.find((node) => node.id === edge.target);
        text =
            edge.caption ??
            target?.description ??
            `${source?.label ?? edge.source} → ${target?.label ?? edge.target}`;
    }

    return (
        <p
            aria-live="polite"
            className="text-foreground/70 border-foreground/10 min-h-[2.75rem] border-t px-4 py-3 text-sm leading-relaxed">
            {text ?? <span className="text-foreground/40">Press play to walk the path.</span>}
        </p>
    );
}
