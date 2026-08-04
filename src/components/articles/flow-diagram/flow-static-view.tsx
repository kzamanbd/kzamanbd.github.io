'use client';

import { mermaidConfig } from '@/components/articles/diagram/mermaid-theme';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

/**
 * Renders the diagram's mermaid form.
 *
 * This is what a reader sees before touching anything: it is far cheaper than
 * the React Flow canvas, it re-renders with the theme, and it is the version
 * that survives printing. `to-mermaid.ts` generates the source from the same
 * definition the canvas draws, so the two can never disagree.
 *
 * A render failure leaves the box empty rather than showing mermaid's own error
 * card, and reports through `onError` so the parent can fall back to the
 * interactive view instead of showing the reader nothing.
 */
export default function FlowStaticView({
    mermaidSource,
    onError
}: {
    mermaidSource: string;
    onError?: () => void;
}) {
    const [svg, setSvg] = useState<string | null>(null);
    const { resolvedTheme } = useTheme();
    // Every mermaid render needs an id unique in the document, or a second
    // diagram on the page overwrites the first one's definitions.
    const idRef = useRef(`flow-static-${Math.random().toString(36).slice(2, 9)}`);

    useEffect(() => {
        let cancelled = false;

        void (async () => {
            try {
                const { default: mermaid } = await import('mermaid');
                if (cancelled) return;

                mermaid.initialize(mermaidConfig(resolvedTheme === 'dark'));
                const rendered = await mermaid.render(
                    `${idRef.current}-${resolvedTheme}`,
                    mermaidSource
                );
                if (cancelled) return;
                setSvg(rendered.svg);
            } catch {
                if (cancelled) return;
                setSvg(null);
                onError?.();
            }
        })();

        return () => {
            cancelled = true;
        };
        // `onError` is deliberately not a dependency: the parent recreates the
        // callback each render, and re-running a mermaid render on every parent
        // update would thrash.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mermaidSource, resolvedTheme]);

    return (
        <div
            className="flex min-h-[16rem] items-center justify-center p-4 [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
        />
    );
}
