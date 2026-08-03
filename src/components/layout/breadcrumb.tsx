import type { BreadcrumbEntry } from '@/utils/article-json-ld';
import Link from 'next/link';

/**
 * The trail above an inner page's title. The last entry is the current page, so
 * it renders as plain text with `aria-current` rather than a link.
 */
export default function Breadcrumb({ trail }: { trail: BreadcrumbEntry[] }) {
    return (
        <nav aria-label="Breadcrumb">
            {/* Monospace, so the trail reads as a terminal path. The face only
                loads on routes that apply the JetBrains Mono variable; anywhere
                else this falls through to the generic monospace stack. */}
            <ol className="text-foreground/60 flex flex-wrap items-center gap-1.5 font-mono text-sm">
                {trail.map((entry, index) => {
                    const isLast = index === trail.length - 1;
                    return (
                        <li key={entry.href} className="flex items-center gap-1.5">
                            {isLast ? (
                                <span aria-current="page" className="text-foreground/80">
                                    {entry.label}
                                </span>
                            ) : (
                                <Link
                                    href={entry.href}
                                    className="focus-ring hover:text-foreground rounded-sm transition-colors">
                                    {entry.label}
                                </Link>
                            )}
                            {!isLast && <span aria-hidden="true">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
