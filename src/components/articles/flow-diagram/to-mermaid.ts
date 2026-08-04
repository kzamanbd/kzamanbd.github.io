import type {
    FlowDiagramDefinition,
    FlowScenario,
    FlowTone
} from '@/components/articles/flow-diagram/types';

/**
 * Renders one scenario as mermaid source, for the static view.
 *
 * The static view exists so a diagram is readable before React Flow loads, in
 * print, and for a reader who never opens the interactive one — the heavy canvas
 * chunk is only fetched on request. Generating the mermaid from the same
 * definition the canvas uses means the two renderings can never disagree about
 * what the diagram says.
 *
 * Nodes outside the scenario's route are still drawn, greyed by omission of a
 * class, so switching scenarios does not make boxes appear and vanish.
 */
export function scenarioToMermaid(
    definition: FlowDiagramDefinition,
    scenario: FlowScenario
): string {
    const lines: string[] = ['flowchart LR'];
    const routed = new Set(scenario.edgeIds);

    // Node ids are already slugified, but mermaid also rejects a bare id that
    // collides with one of its keywords ("end", "graph"), so they are prefixed.
    const ref = (id: string) => `n_${id.replace(/-/g, '_')}`;

    for (const node of definition.nodes) {
        const label = node.detail
            ? `${escapeLabel(node.label)}<br/><small>${escapeLabel(node.detail)}</small>`
            : escapeLabel(node.label);
        lines.push(`    ${ref(node.id)}["${label}"]`);
    }

    for (const edge of definition.edges) {
        const onRoute = routed.has(edge.id);
        const arrow = onRoute ? '-->' : '-.->';
        const label = edge.label ? `|${escapeLabel(edge.label)}|` : '';
        lines.push(`    ${ref(edge.source)} ${arrow}${label} ${ref(edge.target)}`);
    }

    // Tone classes, applied only to nodes that declared one. `neutral` is the
    // default fill, so it needs no class of its own.
    const byTone = new Map<TintedTone, string[]>();
    for (const node of definition.nodes) {
        if (!node.tone || node.tone === 'neutral') continue;
        const list = byTone.get(node.tone) ?? [];
        list.push(ref(node.id));
        byTone.set(node.tone, list);
    }

    for (const [tone, ids] of byTone) {
        lines.push(`    classDef ${tone} ${MERMAID_TONE_STYLE[tone]}`);
        lines.push(`    class ${ids.join(',')} ${tone}`);
    }

    return lines.join('\n');
}

/**
 * Tone fills for the static view.
 *
 * Literals rather than custom properties for the same reason `mermaid-theme.ts`
 * uses them: mermaid inlines these into the generated SVG's own stylesheet,
 * where a `var(--…)` from this document would not resolve.
 */
type TintedTone = Exclude<FlowTone, 'neutral'>;

const MERMAID_TONE_STYLE: Record<TintedTone, string> = {
    secure: 'fill:#10b98126,stroke:#10b981,color:inherit',
    blocked: 'fill:#f43f5e26,stroke:#f43f5e,color:inherit',
    allowed: 'fill:#6366f126,stroke:#6366f1,color:inherit'
};

/** Keeps a label from closing the mermaid string it sits inside. */
function escapeLabel(text: string): string {
    return text.replace(/"/g, '&quot;').replace(/\|/g, '&#124;');
}
