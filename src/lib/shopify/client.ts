const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  revalidate,
}: ShopifyFetchOptions): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
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
}
