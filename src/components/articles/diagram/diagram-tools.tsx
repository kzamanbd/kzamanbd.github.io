'use client';

import { cn } from '@/utils/cn';
import { Check, Copy, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react';
import type { ReactNode } from 'react';

function ToolButton({
    label,
    onClick,
    disabled,
    children
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
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

/** The bar the buttons sit in, so the inline and modal toolbars match. */
export function DiagramToolbar({
    className,
    children
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                'border-foreground/10 bg-background/80 flex items-center gap-0.5 rounded-lg border p-1 shadow-sm backdrop-blur-sm',
                className
            )}>
            {children}
        </div>
    );
}

export function ZoomControls({
    scale,
    canZoomIn,
    canZoomOut,
    isReset,
    onZoomIn,
    onZoomOut,
    onReset
}: {
    scale: number;
    canZoomIn: boolean;
    canZoomOut: boolean;
    isReset: boolean;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
}) {
    return (
        <>
            <ToolButton label="Zoom out" onClick={onZoomOut} disabled={!canZoomOut}>
                <Minus aria-hidden="true" className="size-4" />
            </ToolButton>

            {/* Tabular figures so the box does not twitch as the number changes. */}
            <span className="text-foreground/60 w-12 text-center font-mono text-xs tabular-nums">
                {Math.round(scale * 100)}%
            </span>

            <ToolButton label="Zoom in" onClick={onZoomIn} disabled={!canZoomIn}>
                <Plus aria-hidden="true" className="size-4" />
            </ToolButton>

            <ToolButton label="Reset view" onClick={onReset} disabled={isReset}>
                <RotateCcw aria-hidden="true" className="size-4" />
            </ToolButton>
        </>
    );
}

export function CopySourceButton({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
    return (
        <ToolButton label={copied ? 'Copied' : 'Copy diagram source'} onClick={onCopy}>
            {copied ? (
                <Check aria-hidden="true" className="size-4 text-emerald-500" />
            ) : (
                <Copy aria-hidden="true" className="size-4" />
            )}
        </ToolButton>
    );
}

export function ExpandButton({ onExpand }: { onExpand: () => void }) {
    return (
        <ToolButton label="Expand diagram" onClick={onExpand}>
            <Maximize2 aria-hidden="true" className="size-4" />
        </ToolButton>
    );
}

export function CloseButton({ onClose }: { onClose: () => void }) {
    return (
        <ToolButton label="Close diagram" onClick={onClose}>
            <X aria-hidden="true" className="size-4" />
        </ToolButton>
    );
}
