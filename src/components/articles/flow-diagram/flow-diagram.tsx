'use client';

import FlowCaption from '@/components/articles/flow-diagram/flow-caption';
import {
    FlowPlaybackControls,
    FlowScenarioSwitch,
    FlowViewSwitch
} from '@/components/articles/flow-diagram/flow-controls';
import FlowStaticView from '@/components/articles/flow-diagram/flow-static-view';
import { scenarioToMermaid } from '@/components/articles/flow-diagram/to-mermaid';
import type { FlowDiagramDefinition, FlowView } from '@/components/articles/flow-diagram/types';
import { useFlowPlayback } from '@/components/articles/flow-diagram/use-flow-playback';
import { useInViewport } from '@/components/articles/flow-diagram/use-in-viewport';
import { usePrefersReducedMotion } from '@/components/articles/hooks/use-prefers-reduced-motion';
import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';

// The canvas pulls in React Flow and dagre, which together dwarf the rest of an
// article's JavaScript. Loading it only when a reader presses "Interactive"
// keeps that weight off every article that merely contains a diagram.
const FlowCanvas = dynamic(() => import('@/components/articles/flow-diagram/flow-canvas'), {
    ssr: false,
    loading: () => (
        <div className="text-foreground/40 flex min-h-[16rem] items-center justify-center text-sm">
            Loading diagram&hellip;
        </div>
    )
});

/**
 * One ```flow block: a switchable, walkable diagram.
 *
 * Two renderings of the same definition. The static one is mermaid and is what
 * the reader gets first — cheap, printable, and enough for most diagrams. The
 * interactive one is a React Flow canvas that can be stepped through hop by hop,
 * with a packet travelling each leg as it lights.
 *
 * Playback pauses when the diagram scrolls out of view, and the packets are
 * dropped entirely under `prefers-reduced-motion` — the hop still lights, so the
 * step stays legible without anything moving.
 */
export default function FlowDiagram({ definition }: { definition: FlowDiagramDefinition }) {
    const [view, setView] = useState<FlowView>(definition.defaultView);
    const [scenarioId, setScenarioId] = useState(definition.scenarios[0]?.id ?? '');

    const scenario =
        definition.scenarios.find((item) => item.id === scenarioId) ?? definition.scenarios[0];

    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useInViewport(containerRef);
    const prefersReducedMotion = usePrefersReducedMotion();

    const stepCount = scenario?.edgeIds.length ?? 0;
    const playback = useFlowPlayback(stepCount, isVisible && view === 'interactive');

    const mermaidSource = useMemo(
        () => (scenario ? scenarioToMermaid(definition, scenario) : ''),
        [definition, scenario]
    );

    if (!scenario) return null;

    return (
        <div
            ref={containerRef}
            className="border-foreground/10 bg-background/40 not-prose my-8 overflow-hidden rounded-2xl border backdrop-blur-sm">
            <div className="border-foreground/10 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
                <div className="flex min-w-0 flex-wrap items-center gap-3">
                    {definition.title && (
                        <p className="text-foreground/70 truncate text-sm font-medium">
                            {definition.title}
                        </p>
                    )}
                    <FlowScenarioSwitch
                        scenarios={definition.scenarios}
                        activeId={scenario.id}
                        onSelect={setScenarioId}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {view === 'interactive' && stepCount > 0 && (
                        <FlowPlaybackControls playback={playback} stepCount={stepCount} />
                    )}
                    <FlowViewSwitch view={view} onSelect={setView} />
                </div>
            </div>

            <div className="h-[24rem]">
                {view === 'interactive' ? (
                    <FlowCanvas
                        definition={definition}
                        scenario={scenario}
                        step={playback.step}
                        showPackets={definition.showPackets && !prefersReducedMotion}
                        onSelectStep={playback.goTo}
                    />
                ) : (
                    // A mermaid failure is not fatal: the interactive canvas
                    // renders the same definition, so fall through to it rather
                    // than leaving the reader with an empty frame.
                    <FlowStaticView
                        mermaidSource={mermaidSource}
                        onError={() => setView('interactive')}
                    />
                )}
            </div>

            {view === 'interactive' && (
                <FlowCaption definition={definition} scenario={scenario} step={playback.step} />
            )}
        </div>
    );
}
