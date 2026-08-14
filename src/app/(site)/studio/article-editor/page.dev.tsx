import {
    deleteArticle,
    getSuggestions,
    listArticles,
    loadArticle,
    saveArticle
} from '@/app/(site)/studio/article-editor/actions.dev';
import ArticleEditor from '@/components/articles/editor';
import type { EditorActions } from '@/components/articles/editor/types';
import type { Metadata } from 'next';

// A development-only route: `.dev.tsx` counts as a page only when
// `pageExtensions` includes it, which next.config.ts arranges outside
// production. Nothing here reaches the deployed site.
export const metadata: Metadata = {
    title: 'Article editor',
    robots: { index: false, follow: false }
};

// The filesystem operations are handed down as props rather than imported by the
// editor: `src/components/` must never reach into `src/app/`. Server Action
// references are serialisable, so they cross the boundary as ordinary props.
const editorActions: EditorActions = {
    listArticles,
    loadArticle,
    saveArticle,
    deleteArticle,
    getSuggestions
};

export default async function ArticleEditorPage() {
    const [existing, suggestions] = await Promise.all([listArticles(), getSuggestions()]);

    return <ArticleEditor actions={editorActions} existing={existing} suggestions={suggestions} />;
}
