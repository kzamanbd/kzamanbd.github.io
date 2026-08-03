'use client';

import type { ArticleSummary } from '@/lib/posts';
import { useEffect, useState } from 'react';

// The archive only changes on deploy, so one fetch per page load is enough. The
// promise is module-level, so a reader who opens and closes the palette several
// times still triggers a single request, and two palettes on one page share it.
let corpusPromise: Promise<ArticleSummary[]> | null = null;

function loadCorpus(): Promise<ArticleSummary[]> {
    corpusPromise ??= fetch('/api/articles')
        .then((response) => (response.ok ? response.json() : []))
        .catch(() => {
            // Let a failed load be retried the next time the palette opens
            // rather than caching the failure for the session.
            corpusPromise = null;
            return [];
        });

    return corpusPromise;
}

/**
 * The article corpus for the search palette, fetched the first time the palette
 * is opened (`active`) rather than shipped with every page. Returns an empty
 * list until it lands, so the palette can render its empty state immediately.
 */
export function useArticleCorpus(active: boolean): {
    articles: ArticleSummary[];
    loading: boolean;
} {
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!active || articles.length > 0) {
            return;
        }

        let cancelled = false;
        setLoading(true);

        void loadCorpus().then((loaded) => {
            if (cancelled) {
                return;
            }
            setArticles(loaded);
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [active, articles.length]);

    return { articles, loading };
}
