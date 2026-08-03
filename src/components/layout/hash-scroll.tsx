'use client';

import { useHashScroll } from '@/components/layout/hooks/use-hash-scroll';

/**
 * Renders nothing; ensures a direct visit to a URL with a fragment (e.g.
 * /#about) reliably lands on that section despite smooth scrolling.
 */
export default function HashScroll() {
    useHashScroll();
    return null;
}
