import { useMemo } from 'react';
import type { CSSProperties } from 'react';

function halton(index: number, base: number) {
    let result = 0;
    let f = 1 / base;
    let i = index;
    while (i > 0) {
        result += f * (i % base);
        i = Math.floor(i / base);
        f /= base;
    }
    return result;
}

export default function Fireflies() {
    const fireflies = useMemo((): Array<{ key: number; style: CSSProperties }> => {
        const count = 70;
        return Array.from({ length: count }).map((_, idx) => {
            const i = idx + 1;
            const x = halton(i, 2);
            const y = halton(i, 3);
            const s = 0.55 + halton(i, 5) * 0.75;
            const blur = 6 + Math.round(halton(i, 11) * 14);
            const duration = 3 + halton(i, 7) * 4;
            const delay = halton(i, 13) * 5;
            return {
                key: idx,
                style: {
                    left: `${x * 100}%`,
                    top: `${y * 100}%`,
                    transform: `translate(-50%, -50%) scale(${s})`,
                    filter: `blur(${blur / 10}px)`,
                    animationDuration: `${duration}s`,
                    animationDelay: `-${delay}s`,
                },
            };
        });
    }, []);

    return (
        <div className="fireflies" aria-hidden="true">
            {fireflies.map((f) => (
                <span key={f.key} className="firefly" style={f.style} />
            ))}
        </div>
    );
}
