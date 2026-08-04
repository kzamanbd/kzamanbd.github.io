import {
    FLOW_TONES,
    type FlowDiagramDefinition,
    type FlowEdgeSpec,
    type FlowNodeSpec,
    type FlowScenario,
    type FlowTone,
    type FlowView
} from '@/components/articles/flow-diagram/types';

// Parser for the ```flow fence: a deliberately small, mermaid-like line format.
// Pure and dependency-free (no DOM, no node built-ins), so it runs during the
// server render of an article and in the browser alike.
//
// The grammar, in full:
//
//   title: How a request reaches the origin      the diagram's accessible name
//   view: interactive                            `static` (default) or `interactive`
//   packets: off                                 disables the travelling dots
//   # a comment
//   scenario "Cache warm"                        opens a scenario; hops below join it
//   Browser [the reader's tab] {neutral}         declares a node
//   Browser --> Edge (TLS) {secure}              declares a hop
//   > prose                                      attaches to whatever preceded it
//
// Nodes are shared across every scenario (a node mentioned anywhere is drawn
// everywhere), which is what keeps the picture still when the reader toggles.
// Scenarios differ only in which hops they route through.

/** Every rejection carries the offending line, so a typo fails loudly. */
export class FlowDiagramParseError extends Error {
    constructor(message: string, lineNumber: number, line: string) {
        super(`line ${lineNumber}: ${message}\n  ${line.trim()}`);
        this.name = 'FlowDiagramParseError';
    }
}

/** A stable id for a declared name: `ISP DNS` becomes `isp-dns`. */
export function slugify(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** `Name [detail] {tone}`, both bracketed parts optional. */
const NODE_PATTERN = /^(.*?)\s*(?:\[([^\]]*)\])?\s*(?:\{([^}]*)\})?\s*$/;
/** The right-hand side of an arrow: `Target (label) {tone}`. */
const TARGET_PATTERN = /^(.*?)\s*(?:\(([^)]*)\))?\s*(?:\{([^}]*)\})?\s*$/;
const SCENARIO_PATTERN = /^scenario\s+"([^"]+)"\s*$/i;
const ARROW = '-->';

function readTone(raw: string | undefined, lineNumber: number, line: string): FlowTone | undefined {
    if (raw === undefined) return undefined;
    const tone = raw.trim();
    if (!FLOW_TONES.includes(tone as FlowTone)) {
        throw new FlowDiagramParseError(
            `unknown tone "${tone}", expected one of ${FLOW_TONES.join(', ')}`,
            lineNumber,
            line
        );
    }
    return tone as FlowTone;
}

/** Where a following `>` prose line should be attached. */
type ProseTarget =
    | { kind: 'scenario'; id: string }
    | { kind: 'node'; id: string }
    | { kind: 'edge'; id: string }
    | null;

/**
 * Parses ```flow fence source into a diagram definition.
 *
 * Throws a `FlowDiagramParseError` naming the line for anything malformed: a
 * diagram with a typo should fail visibly rather than quietly render with an
 * arrow missing.
 */
export function parseFlowDiagram(source: string): FlowDiagramDefinition {
    const nodes = new Map<string, FlowNodeSpec>();
    const edges = new Map<string, FlowEdgeSpec>();
    const scenarios: FlowScenario[] = [];

    let title: string | undefined;
    let defaultView: FlowView = 'static';
    let showPackets = true;
    let currentScenario: FlowScenario | null = null;
    let proseTarget: ProseTarget = null;

    /** Registers a node on first mention; later mentions only fill in blanks. */
    const upsertNode = (spec: FlowNodeSpec): FlowNodeSpec => {
        const existing = nodes.get(spec.id);
        if (!existing) {
            nodes.set(spec.id, spec);
            return spec;
        }
        existing.detail ??= spec.detail;
        existing.tone ??= spec.tone;
        return existing;
    };

    const lines = source.split('\n');

    for (const [index, rawLine] of lines.entries()) {
        const lineNumber = index + 1;
        const line = rawLine.trim();

        if (!line || line.startsWith('#')) continue;

        // Prose: attaches to the scenario, node or hop declared just above.
        if (line.startsWith('>')) {
            const text = line.slice(1).trim();
            // Bound to a local so the narrowing survives into the closure below;
            // `proseTarget` is reassigned each iteration, so TypeScript widens it
            // back to include null inside a callback.
            const target = proseTarget;
            if (!target) {
                throw new FlowDiagramParseError(
                    'prose line has nothing above it to describe',
                    lineNumber,
                    rawLine
                );
            }
            if (target.kind === 'scenario') {
                const scenario = scenarios.find((item) => item.id === target.id);
                if (scenario) scenario.summary = text;
            } else if (target.kind === 'node') {
                const node = nodes.get(target.id);
                if (node) node.description = text;
            } else {
                const edge = edges.get(target.id);
                if (edge) edge.caption = text;
            }
            continue;
        }

        const scenarioMatch = SCENARIO_PATTERN.exec(line);
        if (scenarioMatch) {
            const label = scenarioMatch[1] as string;
            const scenario: FlowScenario = { id: slugify(label), label, edgeIds: [] };
            scenarios.push(scenario);
            currentScenario = scenario;
            proseTarget = { kind: 'scenario', id: scenario.id };
            continue;
        }

        // Header directives. Checked before the arrow so a title containing
        // "-->" is still read as a title.
        const directive = /^(title|view|packets)\s*:\s*(.+)$/i.exec(line);
        if (directive) {
            const key = (directive[1] as string).toLowerCase();
            const value = (directive[2] as string).trim();

            if (key === 'title') {
                title = value;
            } else if (key === 'view') {
                if (value !== 'static' && value !== 'interactive') {
                    throw new FlowDiagramParseError(
                        `unknown view "${value}", expected static or interactive`,
                        lineNumber,
                        rawLine
                    );
                }
                defaultView = value;
            } else {
                showPackets = !/^(off|false|no)$/i.test(value);
            }
            proseTarget = null;
            continue;
        }

        // A hop.
        const arrowAt = line.indexOf(ARROW);
        if (arrowAt !== -1) {
            const left = line.slice(0, arrowAt);
            const right = line.slice(arrowAt + ARROW.length);

            const sourceMatch = NODE_PATTERN.exec(left.trim());
            const targetMatch = TARGET_PATTERN.exec(right.trim());
            const sourceName = sourceMatch?.[1]?.trim();
            const targetName = targetMatch?.[1]?.trim();

            if (!sourceName || !targetName) {
                throw new FlowDiagramParseError(
                    'a hop needs a node on both sides of -->',
                    lineNumber,
                    rawLine
                );
            }

            const source = upsertNode({
                id: slugify(sourceName),
                label: sourceName,
                detail: sourceMatch?.[2]?.trim() || undefined,
                tone: readTone(sourceMatch?.[3], lineNumber, rawLine)
            });
            const target = upsertNode({ id: slugify(targetName), label: targetName });

            const id = `${source.id}--${target.id}`;
            const existing = edges.get(id);
            const edge: FlowEdgeSpec = existing ?? {
                id,
                source: source.id,
                target: target.id,
                label: targetMatch?.[2]?.trim() || undefined,
                tone: readTone(targetMatch?.[3], lineNumber, rawLine)
            };
            edges.set(id, edge);

            // A hop outside any scenario belongs to every scenario, which is what
            // lets a diagram declare a shared backbone before the branches.
            if (currentScenario) {
                if (!currentScenario.edgeIds.includes(id)) currentScenario.edgeIds.push(id);
            }

            proseTarget = { kind: 'edge', id };
            continue;
        }

        // A bare node declaration.
        const nodeMatch = NODE_PATTERN.exec(line);
        const name = nodeMatch?.[1]?.trim();
        if (!name) {
            throw new FlowDiagramParseError('could not read a node name', lineNumber, rawLine);
        }

        const node = upsertNode({
            id: slugify(name),
            label: name,
            detail: nodeMatch?.[2]?.trim() || undefined,
            tone: readTone(nodeMatch?.[3], lineNumber, rawLine)
        });
        proseTarget = { kind: 'node', id: node.id };
    }

    const edgeList = [...edges.values()];

    for (const edge of edgeList) {
        if (!nodes.has(edge.source) || !nodes.has(edge.target)) {
            throw new FlowDiagramParseError(
                `hop ${edge.id} points at a node that was never declared`,
                0,
                edge.id
            );
        }
    }

    // A diagram with no `scenario` line still needs one, so the renderer has a
    // single code path: everything declared becomes the only route.
    const resolvedScenarios: FlowScenario[] = scenarios.length
        ? scenarios
        : [{ id: 'default', label: 'Flow', edgeIds: edgeList.map((edge) => edge.id) }];

    return {
        title,
        defaultView,
        showPackets,
        nodes: [...nodes.values()],
        edges: edgeList,
        scenarios: resolvedScenarios
    };
}
