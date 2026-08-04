'use client';

import { DiagramToolbar, ZoomControls } from '@/components/articles/diagram/diagram-tools';
import { usePanZoom } from '@/components/articles/diagram/use-pan-zoom';
import { useArticleImages } from '@/components/articles/hooks/use-article-images';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

/**
 * Opens any image inside the article body full-screen, with the same pan and
 * zoom the diagram viewer uses, and steps between every image in the post.
 *
 * A screenshot in the reading column is capped at the text width, which is
 * usually narrower than the thing it is a screenshot of. Zooming is the point:
 * "click to see it slightly larger" is not worth a modal.
 *
 * Arrow keys step, Escape closes. The image itself is a plain `<img>` because
 * the source is whatever the markdown pipeline emitted — including remote and
 * generated files — so it cannot satisfy the image optimiser's
 * known-dimensions contract.
 */
export default function ImageLightbox() {
    const { images, index, current, close, next, previous } = useArticleImages();
    const viewportRef = useRef<HTMLDivElement>(null);
    const {
        transform,
        isPanning,
        canZoomIn,
        canZoomOut,
        isReset,
        zoomIn,
        zoomOut,
        reset,
        onPointerDown
    } = usePanZoom(viewportRef);

    const isOpen = current !== null;
    useCloseOnEscape(isOpen, close);

    // A new image starts at 1:1: carrying the previous one's zoom over would
    // open the next screenshot already cropped into a corner.
    useEffect(() => {
        reset();
    }, [index, reset]);

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') next();
            if (event.key === 'ArrowLeft') previous();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, next, previous]);

    // Hold the page still behind the overlay, restoring whatever overflow the
    // document already had rather than assuming it was the default.
    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    if (!current) return null;

    const hasSiblings = images.length > 1;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt || 'Expanded image'}
            className="bg-background/95 fixed inset-0 z-[70] flex flex-col backdrop-blur-sm print:hidden">
            <div className="border-foreground/10 flex items-center justify-between gap-4 border-b px-4 py-3">
                <p className="text-foreground/70 truncate text-sm">
                    {current.alt || 'Image'}
                    {hasSiblings && (
                        <span className="text-foreground/40 ml-2 font-mono text-xs tabular-nums">
                            {(index ?? 0) + 1}/{images.length}
                        </span>
                    )}
                </p>

                <DiagramToolbar>
                    <ZoomControls
                        scale={transform.scale}
                        canZoomIn={canZoomIn}
                        canZoomOut={canZoomOut}
                        isReset={isReset}
                        onZoomIn={zoomIn}
                        onZoomOut={zoomOut}
                        onReset={reset}
                    />
                    <span aria-hidden="true" className="bg-foreground/10 mx-1 h-5 w-px" />
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close image"
                        title="Close image"
                        className="focus-ring text-foreground/70 hover:text-foreground hover:bg-foreground/10 flex size-8 items-center justify-center rounded-md transition-colors">
                        <X aria-hidden="true" className="size-4" />
                    </button>
                </DiagramToolbar>
            </div>

            <div
                ref={viewportRef}
                onPointerDown={onPointerDown}
                className={cn(
                    'relative flex-1 touch-none overflow-hidden',
                    isPanning ? 'cursor-grabbing' : 'cursor-grab'
                )}>
                <div
                    className="absolute top-0 left-0 origin-top-left"
                    style={{
                        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                        transition: isPanning ? undefined : 'transform 150ms ease-out'
                    }}>
                    <div className="flex h-[calc(100vh-7rem)] w-screen items-center justify-center p-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={current.src}
                            alt={current.alt}
                            // `draggable` off, or a drag starts the browser's own
                            // image drag instead of panning the viewport.
                            draggable={false}
                            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                        />
                    </div>
                </div>

                {hasSiblings && (
                    <>
                        <StepButton side="left" label="Previous image" onClick={previous}>
                            <ChevronLeft aria-hidden="true" className="size-5" />
                        </StepButton>
                        <StepButton side="right" label="Next image" onClick={next}>
                            <ChevronRight aria-hidden="true" className="size-5" />
                        </StepButton>
                    </>
                )}
            </div>

            {/* Built as one string rather than as JSX fragments: JSX drops the
                whitespace at a line break, so a separator on its own line ends
                up glued to the words before it. */}
            <p className="text-foreground/40 border-foreground/10 border-t px-4 py-2 text-center text-xs">
                {[
                    'Drag to pan',
                    'scroll to zoom',
                    ...(hasSiblings ? ['arrow keys to step'] : []),
                    'Esc to close'
                ].join(' · ')}
            </p>
        </div>
    );
}

function StepButton({
    side,
    label,
    onClick,
    children
}: {
    side: 'left' | 'right';
    label: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={cn(
                'focus-ring border-foreground/10 bg-background/70 text-foreground/70 hover:text-foreground absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors',
                side === 'left' ? 'left-4' : 'right-4'
            )}>
            {children}
        </button>
    );
}
