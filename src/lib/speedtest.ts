
export interface SpeedTestResult {
    ping: number;
    download: number;
    upload: number;
    jitter: number;
}

export type TestStatus = 'idle' | 'ping' | 'download' | 'upload' | 'done' | 'aborted' | 'error';

export class SpeedTest {
    private worker: Worker;
    private callbacks: {
        onStatus?: (status: TestStatus) => void;
        onPing?: (ping: number) => void;
        onDownload?: (speed: number, progress: number) => void;
        onUpload?: (speed: number, progress: number) => void;
        onError?: (error: string) => void;
    } = {};

    constructor() {
        this.worker = new Worker(new URL('../workers/speedtest.worker.ts', import.meta.url), { type: 'module' });
        this.worker.onmessage = this.handleMessage.bind(this);
    }

    onStatus(cb: (status: TestStatus) => void) { this.callbacks.onStatus = cb; return this; }
    onPing(cb: (ping: number) => void) { this.callbacks.onPing = cb; return this; }
    onDownload(cb: (speed: number, progress: number) => void) { this.callbacks.onDownload = cb; return this; }
    onUpload(cb: (speed: number, progress: number) => void) { this.callbacks.onUpload = cb; return this; }
    onError(cb: (error: string) => void) { this.callbacks.onError = cb; return this; }

    start() {
        // In endpoints, we'll create simple API routes
        const config = {
            dlEndpoint: '/api/test/download',
            ulEndpoint: '/api/test/upload',
            pingEndpoint: '/api/test/head' // Just HEAD request
        };
        this.worker.postMessage({ type: 'start', config });
    }

    abort() {
        this.worker.postMessage({ type: 'abort' });
    }

    private handleMessage(e: MessageEvent) {
        const { type, value, status, error, progress } = e.data;

        switch (type) {
            case 'status':
                this.callbacks.onStatus?.(status);
                break;
            case 'ping':
                this.callbacks.onPing?.(value);
                break;
            case 'download':
                this.callbacks.onDownload?.(value, progress || 0);
                break;
            case 'upload':
                this.callbacks.onUpload?.(value, progress || 0);
                break;
            case 'error':
                this.callbacks.onError?.(error);
                break;
        }
    }
}
