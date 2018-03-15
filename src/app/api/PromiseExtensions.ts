
const devMode = true;

export function delay(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}

export function randomDelay(minMs: number = 10, maxMs: number = 500): Promise<void> {
    const delayMs = devMode ? 0 : Math.random() * (maxMs - minMs) + minMs;
    return delay(delayMs);
}
