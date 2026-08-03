import { getBuiltAt } from '@/lib/version';

// The client polls this to learn when a newer build (a strictly later builtAt)
// has been deployed. Static: the value is fixed for the lifetime of a build.
export const dynamic = 'force-static';

export function GET() {
    const body = JSON.stringify({ builtAt: getBuiltAt() });
    return new Response(body, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
}
