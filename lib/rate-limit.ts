const WINDOW_MS = 60_000;
const LIMIT = 10;

type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

export function assertRateLimit(key: string) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return;
  }

  if (entry.count >= LIMIT) {
    throw new Error("Too many requests. Please wait a minute and try again.");
  }

  entry.count += 1;
  store.set(key, entry);
}
