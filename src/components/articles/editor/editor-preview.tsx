'use client';

import ArticleContent from '@/components/articles/article-content';
import { useMarkdownPreview } from '@/components/articles/editor/hooks/use-markdown-preview';

/**
 * The live preview. It renders through `ArticleContent`, the very component the
 * published article page uses, so code blocks, Mermaid diagrams and the copy
 * buttons behave exactly as they will once the file is saved. `renderKey`
 * remounts it whenever the html changes, which is what makes those DOM-level
 * upgraders rescan the new markup.
 */
export default function EditorPreview({ body }: { body: string }) {
    const { html, renderKey } = useMarkdownPreview(body);

    return (
        <section className="border-foreground/10 bg-background/40 flex h-full min-h-[32rem] flex-col overflow-hidden rounded-2xl border backdrop-blur-sm">
            <header className="border-foreground/10 text-foreground/60 flex items-center justify-between border-b px-4 py-2.5 text-xs">
                <span className="font-semibold tracking-[0.14em] uppercase">Preview</span>
                <span>Rendered by the production pipeline</span>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
                {html ? (
                    <ArticleContent key={renderKey} html={html} />
                ) : (
                    <p className="text-foreground/40 py-16 text-center text-sm">
                        The rendered article appears here as you type.
                    </p>
                )}
            </div>
        </section>
    );
}
