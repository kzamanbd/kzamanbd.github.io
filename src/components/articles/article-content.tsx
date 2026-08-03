'use client';

import styles from '@/components/articles/article-content.module.css';
import CodeCopy from '@/components/articles/code-copy';
import MermaidRenderer from '@/components/articles/mermaid-renderer';
import { useSpotlightSurfaces } from '@/components/common/hooks/use-spotlight-surfaces';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

/**
 * Renders an article body and mounts the three behaviours that operate on it:
 * copy buttons for code blocks, Mermaid diagram rendering, and the cursor
 * spotlight over code blocks and tables.
 *
 * All three need the real DOM nodes rather than React elements, because the body
 * arrives as an HTML string from the markdown pipeline. One ref is shared by all
 * of them, so there is a single delegated listener per behaviour for the whole
 * article instead of one per block.
 */
export default function ArticleContent({ html }: { html: string }) {
    const bodyRef = useRef<HTMLDivElement>(null);
    useSpotlightSurfaces(bodyRef);

    return (
        <>
            <div
                ref={bodyRef}
                className={cn(styles.content, 'max-w-none')}
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <CodeCopy containerRef={bodyRef} />
            <MermaidRenderer containerRef={bodyRef} />
        </>
    );
}
