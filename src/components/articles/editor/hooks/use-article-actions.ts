'use client';

import type {
    ArticleDraft,
    ArticleListItem,
    EditorActions,
    EditorSuggestions,
    SaveState
} from '@/components/articles/editor/types';
import { useCallback, useState } from 'react';

/**
 * Wraps the filesystem Server Actions with the state the UI needs around them:
 * the current file list, the autocomplete suggestions, and a save state that
 * reports failures instead of letting a rejected write look like a success.
 *
 * Every mutation refreshes the list and the suggestions, so a newly saved
 * article is immediately openable and its tags are offered to the next one.
 */
export function useArticleActions(
    actions: EditorActions,
    initialArticles: ArticleListItem[],
    initialSuggestions: EditorSuggestions
) {
    const [articles, setArticles] = useState(initialArticles);
    const [suggestions, setSuggestions] = useState(initialSuggestions);
    const [saveState, setSaveState] = useState<SaveState>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        const [nextArticles, nextSuggestions] = await Promise.all([
            actions.listArticles(),
            actions.getSuggestions()
        ]);
        setArticles(nextArticles);
        setSuggestions(nextSuggestions);
    }, [actions]);

    const save = useCallback(
        async (draft: ArticleDraft, slug: string) => {
            setSaveState('saving');
            setErrorMessage(null);
            try {
                const result = await actions.saveArticle(draft, slug);
                await refresh();
                setSaveState('saved');
                return result;
            } catch (error) {
                setSaveState('error');
                setErrorMessage(error instanceof Error ? error.message : 'Could not save.');
                return null;
            }
        },
        [actions, refresh]
    );

    const open = useCallback((file: string) => actions.loadArticle(file), [actions]);

    const remove = useCallback(
        async (slug: string) => {
            try {
                const result = await actions.deleteArticle(slug);
                await refresh();
                return result;
            } catch (error) {
                setSaveState('error');
                setErrorMessage(error instanceof Error ? error.message : 'Could not delete.');
                return null;
            }
        },
        [actions, refresh]
    );

    return { articles, suggestions, saveState, errorMessage, save, open, remove };
}
