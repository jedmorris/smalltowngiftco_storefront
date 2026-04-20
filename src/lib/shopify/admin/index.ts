import "server-only";

import { shopifyAdminFetch } from "./client";
import { shopifyAdminRest, throttle } from "./rest";
import {
  PRODUCTS_LIST,
  VARIANT_BY_SKU,
  PRIMARY_LOCATION,
  PRODUCTS_LIST_WITH_TAGS,
  COLLECTION_BY_HANDLE_ADMIN,
} from "./queries";
import {
  COLLECTION_CREATE,
  COLLECTION_ADD_PRODUCTS,
  PRODUCT_UPDATE_TAGS,
} from "./mutations";
import type {
  AdminProduct,
  AdminProductVariant,
  AdminLocation,
  AdminConnection,
  InventoryAdjustRestResponse,
  AdminProductWithTags,
  AdminCollection,
  AdminUserError,
  CollectionCreateInput,
} from "./types";

export { shopifyAdminFetch, shopifyAdminRest, throttle };
export type {
  AdminProduct,
  AdminProductVariant,
  AdminLocation,
  AdminConnection,
  AdminUserError,
  InventoryAdjustRestResponse,
  AdminProductWithTags,
  AdminCollection,
  CollectionCreateInput,
} from "./types";
export {
  PRODUCTS_LIST,
  VARIANT_BY_SKU,
  PRIMARY_LOCATION,
  PRODUCTS_LIST_WITH_TAGS,
  COLLECTION_BY_HANDLE_ADMIN,
} from "./queries";
export {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  INVENTORY_ADJUST_QUANTITIES,
  COLLECTION_CREATE,
  COLLECTION_ADD_PRODUCTS,
  PRODUCT_UPDATE_TAGS,
} from "./mutations";

export async function listProducts(
  first = 25,
  after?: string
): Promise<AdminConnection<AdminProduct>> {
  const data = await shopifyAdminFetch<{
    products: AdminConnection<AdminProduct>;
  }>({
    query: PRODUCTS_LIST,
    variables: { first, after },
  });
  return data.products;
}

export async function findVariantBySku(
  sku: string
): Promise<
  | (AdminProductVariant & {
      product: { id: string; title: string; handle: string };
    })
  | null
> {
  const data = await shopifyAdminFetch<{
    productVariants: AdminConnection<
      AdminProductVariant & {
        product: { id: string; title: string; handle: string };
      }
    >;
  }>({
    query: VARIANT_BY_SKU,
    variables: { query: `sku:${sku}` },
  });
  return data.productVariants.edges[0]?.node ?? null;
}

export async function getPrimaryLocation(): Promise<AdminLocation | null> {
  const data = await shopifyAdminFetch<{
    locations: AdminConnection<AdminLocation>;
  }>({
    query: PRIMARY_LOCATION,
  });
  return (
    data.locations.edges.map((e) => e.node).find((loc) => loc.isActive) ?? null
  );
}

/**
 * REST: adjust inventory level by a signed delta at a specific location.
 * Uses the REST endpoint because it's the simplest delta-style adjustment;
 * for complex workflows prefer the GraphQL `inventoryAdjustQuantities` mutation.
 */
export async function adjustInventoryRest(params: {
  inventoryItemId: string | number;
  locationId: string | number;
  delta: number;
}): Promise<InventoryAdjustRestResponse> {
  const inventoryItemId = String(params.inventoryItemId).replace(
    /^gid:\/\/shopify\/InventoryItem\//,
    ""
  );
  const locationId = String(params.locationId).replace(
    /^gid:\/\/shopify\/Location\//,
    ""
  );
  return shopifyAdminRest<InventoryAdjustRestResponse>(
    "inventory_levels/adjust.json",
    {
      method: "POST",
      body: {
        inventory_item_id: Number(inventoryItemId),
        location_id: Number(locationId),
        available_adjustment: params.delta,
      },
    }
  );
}

export async function listProductsWithTags(
  first = 100,
  after?: string
): Promise<AdminConnection<AdminProductWithTags>> {
  const data = await shopifyAdminFetch<{
    products: AdminConnection<AdminProductWithTags>;
  }>({
    query: PRODUCTS_LIST_WITH_TAGS,
    variables: { first, after },
  });
  return data.products;
}

export async function listAllProductsWithTags(
  onProgress?: (n: number) => void
): Promise<AdminProductWithTags[]> {
  const all: AdminProductWithTags[] = [];
  let after: string | undefined = undefined;
  while (true) {
    const page: AdminConnection<AdminProductWithTags> =
      await listProductsWithTags(100, after);
    all.push(...page.edges.map((e) => e.node));
    onProgress?.(all.length);
    if (!page.pageInfo.hasNextPage || !page.pageInfo.endCursor) break;
    after = page.pageInfo.endCursor;
  }
  return all;
}

export async function getCollectionByHandle(
  handle: string
): Promise<AdminCollection | null> {
  const data = await shopifyAdminFetch<{
    collectionByHandle: AdminCollection | null;
  }>({
    query: COLLECTION_BY_HANDLE_ADMIN,
    variables: { handle },
  });
  return data.collectionByHandle;
}

export async function createCollection(
  input: CollectionCreateInput
): Promise<{ collection: AdminCollection | null; userErrors: AdminUserError[] }> {
  const data = await shopifyAdminFetch<{
    collectionCreate: {
      collection: AdminCollection | null;
      userErrors: AdminUserError[];
    };
  }>({
    query: COLLECTION_CREATE,
    variables: { input },
  });
  return data.collectionCreate;
}

export async function addProductsToCollection(
  collectionId: string,
  productIds: string[]
): Promise<{
  collection: AdminCollection | null;
  userErrors: AdminUserError[];
}> {
  const data = await shopifyAdminFetch<{
    collectionAddProducts: {
      collection: AdminCollection | null;
      userErrors: AdminUserError[];
    };
  }>({
    query: COLLECTION_ADD_PRODUCTS,
    variables: { id: collectionId, productIds },
  });
  return data.collectionAddProducts;
}

export async function updateProductTags(
  productId: string,
  tags: string[]
): Promise<AdminUserError[]> {
  const data = await shopifyAdminFetch<{
    productUpdate: {
      product: { id: string; tags: string[] } | null;
      userErrors: AdminUserError[];
    };
  }>({
    query: PRODUCT_UPDATE_TAGS,
    variables: { input: { id: productId, tags } },
  });
  return data.productUpdate.userErrors;
}
