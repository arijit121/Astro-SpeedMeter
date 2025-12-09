
import type { APIRoute } from 'astro';

export const HEAD: APIRoute = async () => {
    return new Response(null, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
    });
}
