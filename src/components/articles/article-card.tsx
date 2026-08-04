import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Tag from '@/components/common/tag';
import ArticleCover from '@/components/articles/article-cover';
import ArticleMeta from '@/components/articles/article-meta';
import DifficultyBadge from '@/components/articles/difficulty-badge';
import styles from '@/components/common/glow-card.module.css';
import type { ArticleSummary } from '@/lib/posts';
import { cn } from '@/utils/cn';
import Link from 'next/link';

/**
 * One article in a listing. Server-rendered: the pointer tracking that lights the
 * card comes from the SpotlightList wrapping the grid, and the accent is the
 * article's own cover colour so the card and its thumbnail agree.
 */
export default function ArticleCard({
    article,
    priority = false
}: {
    article: ArticleSummary;
    priority?: boolean;
}) {
    const [accent] = article.coverColors;

    return (
        <li
            {...spotlightSurfaceProps}
            style={{ '--brand-color': accent } as React.CSSProperties}
            className={cn(
                styles.card,
                'border-foreground/10 bg-background/40 overflow-hidden rounded-2xl border backdrop-blur-sm'
            )}>
            <Link href={`/articles/${article.slug}`} className="focus-ring block rounded-2xl">
                <ArticleCover
                    slug={article.slug}
                    title={article.title}
                    tag={article.tags[0]}
                    cover={article.cover}
                    colors={article.coverColors}
                    priority={priority}
                />

                <div className="p-5">
                    <ArticleMeta article={article} variant="compact" />

                    <h3 className="text-foreground mt-2 text-lg font-semibold text-balance">
                        {article.title}
                    </h3>

                    <p className="text-foreground/70 mt-2 line-clamp-3 text-sm leading-relaxed">
                        {article.description}
                    </p>

                    {(article.tags.length > 0 || article.difficulty) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {article.difficulty && (
                                <DifficultyBadge difficulty={article.difficulty} />
                            )}
                            <ul className="flex flex-wrap gap-2">
                                {article.tags.slice(0, 4).map((tag) => (
                                    <Tag
                                        key={tag}
                                        className="text-foreground/70 px-2.5 py-0.5 text-xs">
                                        {tag}
                                    </Tag>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Link>
            <SpotlightBorder className={styles.border} />
        </li>
    );
}
