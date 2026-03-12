// Static access required — Next.js inlines NEXT_PUBLIC_* at build time only with literal property access
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const publicToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

if (!domain || !publicToken) {
  console.error("Missing required Shopify environment variables");
}
const endpoint = `https://${domain}/api/2025-01/graphql.json`;

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
  timeout?: number;
}

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  revalidate,
  timeout = 10000,
}: ShopifyFetchOptions): Promise<T> {
  // Use private token (server-side) if available, otherwise public token
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (privateToken) {
    headers["Shopify-Storefront-Private-Token"] = privateToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = publicToken;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: {
        revalidate,
        tags,
      },
    });

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message ?? "Unknown Shopify API error");
    }

    return json.data as T;
  } finally {
    clearTimeout(timeoutId);
  }
}
