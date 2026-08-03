'use client';

import { renderMarkdown, type TocItem } from '@/lib/markdown';
import { useEffect, useRef, useState } from 'react';

/**
 * Renders the body with the same pipeline the published site uses (Shiki
 * highlighting, heading ids, the table of contents, the custom inline
 * extensions), so the preview is the real thing rather than an approximation.
 *
 * Debounced, because re-running Shiki on every keystroke is expensive, and
 * guarded by a request id so a slow render cannot land after a newer one and
 * show stale output. `renderKey` changes whenever the html does, which lets the
 * DOM upgraders (code copy buttons, Mermaid) remount and rescan.
 */
export function useMarkdownPreview(body: string, delayMs = 300) {
    const [result, setResult] = useState<{ html: string; toc: TocItem[] }>({
        html: '',
        toc: []
    });
    const [renderKey, setRenderKey] = useState(0);
    const requestRef = useRef(0);

    useEffect(() => {
        const requestId = ++requestRef.current;
        const timer = setTimeout(async () => {
            const next = await renderMarkdown(body);
            if (requestId !== requestRef.current) {
                return;
            }
            setResult(next);
            setRenderKey((key) => key + 1);
        }, delayMs);

        return () => clearTimeout(timer);
    }, [body, delayMs]);

    return { html: result.html, toc: result.toc, renderKey };
}
