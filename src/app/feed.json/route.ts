import { getFeedData, renderJsonFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export async function GET() {
    const body = renderJsonFeed(await getFeedData());
    return new Response(body, {
        headers: { 'Content-Type': 'application/feed+json; charset=utf-8' }
    });
}
