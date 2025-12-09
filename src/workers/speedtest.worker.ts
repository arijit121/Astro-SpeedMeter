
// Speed Test Worker
const CONCURRENCY = 6; // Number of parallel connections
const UPLOAD_SIZE = 20 * 1024 * 1024; // 20MB chunk for upload

type TestState = 'idle' | 'ping' | 'download' | 'upload';

interface TestConfig {
    dlEndpoint: string;
    ulEndpoint: string;
    pingEndpoint: string; // or use dlEndpoint with HEAD
}

let state: TestState = 'idle';
let abortController: AbortController | null = null;

self.onmessage = async (e) => {
    const { type, config } = e.data;

    if (type === 'start') {
        runTest(config);
    } else if (type === 'abort') {
        abortController?.abort();
        state = 'idle';
        self.postMessage({ type: 'status', status: 'aborted' });
    }
};

async function runTest(config: TestConfig) {
    state = 'ping';
    abortController = new AbortController();
    const signal = abortController.signal;

    try {
        // 1. Ping Test
        self.postMessage({ type: 'status', status: 'ping' });
        const ping = await measurePing(config.pingEndpoint, signal);
        self.postMessage({ type: 'ping', value: ping });

        // 2. Download Test
        state = 'download';
        self.postMessage({ type: 'status', status: 'download' });
        await measureDownload(config.dlEndpoint, signal);

        // 3. Upload Test
        state = 'upload';
        self.postMessage({ type: 'status', status: 'upload' });
        await measureUpload(config.ulEndpoint, signal);

        // 4. Done
        state = 'idle';
        self.postMessage({ type: 'status', status: 'done' });

    } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error(err);
        self.postMessage({ type: 'error', error: err.message });
        state = 'idle';
    }
}

async function measurePing(url: string, signal: AbortSignal): Promise<number> {
    const pings: number[] = [];
    for (let i = 0; i < 10; i++) {
        const start = performance.now();
        await fetch(url, { method: 'HEAD', signal, cache: 'no-store' });
        const end = performance.now();
        pings.push(end - start);
        await new Promise(r => setTimeout(r, 100)); // slight delay
    }
    // Return minimum ping (closest to actual network latency)
    return Math.min(...pings);
}

async function measureDownload(url: string, signal: AbortSignal) {
    const start = performance.now();
    let loaded = 0;
    const duration = 10000; // 10 seconds test
    const workers = [];

    // Progressive tracking
    const updateStats = () => {
        const now = performance.now();
        const diff = (now - start) / 1000;
        if (diff <= 0) return;
        const bps = (loaded * 8) / diff;
        const mbps = bps / 1000000;
        self.postMessage({ type: 'download', value: mbps, progress: Math.min(diff / (duration / 1000), 1) });
    };

    // Parallel streams
    for (let i = 0; i < CONCURRENCY; i++) {
        workers.push((async () => {
            while (performance.now() - start < duration) {
                try {
                    const response = await fetch(`${url}?t=${Date.now()}-${i}`, { signal, cache: 'no-store' });
                    const reader = response.body?.getReader();
                    if (!reader) break;

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        loaded += value.length;
                        updateStats(); // Update frequently
                        if (performance.now() - start > duration) {
                            reader.cancel();
                            break;
                        }
                    }
                } catch (e: any) {
                    if (e.name === 'AbortError') throw e;
                    // Ignore transient errors
                }
            }
        })());
    }

    await Promise.all(workers);
    updateStats(); // Final
}

async function measureUpload(url: string, signal: AbortSignal) {
    const start = performance.now();
    let uploaded = 0;
    const duration = 10000; // 10 seconds test
    const workers = [];

    // Generate random chunk once
    const chunk = new Uint8Array(2 * 1024 * 1024); // 2MB chunk
    for (let i = 0; i < chunk.length; i++) chunk[i] = Math.random() * 255;

    const updateStats = () => {
        const now = performance.now();
        const diff = (now - start) / 1000;
        if (diff <= 0) return;
        const bps = (uploaded * 8) / diff;
        const mbps = bps / 1000000;
        self.postMessage({ type: 'upload', value: mbps, progress: Math.min(diff / (duration / 1000), 1) });
    };

    for (let i = 0; i < CONCURRENCY; i++) {
        workers.push((async () => {
            while (performance.now() - start < duration) {
                try {
                    // We use XHR for upload progress if supported, but fetch is easier. 
                    // To measure upload speed with fetch, we can only measure when request completes unfortunately (in most browsers).
                    // Or we can use many small requests.
                    // For accuracy, XHR with progress event is better.
                    // Let's use XHR for upload.

                    await new Promise<void>((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('POST', `${url}?t=${Date.now()}-${i}`);

                        // We count uploaded bytes on progress or load
                        let lastLoaded = 0;
                        xhr.upload.onprogress = (e) => {
                            if (e.lengthComputable) {
                                const incr = e.loaded - lastLoaded;
                                uploaded += incr;
                                lastLoaded = e.loaded;
                                updateStats();
                            }
                        };
                        xhr.onload = () => resolve();
                        xhr.onerror = () => reject();
                        xhr.onabort = () => reject(new Error('AbortError'));

                        // Pass signal
                        signal.addEventListener('abort', () => xhr.abort());

                        xhr.send(chunk);
                    });

                    if (performance.now() - start > duration) break;

                } catch (e: any) {
                    if (e.message === 'AbortError' || signal.aborted) throw new Error('AbortError');
                }
            }
        })());
    }

    await Promise.all(workers);
    updateStats();
}
