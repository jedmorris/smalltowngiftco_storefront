import "server-only";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "";
const apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION ?? "2025-01";
const debug = process.env.SHOPIFY_ADMIN_DEBUG === "1";

const endpoint = `https://${domain}/admin/api/${apiVersion}/graphql.json`;

interface ShopifyAdminFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  timeout?: number;
}

interface GraphQLCostExtension {
  requestedQueryCost?: number;
  actualQueryCost?: number;
  throttleStatus?: {
    maximumAvailable: number;
    currentlyAvailable: number;
    restoreRate: number;
  };
}

export async function shopifyAdminFetch<T>({
  query,
  variables,
  timeout = 15000,
}: ShopifyAdminFetchOptions): Promise<T> {
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `Shopify Admin API error: ${res.status} ${res.statusText} ${body}`.trim()
      );
    }

    const json = (await res.json()) as {
      data?: T;
      errors?: Array<{ message: string }>;
      extensions?: { cost?: GraphQLCostExtension };
    };

    if (debug && json.extensions?.cost) {
      console.log("[shopify-admin cost]", json.extensions.cost);
    }

    if (json.errors?.length) {
      throw new Error(
        json.errors[0]?.message ?? "Unknown Shopify Admin API error"
      );
    }

    if (!json.data) {
      throw new Error("Shopify Admin API returned no data");
    }

    return json.data;
  } finally {
    clearTimeout(timeoutId);
  }
}
