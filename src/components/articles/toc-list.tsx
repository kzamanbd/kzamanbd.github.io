import type { TocItem } from '@/lib/markdown';
import { cn } from '@/utils/cn';

interface TocListProps {
    items: TocItem[];
    activeId: string | null;
    /** Fired after a link is followed, so the mobile disclosure can close itself. */
    onNavigate?: () => void;
}

/**
 * The heading links themselves, shared by the sticky desktop aside and the
 * mobile disclosure so the two can never drift apart in indentation, active
 * styling or the `data-toc-id` hook that the scroll-into-view helper reads.
 */
export default function TocList({ items, activeId, onNavigate }: TocListProps) {
    return (
        <ul className="space-y-1 text-sm">
            {items.map((item) => (
                <li
                    key={item.id}
                    data-toc-id={item.id}
                    className={item.level === 3 ? 'pl-4' : undefined}>
                    <a
                        href={`#${item.id}`}
                        onClick={onNavigate}
                        aria-current={activeId === item.id ? 'location' : undefined}
                        className={cn(
                            'focus-ring block rounded-sm py-1 transition-colors',
                            activeId === item.id
                                ? 'text-foreground font-semibold'
                                : 'text-foreground/60 hover:text-foreground'
                        )}>
                        {item.text}
                    </a>
                </li>
            ))}
        </ul>
    );
}
