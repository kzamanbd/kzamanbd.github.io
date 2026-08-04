import SpotlightBorder from '@/components/common/spotlight-border';
import SpotlightGroup from '@/components/common/spotlight-group';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import type { ArticleSummary } from '@/lib/posts';
import { cn } from '@/utils/cn';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './article-pager.module.css';

type Direction = 'previous' | 'next';

interface PagerLinkProps {
    article: ArticleSummary;
    direction: Direction;
}

/**
 * One end of the pager. Tinted by the destination article's own cover gradient,
 * so hovering "Next" previews the accent of the page it leads to.
 */
function PagerLink({ article, direction }: PagerLinkProps) {
    const isNext = direction === 'next';

    return (
        <Link
            {...spotlightSurfaceProps}
            href={`/articles/${article.slug}`}
            style={{ '--brand-color': article.coverColors[0] } as React.CSSProperties}
            className={cn(
                styles.card,
                'focus-ring border-foreground/10 hover:border-foreground/25 group flex items-center gap-4 rounded-xl border p-5 transition-colors',
                isNext && 'text-right sm:col-start-2'
            )}>
            {!isNext && (
                <ArrowLeft
                    aria-hidden="true"
                    className={cn(
                        styles.arrow,
                        styles.arrowPrev,
                        'text-foreground/40 size-5 shrink-0'
                    )}
                />
            )}

            <span className={cn('min-w-0 flex-1', isNext && 'order-first')}>
                <span className="text-foreground/50 text-xs tracking-wide uppercase">
                    {isNext ? 'Next' : 'Previous'}
                </span>
                <span className="text-foreground group-hover:text-foreground mt-1 block font-semibold text-balance">
                    {article.title}
                </span>
                <span className="text-foreground/55 mt-1 line-clamp-2 block text-sm">
                    {article.description}
                </span>
            </span>

            {isNext && (
                <ArrowRight
                    aria-hidden="true"
                    className={cn(
                        styles.arrow,
                        styles.arrowNext,
                        'text-foreground/40 size-5 shrink-0'
                    )}
                />
            )}

            <SpotlightBorder className={styles.border} />
        </Link>
    );
}

interface ArticlePagerProps {
    previous?: ArticleSummary;
    next?: ArticleSummary;
}

/**
 * Where to read next, in publication order. Rendered as a two-column nav so a
 * reader who has finished a post never has to go back to the index; either side
 * can be absent at the ends of the archive, and the survivor keeps its column.
 */
export default function ArticlePager({ previous, next }: ArticlePagerProps) {
    if (!previous && !next) return null;

    return (
        <nav aria-label="Adjacent articles" className="border-foreground/10 border-t pt-8">
            <SpotlightGroup className="grid gap-4 sm:grid-cols-2">
                {previous && <PagerLink article={previous} direction="previous" />}
                {next && <PagerLink article={next} direction="next" />}
            </SpotlightGroup>
        </nav>
    );
}
