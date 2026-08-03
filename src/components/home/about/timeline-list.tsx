import type { TimelineEntry } from '@/components/home/about/contents';

/** A titled run of dated entries: the experience and education columns. */
export default function TimelineList({
    title,
    entries
}: {
    title: string;
    entries: TimelineEntry[];
}) {
    return (
        <div>
            <h3 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                {title}
            </h3>
            <ul className="mt-4 space-y-4">
                {entries.map((entry) => (
                    <li key={`${entry.organization}-${entry.period}`}>
                        <p className="text-foreground font-semibold">{entry.role}</p>
                        <p className="text-foreground/60 text-sm">
                            {entry.organization} &middot; {entry.period}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
