import DifficultyBadge from '@/components/articles/difficulty-badge';
import SeriesBadge from '@/components/articles/series-badge';
import type { ArticleSummary } from '@/lib/posts';
import { cn } from '@/utils/cn';
import { formatArticleDate } from '@/utils/format-date';
import type { ReactNode } from 'react';

/**
 * The dot-separated byline under an article title: when it was published, how
 * long it takes to read, and any of difficulty, series or last-updated that the
 * article declares.
 *
 * Shared by the listing card and the article header so the two can never
 * disagree about what a post's metadata says or how it is punctuated. The card
 * asks for the compact set; the header shows everything.
 */
export default function ArticleMeta({
    article,
    variant = 'full',
    className
}: {
    article: ArticleSummary;
    /** `compact` drops difficulty and the updated date, for a dense card. */
    variant?: 'full' | 'compact';
    className?: string;
}) {
    const isFull = variant === 'full';

    const parts: ReactNode[] = [
        <time key="date" dateTime={article.date}>
            {formatArticleDate(article.date)}
        </time>,
        <span key="reading">{article.readingMinutes} min read</span>
    ];

    if (isFull && article.difficulty) {
        parts.push(<DifficultyBadge key="difficulty" difficulty={article.difficulty} />);
    }

    if (article.series) {
        parts.push(<SeriesBadge key="series" series={article.series} />);
    }

    if (isFull && article.updated) {
        parts.push(<span key="updated">Updated {formatArticleDate(article.updated)}</span>);
    }

    return (
        <div
            className={cn(
                'text-foreground/60 flex flex-wrap items-center gap-x-2 gap-y-1',
                isFull ? 'gap-x-3 text-sm' : 'text-xs',
                className
            )}>
            {parts.map((part, index) => (
                // A fragment keyed by position: the separator belongs to the gap
                // between two parts, not to either one of them.
                <span key={index} className="flex items-center gap-x-2">
                    {index > 0 && (
                        <span aria-hidden="true" className="text-foreground/40">
                            &middot;
                        </span>
                    )}
                    {part}
                </span>
            ))}
        </div>
    );
}
