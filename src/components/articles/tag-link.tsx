import Tag from '@/components/common/tag';
import { cn } from '@/utils/cn';
import Link from 'next/link';

/**
 * A tag pill that filters the article index.
 *
 * Every tag shown anywhere on the site should lead somewhere: a chip that looks
 * like a control and does nothing when pressed is worse than plain text. The
 * index reads `?tag=` and filters server-side, so the destination is a real,
 * linkable, crawlable page rather than client state.
 */
export default function TagLink({ tag, className }: { tag: string; className?: string }) {
    return (
        <Tag className={cn('text-foreground/70 px-3 py-1 text-xs', className)}>
            <Link
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                className="focus-ring hover:text-foreground block rounded-full transition-colors">
                {tag}
            </Link>
        </Tag>
    );
}
