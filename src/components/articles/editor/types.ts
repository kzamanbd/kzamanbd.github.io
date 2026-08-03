import type { ArticleFrontmatter } from '@/lib/article-schema';

/** A whole article as the editor holds it: structured frontmatter plus body. */
export interface ArticleDraft {
    frontmatter: ArticleFrontmatter;
    body: string;
}

/** One saved file in the Open list. */
export interface ArticleListItem {
    file: string;
    slug: string;
    title: string;
    date: string;
    draft: boolean;
}

/** Values already used across the corpus, offered as autocomplete. */
export interface EditorSuggestions {
    tags: string[];
    tech: string[];
    categories: string[];
    series: string[];
}

/**
 * The filesystem operations, handed to the editor as props rather than imported
 * by it: the editor lives in `src/components/`, which must never reach into
 * `src/app/`. Server Action references are serialisable, so they cross the
 * boundary as ordinary props.
 */
export interface EditorActions {
    listArticles: () => Promise<ArticleListItem[]>;
    loadArticle: (file: string) => Promise<ArticleDraft>;
    saveArticle: (draft: ArticleDraft, slug: string) => Promise<{ file: string }>;
    deleteArticle: (slug: string) => Promise<{ file: string } | null>;
    getSuggestions: () => Promise<EditorSuggestions>;
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';
