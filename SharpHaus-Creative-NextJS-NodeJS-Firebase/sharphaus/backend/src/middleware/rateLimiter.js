// A small, dependency-free rate limiter: max N requests per IP per window.
// Good enough to stop basic contact-form spam/abuse without adding Redis.

const hits = new Map();

function rateLimiter({ windowMs = 60_000, max = 5 } = {}) {
  return (req, res, next) => {
    const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const now = Date.now();
    const entry = hits.get(key) || { count: 0, start: now };

    if (now - entry.start > windowMs) {
      entry.count = 0;
      entry.start = now;
    }

    entry.count += 1;
    hits.set(key, entry);

    if (entry.count > max) {
      return res.status(429).json({
        error: "Too many requests. Please wait a minute and try again.",
      });
    }

    next();
  };
}

module.exports = rateLimiter;
