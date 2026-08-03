import { cn } from '@/utils/cn';
import Link from 'next/link';

interface TagFilterProps {
    tags: string[];
    /** The tag currently filtering the list, or null for "All". */
    activeTag: string | null;
}

/**
 * The tag rail above the article list. Each tag is a plain link that sets the
 * `tag` query parameter, so filtering works without JavaScript, survives a
 * refresh, and can be linked to or shared.
 */
export default function TagFilter({ tags, activeTag }: TagFilterProps) {
    if (tags.length === 0) {
        return null;
    }

    const pillClassName = (active: boolean) =>
        cn(
            'focus-ring block rounded-full border px-3 py-1 text-sm transition-colors',
            active
                ? 'border-foreground/30 bg-foreground/10 text-foreground font-semibold'
                : 'border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground'
        );

    return (
        <ul className="flex flex-wrap gap-2">
            <li>
                <Link href="/articles" className={pillClassName(activeTag === null)}>
                    All
                </Link>
            </li>
            {tags.map((tag) => (
                <li key={tag}>
                    <Link
                        href={`/articles?tag=${encodeURIComponent(tag)}`}
                        aria-current={tag === activeTag ? 'page' : undefined}
                        className={pillClassName(tag === activeTag)}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
