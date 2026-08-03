import { getFeedData, renderRssFeed } from '@/lib/feed';

// The corpus is files on disk, so the feed only changes on deploy.
export const dynamic = 'force-static';

export async function GET() {
    const body = renderRssFeed(await getFeedData());
    return new Response(body, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
    });
}
