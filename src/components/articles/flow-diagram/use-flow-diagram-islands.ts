'use client';

import {
    FlowDiagramParseError,
    parseFlowDiagram
} from '@/components/articles/flow-diagram/parse-flow-diagram';
import type { FlowDiagramDefinition } from '@/components/articles/flow-diagram/types';
import { useEffect, useState } from 'react';

export interface FlowIsland {
    /** The `<pre>` the markdown pipeline emitted, used as the portal target. */
    host: HTMLElement;
    definition: FlowDiagramDefinition;
}

/**
 * Finds every `<pre class="flow-diagram">` in the article body, parses its
 * source, and hands back a portal target per diagram.
 *
 * The article body is injected as an HTML string, so React does not own those
 * nodes and cannot render into them directly. Portalling is what lets each
 * diagram be a real React tree — with state, effects and lazy loading — inside
 * markup React did not create.
 *
 * The host is emptied before it is used: it currently holds the fence's source
 * as visible text, which is the right fallback until this runs and the wrong
 * thing to leave behind the mounted diagram.
 *
 * A diagram whose source does not parse is skipped and reported to the console,
 * leaving its source on the page. That is deliberate: a malformed diagram should
 * be obvious to the author without taking the article down for the reader.
 */
export function useFlowDiagramIslands(containerRef: React.RefObject<HTMLElement | null>) {
    const [islands, setIslands] = useState<FlowIsland[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const hosts = container.querySelectorAll<HTMLElement>('pre.flow-diagram');
        if (hosts.length === 0) return;

        const found: FlowIsland[] = [];

        for (const host of hosts) {
            const source = host.dataset.flowSource ?? host.textContent ?? '';
            if (!source.trim()) continue;
            // Stash the source before emptying the host, so a re-run (a theme
            // flip, a fast refresh) still has something to parse.
            host.dataset.flowSource = source;

            try {
                const definition = parseFlowDiagram(source);
                host.textContent = '';
                found.push({ host, definition });
            } catch (error) {
                if (error instanceof FlowDiagramParseError) {
                    console.error(`Flow diagram failed to parse — ${error.message}`);
                } else {
                    throw error;
                }
            }
        }

        setIslands(found);
    }, [containerRef]);

    return islands;
}
