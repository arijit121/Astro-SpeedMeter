
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const reader = request.body?.getReader();
        if (reader) {
            while (true) {
                const { done } = await reader.read();
                if (done) break;
            }
        }
        return new Response(JSON.stringify({ status: 'ok' }));
    } catch (e) {
        return new Response(JSON.stringify({ status: 'error' }), { status: 500 });
    }
}
