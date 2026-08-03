'use client';

import { useDebouncedValue } from '@/components/articles/search-palette/hooks/use-debounced-value';
import { useArticleCorpus } from '@/components/articles/search-palette/hooks/use-article-corpus';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { useCloseOnRouteChange } from '@/components/layout/hooks/use-close-on-route-change';
import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import { searchArticles } from '@/utils/search-articles';
import { useCallback, useEffect, useMemo, useState } from 'react';

const MAX_RESULTS = 8;

/**
 * The behaviour behind the command-palette search: the global shortcut that
 * opens it, the query and its debounced ranking, keyboard navigation over the
 * results, and the scroll lock while it is open.
 *
 * The shortcut is Cmd+K on Apple platforms and Ctrl+K elsewhere; both are
 * accepted everywhere, so a reader on an external keyboard is never locked out
 * by platform detection. `/` also opens it, unless the reader is already typing
 * in a field.
 */
export function useSearchPalette() {
    const { open, show, close } = useDisclosure();
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    useCloseOnEscape(open, close);
    useCloseOnRouteChange(close);

    const { articles, loading } = useArticleCorpus(open);
    const debouncedQuery = useDebouncedValue(query);
    const trimmed = debouncedQuery.trim();

    const results = useMemo(
        () => (trimmed ? searchArticles(articles, trimmed).slice(0, MAX_RESULTS) : []),
        [articles, trimmed]
    );

    // A new ranking invalidates the highlighted row, so selection returns to the
    // top result rather than pointing at whatever now occupies that index.
    useEffect(() => setActiveIndex(0), [trimmed]);

    const openPalette = useCallback(() => {
        setQuery('');
        setActiveIndex(0);
        show();
    }, [show]);

    // The global shortcut.
    useEffect(() => {
        const isTypingTarget = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) {
                return false;
            }
            return (
                target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
            );
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const withModifier = event.metaKey || event.ctrlKey;
            if (withModifier && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                openPalette();
                return;
            }
            if (event.key === '/' && !withModifier && !isTypingTarget(event.target)) {
                event.preventDefault();
                openPalette();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [openPalette]);

    // Hold the page still behind the overlay, restoring whatever overflow the
    // document already had rather than assuming it was the default.
    useEffect(() => {
        if (!open) {
            return;
        }
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const moveSelection = useCallback(
        (delta: number) => {
            setActiveIndex((current) => {
                if (results.length === 0) {
                    return 0;
                }
                return (current + delta + results.length) % results.length;
            });
        },
        [results.length]
    );

    return {
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
        hasQuery: trimmed.length > 0
    };
}
