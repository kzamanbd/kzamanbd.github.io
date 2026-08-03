import { parseArticleDate } from '@/utils/article-date';

/**
 * Format an ISO date (`YYYY-MM-DD`) as a short, human-readable label. Formatted
 * in UTC to match the UTC parse, so the label always reads back the authored
 * date: formatting a UTC-midnight instant in the viewer's zone would show the
 * previous day west of UTC, and would disagree between the prerender and the
 * hydration of a card that renders on both sides.
 */
export function formatArticleDate(iso: string): string {
    const parsed = parseArticleDate(iso);
    if (!parsed) return '';
    return parsed.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    });
}
