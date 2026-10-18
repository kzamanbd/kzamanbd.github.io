import { getFeedData, renderAtomFeed } from '@/services/feed';

export const dynamic = 'force-static';

export async function GET() {
    const body = renderAtomFeed(await getFeedData());
    return new Response(body, {
        headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' }
    });
}
