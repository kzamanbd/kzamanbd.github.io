import { getFeedData, renderAtomFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export async function GET() {
    const body = renderAtomFeed(await getFeedData());
    return new Response(body, {
        headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' }
    });
}
