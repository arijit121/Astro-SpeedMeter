import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
    const CHUNK_SIZE = 1024 * 256;  // 256 KB
    const TOTAL_CHUNKS = 40;        // ~10 MB
    let count = 0;
    let closed = false;             // prevent double enqueue
    let timer: NodeJS.Timeout | null = null;

    const stream = new ReadableStream({
        start(controller) {
            function push() {
                // If already closed → do nothing
                if (closed) return;

                if (count >= TOTAL_CHUNKS) {
                    closed = true;
                    controller.close();
                    return;
                }

                controller.enqueue(new Uint8Array(CHUNK_SIZE));
                count++;

                timer = setTimeout(push, 5);
            }

            push();
        },

        cancel() {
            // If browser cancels early
            closed = true;
            if (timer) clearTimeout(timer);
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": 'attachment; filename="speed-test.bin"',
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    });
};
