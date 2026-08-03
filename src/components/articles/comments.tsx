'use client';

import { giscus, isGiscusConfigured } from '@/lib/metadata';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

/**
 * Giscus comment thread, backed by GitHub Discussions.
 *
 * The widget is an iframe loaded by a third-party script, so it is injected on
 * mount rather than rendered as JSX, and it is told to re-theme through the
 * documented `postMessage` channel when the site theme flips (reloading the
 * iframe instead would drop whatever the reader had typed).
 *
 * Renders nothing until the repository IDs are filled in, so an unconfigured
 * deploy shows no comment box at all rather than giscus's own error panel.
 */
export default function Comments() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const giscusTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isGiscusConfigured) return;

        // Already mounted: just re-theme the existing iframe.
        const frame = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
        if (frame?.contentWindow) {
            frame.contentWindow.postMessage(
                { giscus: { setConfig: { theme: giscusTheme } } },
                'https://giscus.app'
            );
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-repo', giscus.repo);
        script.setAttribute('data-repo-id', giscus.repoId);
        script.setAttribute('data-category', giscus.category);
        script.setAttribute('data-category-id', giscus.categoryId);
        // Map a thread to the page's pathname, so a discussion follows the
        // article even if its title is later edited.
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', giscusTheme);
        script.setAttribute('data-lang', 'en');
        script.setAttribute('data-loading', 'lazy');
        container.append(script);
    }, [giscusTheme]);

    if (!isGiscusConfigured) return null;

    return (
        <section className="border-foreground/10 mt-20 border-t pt-12">
            <h2 className="text-foreground text-2xl font-bold">Comments</h2>
            <div ref={containerRef} className="mt-8" />
        </section>
    );
}
