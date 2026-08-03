'use client';

import HighlightedText from '@/components/articles/search-palette/highlighted-text';
import type { ArticleSummary } from '@/lib/posts';
import { cn } from '@/utils/cn';
import { formatArticleDate } from '@/utils/format-date';
import Link from 'next/link';

interface SearchResultItemProps {
    article: ArticleSummary;
    query: string;
    active: boolean;
    onHover: () => void;
    onSelect: () => void;
}

/**
 * One ranked article in the palette. The whole row is a link, so a result can be
 * opened with the keyboard, clicked, or middle-clicked into a new tab; the
 * highlighted state is driven by the palette rather than by `:hover`, so the
 * pointer and the arrow keys agree on which row is current.
 */
export default function SearchResultItem({
    article,
    query,
    active,
    onHover,
    onSelect
}: SearchResultItemProps) {
    return (
        <li>
            <Link
                href={`/articles/${article.slug}`}
                onMouseMove={onHover}
                onClick={onSelect}
                aria-current={active ? 'true' : undefined}
                className={cn(
                    'focus-ring block rounded-xl px-4 py-3 transition-colors',
                    active ? 'bg-foreground/10' : 'hover:bg-foreground/5'
                )}>
                <p className="text-foreground font-medium">
                    <HighlightedText text={article.title} query={query} />
                </p>
                <p className="text-foreground/60 mt-1 line-clamp-2 text-sm">
                    <HighlightedText text={article.description} query={query} />
                </p>
                <p className="text-foreground/45 mt-1.5 flex flex-wrap items-center gap-x-2 text-xs">
                    <span>{formatArticleDate(article.date)}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{article.readingMinutes} min read</span>
                    {article.tags.length > 0 && (
                        <>
                            <span aria-hidden="true">&middot;</span>
                            <span>{article.tags.slice(0, 3).join(', ')}</span>
                        </>
                    )}
                </p>
            </Link>
        </li>
    );
}
