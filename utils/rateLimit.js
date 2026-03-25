/**
 * Simple in-memory rate limiter.
 * For multi-instance / production at scale, replace with Upstash Redis.
 *
 * Usage:
 *   const result = rateLimit(identifier, { limit: 10, windowMs: 60_000 });
 *   if (!result.success) return Response.json({ error: 'Too many requests' }, { status: 429 });
 */

const store = new Map(); // { key: { count, resetAt } }

/**
 * @param {string} identifier - e.g. userId or IP address
 * @param {{ limit: number, windowMs: number }} options
 * @returns {{ success: boolean, remaining: number, resetAt: number }}
 */
export function rateLimit(identifier, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
