/** A diagram handed to the full-screen viewer. */
export interface OpenDiagram {
    /** The rendered diagram, as markup: mermaid produces an SVG string. */
    html: string;
    /** The diagram's own source, offered through the modal's copy button. */
    source: string;
    title?: string;
}
