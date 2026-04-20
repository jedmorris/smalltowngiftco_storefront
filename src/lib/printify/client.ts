import "server-only";

const BASE_URL = "https://api.printify.com/v1";
const token = process.env.PRINTIFY_API_TOKEN ?? "";
const debug = process.env.PRINTIFY_DEBUG === "1";

interface PrintifyFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
}

let lastCallAt = 0;
const MIN_GAP_MS = Number(process.env.PRINTIFY_MIN_GAP_MS ?? 350); // default ~3 req/s; override with PRINTIFY_MIN_GAP_MS for throttle-heavy endpoints like publish

async function throttle(): Promise<void> {
  const wait = lastCallAt + MIN_GAP_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCallAt = Date.now();
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function printifyFetch<T>(
  path: string,
  { method = "GET", body, query, timeout = 30000 }: PrintifyFetchOptions = {}
): Promise<T> {
  if (!token) {
    throw new Error(
      "Printify: missing PRINTIFY_API_TOKEN (set in .env.local)"
    );
  }

  const url = new URL(`${BASE_URL}/${path.replace(/^\//, "")}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  // Retry with exponential backoff on 429.
  const maxRetries = 5;
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await throttle();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "smalltowngiftco-scripts/1.0",
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        cache: "no-store",
      });

      if (debug) {
        console.log(`[printify] ${method} ${url.pathname} → ${res.status}`);
      }

      if (res.status === 429 && attempt < maxRetries) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const backoff = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : Math.min(30000, 2000 * Math.pow(2, attempt));
        attempt++;
        if (debug) console.log(`[printify] 429 — backing off ${backoff}ms (attempt ${attempt})`);
        await sleep(backoff);
        continue;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Printify API error: ${res.status} ${res.statusText} ${text}`.trim()
        );
      }

      if (res.status === 204) return undefined as T;
      return (await res.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
