// The shape a ```flow fence parses into, shared by the parser, the layout pass
// and the React Flow components. Pure types with no runtime import, so server
// and client code can both read them.

/**
 * How a node or edge is tinted. `secure` marks an encrypted leg, `blocked` a
 * path that deliberately goes nowhere, `allowed` a normal successful hop.
 */
export type FlowTone = 'neutral' | 'secure' | 'blocked' | 'allowed';

export const FLOW_TONES: readonly FlowTone[] = ['neutral', 'secure', 'blocked', 'allowed'];

/** One box. Ids are slugified from the declared name, so edges can refer to it by name. */
export interface FlowNodeSpec {
    id: string;
    label: string;
    /** Optional second line, typically an address or a role. */
    detail?: string;
    /** Shown in the caption when this node is the current step. */
    description?: string;
    tone?: FlowTone;
}

/** One arrow, identified by its endpoints so scenarios can share a hop. */
export interface FlowEdgeSpec {
    id: string;
    source: string;
    target: string;
    /** Short text drawn on the arrow. */
    label?: string;
    /** Shown in the caption while stepping through this hop. */
    caption?: string;
    tone?: FlowTone;
}

/**
 * One switchable state of a diagram.
 *
 * Scenarios name the hops they route through rather than owning nodes: every
 * scenario draws the same node set, so toggling changes which route is lit
 * rather than rearranging the picture under the reader.
 */
export interface FlowScenario {
    id: string;
    label: string;
    summary?: string;
    edgeIds: string[];
}

/** Which of the two renderings a diagram opens on. */
export type FlowView = 'static' | 'interactive';

/** A whole ```flow block. Nodes and edges are the union across all scenarios. */
export interface FlowDiagramDefinition {
    /** Accessible name for the canvas. */
    title?: string;
    /**
     * Which view the reader gets first. Defaults to `static`, so the heavy React
     * Flow chunk is only fetched by readers who ask for the interactive one.
     */
    defaultView: FlowView;
    /**
     * Whether packets travel the hops in the interactive view. Defaults to on.
     * Structural diagrams (a commit graph, say) want it off: nothing actually
     * moves between two commits, so a travelling dot would assert something
     * untrue.
     */
    showPackets: boolean;
    nodes: FlowNodeSpec[];
    edges: FlowEdgeSpec[];
    scenarios: FlowScenario[];
}
