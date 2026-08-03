'use client';

import { useSearchPalette } from '@/components/articles/search-palette/hooks/use-search-palette';
import SearchResultItem from '@/components/articles/search-palette/search-result-item';
import { cn } from '@/utils/cn';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

/**
 * Site-wide article search as a command palette: Cmd+K (Ctrl+K), or `/` when the
 * reader is not already typing. The trigger sits in the navigation and the
 * overlay is rendered here, so one instance serves every route.
 *
 * The corpus is fetched the first time the palette opens rather than shipped
 * with every page, so this costs nothing until it is used.
 */
export default function SearchPalette({ className }: { className?: string }) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        open,
        openPalette,
        close,
        query,
        setQuery,
        results,
        loading,
        activeIndex,
        setActiveIndex,
        moveSelection,
        hasQuery
    } = useSearchPalette();

    // The shortcut hint reads Cmd on Apple keyboards and Ctrl elsewhere. It is
    // resolved after mount, since the server cannot know the platform, and both
    // shortcuts work regardless of what the hint says.
    const [shortcutLabel, setShortcutLabel] = useState('Ctrl K');
    useEffect(() => {
        if (/mac|iphone|ipad/i.test(navigator.userAgent)) {
            setShortcutLabel('⌘ K');
        }
    }, []);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            moveSelection(1);
            return;
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            moveSelection(-1);
            return;
        }
        if (event.key === 'Enter') {
            const selected = results[activeIndex];
            if (selected) {
                event.preventDefault();
                close();
                router.push(`/articles/${selected.article.slug}`);
            }
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={openPalette}
                aria-haspopup="dialog"
                aria-label="Search articles"
                className={cn(
                    'focus-ring border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
                    className
                )}>
                <Search aria-hidden="true" className="size-4" />
                <span className="hidden lg:inline">Search</span>
                <kbd className="border-foreground/15 text-foreground/50 hidden shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap lg:inline">
                    {shortcutLabel}
                </kbd>
            </button>

            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search articles"
                    className="fixed inset-0 z-60 flex items-start justify-center px-4 pt-24 sm:pt-32">
                    {/* The scrim closes the palette on a press, matching the
                        Escape shortcut. It is not focusable: the input keeps
                        focus for as long as the dialog is open. */}
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={close}
                        className="bg-background/70 absolute inset-0 cursor-default backdrop-blur-sm"
                    />

                    <div className="border-foreground/10 bg-background/95 relative w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl shadow-black/20">
                        <div className="border-foreground/10 flex items-center gap-3 border-b px-4">
                            <Search aria-hidden="true" className="text-foreground/40 size-4" />
                            <input
                                ref={inputRef}
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search articles by title, tag or description"
                                aria-label="Search articles"
                                autoComplete="off"
                                className="text-foreground placeholder:text-foreground/40 min-h-14 w-full bg-transparent text-base outline-none"
                            />
                            <kbd className="border-foreground/15 text-foreground/50 hidden rounded border px-1.5 py-0.5 text-[10px] sm:inline">
                                Esc
                            </kbd>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {results.length > 0 ? (
                                <ul className="flex flex-col gap-1">
                                    {results.map((result, index) => (
                                        <SearchResultItem
                                            key={result.article.slug}
                                            article={result.article}
                                            query={query}
                                            active={index === activeIndex}
                                            onHover={() => setActiveIndex(index)}
                                            onSelect={close}
                                        />
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-foreground/50 px-4 py-8 text-center text-sm">
                                    {loading && 'Loading articles...'}
                                    {!loading && hasQuery && `Nothing matches "${query.trim()}".`}
                                    {!loading &&
                                        !hasQuery &&
                                        'Type to search every published article.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
