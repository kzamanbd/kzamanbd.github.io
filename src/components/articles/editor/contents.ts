import type { ArticleDraft } from '@/components/articles/editor/types';
import { DIFFICULTIES } from '@/lib/article-schema';

export const difficultyOptions = DIFFICULTIES;

/** Today as `YYYY-MM-DD`, the format the frontmatter contract requires. */
export function todayIsoDate(): string {
    return new Date().toISOString().slice(0, 10);
}

/** A blank article, dated today so a new file is publishable as written. */
export function createEmptyDraft(): ArticleDraft {
    return {
        frontmatter: {
            title: '',
            description: '',
            date: todayIsoDate(),
            tags: [],
            tech: [],
            learn: [],
            draft: true
        },
        body: ''
    };
}

export const bodyPlaceholder = `Write the article here.

## A heading

Body copy, with **bold**, \`inline code\` and [links](/articles).`;
