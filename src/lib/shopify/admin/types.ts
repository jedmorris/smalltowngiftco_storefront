import "server-only";

export interface AdminUserError {
  field: string[] | null;
  message: string;
  code?: string;
}

export interface AdminConnection<T> {
  edges: Array<{ node: T; cursor: string }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
    startCursor: string | null;
  };
}

export interface AdminProductVariant {
  id: string;
  sku: string | null;
  title: string;
  inventoryQuantity: number | null;
  inventoryItem: {
    id: string;
  };
}

export interface AdminProduct {
  id: string;
  title: string;
  handle: string;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  totalInventory: number;
  variants: AdminConnection<AdminProductVariant>;
}

export interface AdminLocation {
  id: string;
  name: string;
  isActive: boolean;
}

export interface InventoryAdjustRestResponse {
  inventory_level: {
    inventory_item_id: number;
    location_id: number;
    available: number;
    updated_at: string;
  };
}

export interface AdminProductWithTags {
  id: string;
  title: string;
  handle: string;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  tags: string[];
  vendor: string;
  productType: string;
  description: string;
}

export interface AdminCollection {
  id: string;
  handle: string;
  title: string;
  productsCount?: { count: number } | null;
}

export interface CollectionCreateInput {
  title: string;
  handle?: string;
  descriptionHtml?: string;
  seo?: { title?: string; description?: string };
}
