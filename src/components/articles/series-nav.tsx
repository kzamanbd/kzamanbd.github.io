import type { ArticleSeries } from '@/lib/posts';
import { cn } from '@/utils/cn';
import Link from 'next/link';

/** The full reading order of a multi-part series, with the current part marked. */
export default function SeriesNav({ series }: { series: ArticleSeries }) {
    return (
        <nav
            aria-label={`${series.name} series`}
            className="border-foreground/10 bg-background/40 rounded-2xl border p-6 backdrop-blur-sm">
            <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                Series: {series.name}
            </h2>
            <ol className="mt-3 space-y-2 text-sm">
                {series.parts.map((part) => (
                    <li key={part.slug} className="flex gap-2">
                        <span className="text-foreground/50 tabular-nums">{part.order}.</span>
                        {part.isCurrent ? (
                            <span aria-current="page" className="text-foreground font-semibold">
                                {part.title}
                            </span>
                        ) : (
                            <Link
                                href={`/articles/${part.slug}`}
                                className={cn(
                                    'focus-ring text-foreground/70 hover:text-foreground rounded-sm transition-colors'
                                )}>
                                {part.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
