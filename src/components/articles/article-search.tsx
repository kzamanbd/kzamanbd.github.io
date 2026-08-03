'use client';

import ArticleCard from '@/components/articles/article-card';
import SpotlightList from '@/components/common/spotlight-list';
import type { ArticleSummary } from '@/lib/posts';
import { searchArticles } from '@/utils/search-articles';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

/**
 * Client-side search over the whole corpus. The article summaries are serialised
 * into the page by the server, so filtering needs no request and no index: the
 * archive is small enough that ranking it on every keystroke is free.
 */
export default function ArticleSearch({ articles }: { articles: ArticleSummary[] }) {
    const [query, setQuery] = useState('');
    const trimmed = query.trim();

    const results = useMemo(
        () => (trimmed ? searchArticles(articles, trimmed) : []),
        [articles, trimmed]
    );

    return (
        <div>
            <label htmlFor="article-search" className="sr-only">
                Search articles
            </label>
            <div className="relative">
                <Search
                    aria-hidden="true"
                    className="text-foreground/40 pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
                />
                <input
                    id="article-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by title, tag or description"
                    autoComplete="off"
                    className="focus-ring border-foreground/15 bg-background/50 text-foreground placeholder:text-foreground/40 w-full rounded-full border py-3 pr-4 pl-11 backdrop-blur-sm"
                />
            </div>

            <p aria-live="polite" className="text-foreground/60 mt-4 text-sm">
                {!trimmed
                    ? `${articles.length} article${articles.length === 1 ? '' : 's'} published.`
                    : `${results.length} match${results.length === 1 ? '' : 'es'} for "${trimmed}".`}
            </p>

            {results.length > 0 && (
                <SpotlightList className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map(({ article }) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </SpotlightList>
            )}
        </div>
    );
}
