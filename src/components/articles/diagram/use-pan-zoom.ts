'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const MIN_SCALE = 0.4;
export const MAX_SCALE = 6;
const SCALE_STEP = 1.25;

export interface PanZoomTransform {
    scale: number;
    x: number;
    y: number;
}

const IDENTITY: PanZoomTransform = { scale: 1, x: 0, y: 0 };

function clampScale(scale: number): number {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

/**
 * Pan and zoom for a diagram inside a fixed viewport.
 *
 * The transform is held in React state because the toolbar has to render the
 * current zoom level and disable its buttons at the limits, but the drag itself
 * writes through a ref first and only commits on release — a `pointermove`
 * handler that calls `setState` on every frame would re-render the whole modal
 * for the length of the gesture.
 *
 * Zooming keeps the point under the cursor fixed rather than scaling about the
 * centre, which is the difference between "inspecting a node" and "watching the
 * diagram run away from the pointer".
 */
export function usePanZoom(viewportRef: React.RefObject<HTMLElement | null>) {
    const [transform, setTransform] = useState<PanZoomTransform>(IDENTITY);
    // Mirrors `transform` so the pointer handlers can read the current value
    // without re-subscribing the listeners on every frame of a drag.
    const transformRef = useRef(transform);
    transformRef.current = transform;

    const [isPanning, setIsPanning] = useState(false);

    const reset = useCallback(() => setTransform(IDENTITY), []);

    /** Zooms about a point in viewport coordinates, defaulting to the centre. */
    const zoomAbout = useCallback(
        (factor: number, originX?: number, originY?: number) => {
            const viewport = viewportRef.current;
            if (!viewport) return;

            const rect = viewport.getBoundingClientRect();
            const px = originX ?? rect.width / 2;
            const py = originY ?? rect.height / 2;

            setTransform((current) => {
                const scale = clampScale(current.scale * factor);
                // Nothing moved: at a limit, panning the content would be a lie.
                if (scale === current.scale) return current;

                const ratio = scale / current.scale;
                return {
                    scale,
                    x: px - (px - current.x) * ratio,
                    y: py - (py - current.y) * ratio
                };
            });
        },
        [viewportRef]
    );

    const zoomIn = useCallback(() => zoomAbout(SCALE_STEP), [zoomAbout]);
    const zoomOut = useCallback(() => zoomAbout(1 / SCALE_STEP), [zoomAbout]);

    // Wheel zoom. Bound manually rather than through onWheel, because React
    // attaches a passive listener and a passive handler cannot preventDefault,
    // which would let the page scroll behind the diagram as it zooms.
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = viewport.getBoundingClientRect();
            const factor = event.deltaY < 0 ? SCALE_STEP : 1 / SCALE_STEP;
            zoomAbout(factor, event.clientX - rect.left, event.clientY - rect.top);
        };

        viewport.addEventListener('wheel', onWheel, { passive: false });
        return () => viewport.removeEventListener('wheel', onWheel);
    }, [viewportRef, zoomAbout]);

    const onPointerDown = useCallback((event: React.PointerEvent) => {
        // Left button (or touch/pen) only: a right-click is the context menu.
        if (event.button !== 0) return;

        // A press on a control inside the viewport must not start a pan. It is
        // not only that dragging a button is meaningless: `setPointerCapture`
        // below retargets the whole gesture to the viewport, so the button would
        // never receive its own click and would silently stop working.
        if ((event.target as Element).closest('button, a, input, select, textarea')) return;

        const start = { x: event.clientX, y: event.clientY };
        const origin = { ...transformRef.current };
        const element = event.currentTarget as HTMLElement;
        element.setPointerCapture(event.pointerId);
        setIsPanning(true);

        const onMove = (moveEvent: PointerEvent) => {
            transformRef.current = {
                ...origin,
                x: origin.x + (moveEvent.clientX - start.x),
                y: origin.y + (moveEvent.clientY - start.y)
            };
            // Written straight to the node during the drag; React catches up on
            // release. This is the same trick the cursor spotlight uses.
            const stage = element.firstElementChild as HTMLElement | null;
            if (stage) {
                const { scale, x, y } = transformRef.current;
                stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            }
        };

        const onUp = () => {
            element.removeEventListener('pointermove', onMove);
            element.removeEventListener('pointerup', onUp);
            element.removeEventListener('pointercancel', onUp);
            setIsPanning(false);
            setTransform(transformRef.current);
        };

        element.addEventListener('pointermove', onMove);
        element.addEventListener('pointerup', onUp);
        element.addEventListener('pointercancel', onUp);
    }, []);

    return {
        transform,
        isPanning,
        canZoomIn: transform.scale < MAX_SCALE,
        canZoomOut: transform.scale > MIN_SCALE,
        isReset: transform === IDENTITY,
        zoomIn,
        zoomOut,
        reset,
        onPointerDown
    };
}
