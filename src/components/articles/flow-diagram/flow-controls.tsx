'use client';

import type { FlowPlayback } from '@/components/articles/flow-diagram/use-flow-playback';
import type { FlowScenario, FlowView } from '@/components/articles/flow-diagram/types';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';

function ControlButton({
    label,
    onClick,
    disabled,
    children
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className="focus-ring text-foreground/70 hover:text-foreground hover:bg-foreground/10 flex size-8 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-35">
            {children}
        </button>
    );
}

/** Play, step and reset for the walk through a scenario's hops. */
export function FlowPlaybackControls({
    playback,
    stepCount
}: {
    playback: FlowPlayback;
    stepCount: number;
}) {
    const { step, isPlaying, toggle, next, previous, reset } = playback;

    return (
        <div className="flex items-center gap-0.5">
            <ControlButton label="Previous hop" onClick={previous} disabled={step <= 0}>
                <ChevronLeft aria-hidden="true" className="size-4" />
            </ControlButton>

            <ControlButton label={isPlaying ? 'Pause' : 'Play'} onClick={toggle}>
                {isPlaying ? (
                    <Pause aria-hidden="true" className="size-4" />
                ) : (
                    <Play aria-hidden="true" className="size-4" />
                )}
            </ControlButton>

            <ControlButton label="Next hop" onClick={next} disabled={step >= stepCount - 1}>
                <ChevronRight aria-hidden="true" className="size-4" />
            </ControlButton>

            <ControlButton label="Restart" onClick={reset} disabled={step === -1}>
                <RotateCcw aria-hidden="true" className="size-4" />
            </ControlButton>

            <span className="text-foreground/50 ml-1 font-mono text-xs tabular-nums">
                {step < 0 ? `0/${stepCount}` : `${step + 1}/${stepCount}`}
            </span>
        </div>
    );
}

/**
 * Switches between the diagram's scenarios.
 *
 * A segmented control rather than a `<select>`: the whole point of scenarios is
 * that the reader flips between them to compare, and a menu that has to be
 * opened first makes that a two-click round trip.
 */
export function FlowScenarioSwitch({
    scenarios,
    activeId,
    onSelect
}: {
    scenarios: FlowScenario[];
    activeId: string;
    onSelect: (id: string) => void;
}) {
    if (scenarios.length < 2) return null;

    return (
        <div
            role="tablist"
            aria-label="Diagram scenarios"
            className="border-foreground/10 bg-background/60 flex flex-wrap gap-1 rounded-lg border p-1">
            {scenarios.map((scenario) => {
                const isActive = scenario.id === activeId;
                return (
                    <button
                        key={scenario.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelect(scenario.id)}
                        className={cn(
                            'focus-ring rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                            isActive
                                ? 'bg-foreground text-background'
                                : 'text-foreground/60 hover:text-foreground hover:bg-foreground/10'
                        )}>
                        {scenario.label}
                    </button>
                );
            })}
        </div>
    );
}

/**
 * Switches the static rendering for the interactive one.
 *
 * Static is the default: it is the version that prints, that a reader with
 * JavaScript disabled still gets, and that costs nothing to show — the React
 * Flow chunk is only fetched once someone presses "Interactive".
 */
export function FlowViewSwitch({
    view,
    onSelect
}: {
    view: FlowView;
    onSelect: (view: FlowView) => void;
}) {
    const options: { value: FlowView; label: string }[] = [
        { value: 'static', label: 'Static' },
        { value: 'interactive', label: 'Interactive' }
    ];

    return (
        <div className="border-foreground/10 bg-background/60 flex gap-1 rounded-lg border p-1">
            {options.map((option) => {
                const isActive = option.value === view;
                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onSelect(option.value)}
                        className={cn(
                            'focus-ring rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                            isActive
                                ? 'bg-foreground text-background'
                                : 'text-foreground/60 hover:text-foreground hover:bg-foreground/10'
                        )}>
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
