import "server-only";

import { printifyFetch } from "./client";
import type {
  PrintifyShop,
  PrintifyProduct,
  PrintifyPaginated,
} from "./types";

export { printifyFetch };
export type {
  PrintifyShop,
  PrintifyProduct,
  PrintifyVariant,
  PrintifyImage,
  PrintifyPrintArea,
  PrintifyExternal,
  PrintifyPaginated,
} from "./types";

export async function listShops(): Promise<PrintifyShop[]> {
  return printifyFetch<PrintifyShop[]>("shops.json");
}

export async function listProducts(
  shopId: number | string,
  page = 1,
  limit = 50
): Promise<PrintifyPaginated<PrintifyProduct>> {
  return printifyFetch<PrintifyPaginated<PrintifyProduct>>(
    `shops/${shopId}/products.json`,
    { query: { page, limit } }
  );
}

export async function listAllProducts(
  shopId: number | string,
  onProgress?: (n: number, total: number) => void
): Promise<PrintifyProduct[]> {
  const all: PrintifyProduct[] = [];
  let page = 1;
  while (true) {
    const resp = await listProducts(shopId, page, 50);
    all.push(...resp.data);
    onProgress?.(all.length, resp.total);
    if (page >= resp.last_page) break;
    page++;
  }
  return all;
}

export async function getProduct(
  shopId: number | string,
  productId: string
): Promise<PrintifyProduct> {
  return printifyFetch<PrintifyProduct>(
    `shops/${shopId}/products/${productId}.json`
  );
}

export async function createProduct(
  shopId: number | string,
  input: Record<string, unknown>
): Promise<PrintifyProduct> {
  return printifyFetch<PrintifyProduct>(`shops/${shopId}/products.json`, {
    method: "POST",
    body: input,
  });
}

export async function publishProduct(
  shopId: number | string,
  productId: string,
  flags: {
    title?: boolean;
    description?: boolean;
    images?: boolean;
    variants?: boolean;
    tags?: boolean;
    keyFeatures?: boolean;
    shipping_template?: boolean;
  } = {}
): Promise<void> {
  const body = {
    title: true,
    description: true,
    images: true,
    variants: true,
    tags: true,
    keyFeatures: true,
    shipping_template: true,
    ...flags,
  };
  await printifyFetch<void>(
    `shops/${shopId}/products/${productId}/publish.json`,
    { method: "POST", body }
  );
}

export async function publishingSucceeded(
  shopId: number | string,
  productId: string,
  external: { id: string; handle: string }
): Promise<void> {
  await printifyFetch<void>(
    `shops/${shopId}/products/${productId}/publishing_succeeded.json`,
    { method: "POST", body: { external } }
  );
}

export async function publishingFailed(
  shopId: number | string,
  productId: string,
  reason: string
): Promise<void> {
  await printifyFetch<void>(
    `shops/${shopId}/products/${productId}/publishing_failed.json`,
    { method: "POST", body: { reason } }
  );
}
