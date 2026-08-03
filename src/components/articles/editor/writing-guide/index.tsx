'use client';

import { guideGroups } from '@/components/articles/editor/writing-guide/contents';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import Button from '@/components/ui/button';
import { X } from 'lucide-react';

interface WritingGuideProps {
    onClose: () => void;
    onInsert: (snippet: string) => void;
}

/**
 * Every body feature the renderer supports, with an insert button for each. It
 * exists so the answer to "does this site do footnotes?" is one click rather
 * than a trip through `src/lib/markdown.ts`.
 */
export default function WritingGuide({ onClose, onInsert }: WritingGuideProps) {
    useCloseOnEscape(true, onClose);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Writing guide"
            className="fixed inset-0 z-60 flex items-start justify-center px-4 py-16">
            <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={onClose}
                className="bg-background/70 absolute inset-0 cursor-default backdrop-blur-sm"
            />

            <div className="border-foreground/10 bg-background/95 relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/20">
                <header className="border-foreground/10 flex items-center justify-between border-b px-5 py-4">
                    <div>
                        <h2 className="text-foreground text-lg font-semibold">Writing guide</h2>
                        <p className="text-foreground/60 text-sm">
                            Everything the article renderer supports. Insert a snippet to try it.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close guide"
                        className="focus-ring text-foreground/60 hover:text-foreground rounded-full p-2 transition-colors">
                        <X aria-hidden="true" className="size-5" />
                    </button>
                </header>

                <div className="min-h-0 flex-1 space-y-8 overflow-y-auto p-5">
                    {guideGroups.map((group) => (
                        <section key={group.title}>
                            <h3 className="text-foreground/70 text-xs font-semibold tracking-[0.14em] uppercase">
                                {group.title}
                            </h3>

                            <ul className="mt-3 space-y-3">
                                {group.entries.map((entry) => (
                                    <li
                                        key={entry.label}
                                        className="border-foreground/10 rounded-xl border p-4">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-foreground font-medium">
                                                    {entry.label}
                                                </p>
                                                <p className="text-foreground/60 mt-1 text-sm">
                                                    {entry.note}
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={() => onInsert(entry.snippet)}>
                                                Insert
                                            </Button>
                                        </div>
                                        <pre className="border-foreground/10 bg-foreground/5 text-foreground/80 mt-3 overflow-x-auto rounded-lg border p-3 font-mono text-xs">
                                            {entry.snippet}
                                        </pre>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
