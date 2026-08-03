import type { ArticleSummary } from '@/lib/posts';

export interface ArticleSearchResult {
    article: ArticleSummary;
    score: number;
}

function normalize(text: string): string {
    return text.toLowerCase().trim();
}

/** Split a query into its lowercase search terms (whitespace-separated). */
export function searchTerms(query: string): string[] {
    return normalize(query).split(/\s+/).filter(Boolean);
}

/**
 * Ranks articles against a free-text query, matching the title and tags (the
 * description is a weaker, secondary signal). Every term must appear somewhere in
 * an article for it to match (AND semantics), so adding words narrows results.
 * Scoring floats title and exact-tag hits above incidental description matches;
 * ties fall back to recency, mirroring the default article ordering.
 */
export function searchArticles(articles: ArticleSummary[], query: string): ArticleSearchResult[] {
    const terms = searchTerms(query);
    if (terms.length === 0) return [];

    const results: ArticleSearchResult[] = [];
    for (const article of articles) {
        const title = normalize(article.title);
        const tags = article.tags.map(normalize);
        const description = normalize(article.description);

        let score = 0;
        let matchesEveryTerm = true;
        for (const term of terms) {
            const inTitle = title.includes(term);
            const exactTag = tags.some((tag) => tag === term);
            const inTag = exactTag || tags.some((tag) => tag.includes(term));
            const inDescription = description.includes(term);

            if (!inTitle && !inTag && !inDescription) {
                matchesEveryTerm = false;
                break;
            }

            if (title === term) score += 100;
            else if (title.startsWith(term)) score += 40;
            else if (inTitle) score += 20;

            if (exactTag) score += 30;
            else if (inTag) score += 12;

            if (inDescription) score += 4;
        }

        if (matchesEveryTerm) results.push({ article, score });
    }

    return results.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.article.date < b.article.date ? 1 : -1;
    });
}
