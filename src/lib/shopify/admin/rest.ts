import "server-only";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "";
const apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION ?? "2025-01";
const debug = process.env.SHOPIFY_ADMIN_DEBUG === "1";

interface ShopifyAdminRestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
}

export async function shopifyAdminRest<T>(
  path: string,
  { method = "GET", body, query, timeout = 15000 }: ShopifyAdminRestOptions = {}
): Promise<T> {
  if (!domain) {
    throw new Error(
      "Shopify Admin: missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN"
    );
  }
  if (!token) {
    throw new Error(
      "Shopify Admin: missing SHOPIFY_ADMIN_ACCESS_TOKEN (set in .env.local)"
    );
  }

  const normalizedPath = path.replace(/^\//, "");
  const url = new URL(
    `https://${domain}/admin/api/${apiVersion}/${normalizedPath}`
  );
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    if (debug) {
      const limit = res.headers.get("x-shopify-shop-api-call-limit");
      if (limit) console.log("[shopify-admin rest limit]", limit);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Shopify Admin REST error: ${res.status} ${res.statusText} ${text}`.trim()
      );
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function throttle(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
