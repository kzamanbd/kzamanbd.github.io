'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** How long each hop holds before the walk advances. */
const STEP_MS = 2200;

export interface FlowPlayback {
    /** Index into the scenario's hop list, or -1 for "not started". */
    step: number;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    next: () => void;
    previous: () => void;
    /** Jumps to a hop and pauses, for a click on the canvas. */
    goTo: (step: number) => void;
    reset: () => void;
}

/**
 * Walks a scenario's hops one at a time.
 *
 * The walk stops at the end rather than looping. A looping diagram reads as
 * decoration and the reader stops watching it; one that finishes says "this is
 * the whole path" and leaves the last hop lit, which is the state worth reading.
 *
 * `paused` also covers the case where the diagram has scrolled out of view: the
 * caller passes `enabled` false and the timer is dropped entirely rather than
 * burning frames on something nobody is looking at.
 */
export function useFlowPlayback(stepCount: number, enabled: boolean): FlowPlayback {
    const [step, setStep] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // Reset when the scenario changes under us: a step index from a four-hop
    // route means nothing in a two-hop one.
    useEffect(() => {
        clear();
        setStep(-1);
        setIsPlaying(false);
    }, [stepCount, clear]);

    useEffect(() => {
        if (!isPlaying || !enabled || stepCount === 0) {
            clear();
            return;
        }

        timerRef.current = setTimeout(
            () => {
                setStep((current) => {
                    const nextStep = current + 1;
                    if (nextStep >= stepCount) {
                        // Hold on the last hop rather than snapping back to nothing.
                        setIsPlaying(false);
                        return stepCount - 1;
                    }
                    return nextStep;
                });
            },
            step === -1 ? 250 : STEP_MS
        );

        return clear;
    }, [isPlaying, enabled, step, stepCount, clear]);

    useEffect(() => clear, [clear]);

    const play = useCallback(() => {
        setStep((current) => (current >= stepCount - 1 ? -1 : current));
        setIsPlaying(true);
    }, [stepCount]);

    const pause = useCallback(() => setIsPlaying(false), []);
    const toggle = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, pause, play]);

    const next = useCallback(() => {
        setIsPlaying(false);
        setStep((current) => Math.min(current + 1, stepCount - 1));
    }, [stepCount]);

    const previous = useCallback(() => {
        setIsPlaying(false);
        setStep((current) => Math.max(current - 1, 0));
    }, []);

    const goTo = useCallback((target: number) => {
        setIsPlaying(false);
        setStep(target);
    }, []);

    const reset = useCallback(() => {
        setIsPlaying(false);
        setStep(-1);
    }, []);

    return { step, isPlaying, play, pause, toggle, next, previous, goTo, reset };
}
