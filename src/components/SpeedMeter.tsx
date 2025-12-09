
import React, { useEffect, useState, useRef } from 'react';
import { SpeedTest, type TestStatus } from '../lib/speedtest';

export default function SpeedMeter() {
    const [status, setStatus] = useState<TestStatus>('idle');
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [ping, setPing] = useState(0);
    const [progress, setProgress] = useState(0);

    const speedTestRef = useRef<SpeedTest | null>(null);

    useEffect(() => {
        speedTestRef.current = new SpeedTest();
        const st = speedTestRef.current;

        st.onStatus(setStatus)
            .onPing(setPing)
            .onDownload((speed, prog) => {
                setDownloadSpeed(speed);
                setProgress(prog);
            })
            .onUpload((speed, prog) => {
                setUploadSpeed(speed);
                setProgress(prog);
            })
            .onError((err) => {
                console.error("Speed Test Error:", err);
                setStatus('error');
            });

        return () => {
            st.abort();
        };
    }, []);

    const startTest = () => {
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);
        setProgress(0);
        speedTestRef.current?.start();
    };

    const currentSpeed = status === 'upload' ? uploadSpeed : downloadSpeed;
    const gaugeValue = Math.min(currentSpeed, 100) / 100; // Assume 100Mbps max for gauge visual roughly, or dynamic
    // Dynamic scale: 0-10, 10-100, 100-1000? 
    // Let's just use log scale or simple linear cap for visual.
    // 0-100 scale for visual simplicity
    const rotation = -90 + (Math.min(currentSpeed, 1000) / 1000) * 180; // Map 0-1000 Mbps to -90 to 90 deg

    return (
        <div className="relative flex flex-col items-center justify-center p-2 w-full max-w-md mx-auto">
            {/* Gauge Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4">
                {/* Outer Ring Glow */}
                <div className="absolute inset-0 rounded-full border-4 border-[var(--color-dark)] shadow-[0_0_50px_var(--color-primary)] opacity-20"></div>

                {/* Main Gauge SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full transform overflow-visible">
                    {/* Background Arc */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" strokeLinecap="round" />

                    {/* Progress Arc */}
                    {/* We need to calculate dasharray for arc. Arc length = PI * R (semicircle). R=80 -> ~251 */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="251"
                        strokeDashoffset={251 - (251 * (Math.min(currentSpeed, 500) / 500))}
                        className="transition-[stroke-dashoffset] duration-300 ease-out"
                    />

                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--color-primary)" />
                            <stop offset="100%" stopColor="var(--color-secondary)" />
                        </linearGradient>
                    </defs>

                    {/* Needle (simplified as a center text mostly, but let's add a small marker) */}
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-10">
                    <span className="text-6xl md:text-7xl font-bold font-display tracking-tighter text-white drop-shadow-[0_0_10px_var(--color-primary)]">
                        {currentSpeed.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-400 mt-2 uppercase tracking-widest">Mbps</span>

                    <div className="mt-2 text-xs text-[var(--color-accent1)] font-bold uppercase tracking-widest animate-pulse">
                        {status === 'idle' ? 'Ready' : status}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 w-full mb-4">
                <StatBox label="Ping" value={ping.toFixed(0)} unit="ms" active={status === 'ping'} />
                <StatBox label="Download" value={downloadSpeed.toFixed(1)} unit="Mbps" active={status === 'download'} />
                <StatBox label="Upload" value={uploadSpeed.toFixed(1)} unit="Mbps" active={status === 'upload'} />
            </div>

            {/* Controls */}
            <div className="z-20">
                {status === 'idle' || status === 'done' || status === 'aborted' || status === 'error' ? (
                    <button
                        onClick={startTest}
                        className="bg-[var(--color-primary)] text-black font-bold font-display px-10 py-4 rounded-full text-xl hover:scale-105 transition-transform shadow-[0_0_30px_var(--color-primary)] cursor-pointer"
                    >
                        {status === 'done' ? 'TEST AGAIN' : 'START TEST'}
                    </button>
                ) : (
                    <button
                        onClick={() => speedTestRef.current?.abort()}
                        className="border border-[var(--color-accent1)] text-[var(--color-accent1)] font-bold px-8 py-3 rounded-full hover:bg-[var(--color-accent1)] hover:text-white transition-colors cursor-pointer"
                    >
                        STOP
                    </button>
                )}
            </div>

            {/* {status === 'done' && (
                <div className="mt-8 text-center text-gray-400 text-sm">
                    <a href="/results" className="underline hover:text-white">View Detailed Results &History</a>
                </div>
            )} */}
        </div>
    );
}

function StatBox({ label, value, unit, active }: { label: string, value: string, unit: string, active: boolean }) {
    return (
        <div className={`flex flex-col items-center p-4 rounded-xl transition-colors duration-300 ${active ? 'bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-transparent'}`}>
            <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</span>
            <span className={`text-2xl font-bold ${active ? 'text-neon text-[var(--color-accent2)]' : 'text-white'}`}>
                {value}
            </span>
            <span className="text-[10px] text-gray-600">{unit}</span>
        </div>
    )
}
