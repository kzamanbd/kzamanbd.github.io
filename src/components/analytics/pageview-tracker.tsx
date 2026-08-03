'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Matches an article detail route (`/articles/<slug>`), capturing the slug. */
const articleDetailPattern = /^\/articles\/([^/]+)$/;

/** Segments under `/articles/` that are routes, not article slugs. */
const reservedArticleSegments = new Set(['search']);

/**
 * Renders nothing. Pushes a `page_view` GTM event on initial load and on every
 * client-side route change, plus a distinct `article_view` when the route is an
 * article detail page. Path-level only, no query string. GTM exists only in
 * production, so mount this behind the same production gate.
 */
export default function PageviewTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const pageTitle = document.title;

        sendGTMEvent({
            event: 'page_view',
            page_path: pathname,
            page_title: pageTitle
        });

        const articleSlug = pathname.match(articleDetailPattern)?.[1];
        if (articleSlug && !reservedArticleSegments.has(articleSlug)) {
            sendGTMEvent({
                event: 'article_view',
                article_slug: articleSlug,
                article_title: pageTitle
            });
        }
    }, [pathname]);

    return null;
}
