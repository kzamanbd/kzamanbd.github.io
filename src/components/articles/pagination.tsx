import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    /** Builds the href for a page number, so the caller keeps its own filters. */
    buildHref: (page: number) => string;
}

/**
 * Page links for the article index. Every page is a real link rather than
 * client state, so a page deep in the archive can be linked to, crawled, and
 * restored on refresh.
 */
export default function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const stepClassName =
        'focus-ring border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground flex size-9 items-center justify-center rounded-full border transition-colors';

    return (
        <nav aria-label="Article pages" className="mt-14 flex items-center justify-center gap-2">
            {currentPage > 1 && (
                <Link
                    href={buildHref(currentPage - 1)}
                    rel="prev"
                    aria-label="Previous page"
                    className={stepClassName}>
                    <ChevronLeft aria-hidden="true" className="size-4" />
                </Link>
            )}

            <ul className="flex items-center gap-2">
                {pages.map((page) => (
                    <li key={page}>
                        <Link
                            href={buildHref(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={cn(
                                'focus-ring flex size-9 items-center justify-center rounded-full border text-sm transition-colors',
                                page === currentPage
                                    ? 'border-foreground/30 bg-foreground/10 text-foreground font-semibold'
                                    : 'border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground'
                            )}>
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>

            {currentPage < totalPages && (
                <Link
                    href={buildHref(currentPage + 1)}
                    rel="next"
                    aria-label="Next page"
                    className={stepClassName}>
                    <ChevronRight aria-hidden="true" className="size-4" />
                </Link>
            )}
        </nav>
    );
}
