'use client';

import { bodyPlaceholder } from '@/components/articles/editor/contents';
import type { RefObject } from 'react';

interface MarkdownInputProps {
    value: string;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    onChange: (value: string) => void;
}

/**
 * The body editor. A plain textarea on purpose: the preview beside it already
 * shows the real rendering, so a rich-text surface would only add a second,
 * lying representation of the same text.
 */
export default function MarkdownInput({ value, textareaRef, onChange }: MarkdownInputProps) {
    const lineCount = value ? value.split('\n').length : 0;
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

    return (
        <section className="border-foreground/10 bg-background/40 flex min-h-[32rem] flex-col rounded-2xl border backdrop-blur-sm">
            <header className="border-foreground/10 text-foreground/60 flex items-center justify-between border-b px-4 py-2.5 text-xs">
                <span className="font-semibold tracking-[0.14em] uppercase">Markdown</span>
                <span className="font-mono">
                    {wordCount} words &middot; {lineCount} lines
                </span>
            </header>

            <textarea
                ref={textareaRef}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={bodyPlaceholder}
                spellCheck
                aria-label="Article body"
                className="text-foreground placeholder:text-foreground/35 min-h-[28rem] flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
            />
        </section>
    );
}
