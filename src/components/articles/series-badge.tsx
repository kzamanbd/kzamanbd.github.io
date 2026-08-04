import type { ArticleSeries } from '@/lib/article-schema';
import { cn } from '@/utils/cn';

/**
 * An article's place in a multi-part series, as it appears in a byline.
 *
 * Deliberately plain text rather than a pill: it sits in a line of dot-separated
 * metadata, and a bordered chip there would read as a control the reader could
 * press. The full part list lives in `SeriesNav` on the article page; this is
 * only the "you are here".
 */
export default function SeriesBadge({
    series,
    className
}: {
    series: ArticleSeries;
    className?: string;
}) {
    return (
        <span className={cn('font-medium', className)}>
            {series.name} &middot; Part {series.order}
        </span>
    );
}
