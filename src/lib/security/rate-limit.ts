import "server-only";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

/** Best-effort in-process limiter. Complements DB duplicate checks. */
export function checkRateLimit(key: string): {
  ok: boolean;
  retryAfterSec?: number;
} {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  buckets.set(key, current);
  return { ok: true };
}

export const DUPLICATE_WINDOW_MINUTES = 10;
