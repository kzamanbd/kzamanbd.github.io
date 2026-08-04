'use client';

import {
    CloseButton,
    CopySourceButton,
    DiagramToolbar,
    ZoomControls
} from '@/components/articles/diagram/diagram-tools';
import { usePanZoom } from '@/components/articles/diagram/use-pan-zoom';
import { useCopyToClipboard } from '@/components/articles/hooks/use-copy-to-clipboard';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';

interface DiagramModalProps {
    /** The rendered diagram, as markup produced by mermaid or a flow renderer. */
    html: string;
    /** The diagram's own source, offered to the reader through the copy button. */
    source: string;
    title?: string;
    onClose: () => void;
}

/**
 * Full-screen viewer for a diagram, with pan and zoom.
 *
 * A diagram that is legible in the reading column is often unreadable once it
 * has more than a handful of nodes — the article body caps it at the text width
 * and the SVG scales down to fit. This gives it the whole viewport plus the
 * ability to zoom into one corner of it.
 *
 * The diagram arrives as markup rather than as React children because mermaid
 * renders to an SVG string; there are no elements to portal.
 */
export default function DiagramModal({ html, source, title, onClose }: DiagramModalProps) {
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
    const [copied, copy] = useCopyToClipboard();

    useCloseOnEscape(true, onClose);

    // Hold the page still behind the overlay, restoring whatever overflow the
    // document already had rather than assuming it was the default.
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'Expanded diagram'}
            className="bg-background/95 fixed inset-0 z-[70] flex flex-col backdrop-blur-sm print:hidden">
            <div className="border-foreground/10 flex items-center justify-between gap-4 border-b px-4 py-3">
                <p className="text-foreground/70 truncate text-sm font-medium">
                    {title ?? 'Diagram'}
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
                    <CopySourceButton copied={copied} onCopy={() => copy(source)} />
                    <CloseButton onClose={onClose} />
                </DiagramToolbar>
            </div>

            <div
                ref={viewportRef}
                onPointerDown={onPointerDown}
                className={cn(
                    'relative flex-1 touch-none overflow-hidden',
                    isPanning ? 'cursor-grabbing' : 'cursor-grab'
                )}>
                {/* `transform-origin: 0 0` is what lets the zoom maths in
                    usePanZoom treat x/y as plain viewport offsets. */}
                <div
                    className="absolute top-0 left-0 origin-top-left"
                    style={{
                        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                        transition: isPanning ? undefined : 'transform 150ms ease-out'
                    }}>
                    <div
                        className="flex min-h-screen w-screen items-center justify-center p-8"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>

            <p className="text-foreground/40 border-foreground/10 border-t px-4 py-2 text-center text-xs">
                Drag to pan &middot; scroll to zoom &middot; Esc to close
            </p>
        </div>
    );
}
