import { getAllArticles } from '@/lib/posts';
import { NextResponse } from 'next/server';

/**
 * The article summaries the command-palette search ranks over. It is a route
 * rather than props so the corpus is fetched once, on the first time a reader
 * opens the palette, instead of being serialised into every page of the site.
 *
 * The archive only changes on deploy, so the response is immutable for the life
 * of a build and can sit in the browser cache.
 */
export function GET() {
    return NextResponse.json(getAllArticles(), {
        headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' }
    });
}
