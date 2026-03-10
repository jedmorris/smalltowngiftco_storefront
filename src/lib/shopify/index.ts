import { shopifyFetch } from "./client";
import { flattenEdges } from "./normalize";
import {
  GET_FEATURED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_ALL_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  SEARCH_PRODUCTS,
  GET_PRODUCT_HANDLES,
  GET_COLLECTION_HANDLES,
} from "./queries";
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINE,
  REMOVE_CART_LINE,
  GET_CART,
} from "./mutations";
import {
  CUSTOMER_CREATE,
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_UPDATE,
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_ADDRESS_DELETE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  GET_CUSTOMER,
} from "./customer-queries";
import type {
  Product,
  Collection,
  Cart,
  CartItem,
  ProductVariant,
  Customer,
  CustomerAddress,
  CustomerOrder,
  OrderLineItem,
  CustomerAccessToken,
  ShopifyConnection,
} from "./types";

// ─── Products ────────────────────────────────────────────

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  const data = await shopifyFetch<{
    collection: { products: ShopifyConnection<Product & { variants: ShopifyConnection<ProductVariant>; images: ShopifyConnection<Product["images"][0]> }> } | null;
  }>({
    query: GET_FEATURED_PRODUCTS,
    variables: { first: count },
    tags: ["products"],
    revalidate: 3600,
  });

  if (!data.collection) return [];
  return flattenEdges(data.collection.products).map(normalizeProduct);
}

export async function getAllProducts(first = 50): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: ShopifyConnection<Product & { variants: ShopifyConnection<ProductVariant>; images: ShopifyConnection<Product["images"][0]> }>;
  }>({
    query: GET_ALL_PRODUCTS,
    variables: { first },
    tags: ["products"],
    revalidate: 3600,
  });

  return flattenEdges(data.products).map(normalizeProduct);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{
    product: (Product & { variants: ShopifyConnection<ProductVariant>; images: ShopifyConnection<Product["images"][0]> }) | null;
  }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: ["products"],
    revalidate: 3600,
  });

  if (!data.product) return null;
  return normalizeProduct(data.product);
}

export async function searchProducts(query: string, first = 20): Promise<Product[]> {
  const data = await shopifyFetch<{
    search: ShopifyConnection<Product & { variants: ShopifyConnection<ProductVariant>; images: ShopifyConnection<Product["images"][0]> }>;
  }>({
    query: SEARCH_PRODUCTS,
    variables: { query, first },
    tags: ["products"],
    revalidate: 60,
  });

  return flattenEdges(data.search).map(normalizeProduct);
}

export async function getProductHandles(): Promise<{ handle: string; updatedAt: string }[]> {
  const data = await shopifyFetch<{
    products: ShopifyConnection<{ handle: string; updatedAt: string }>;
  }>({
    query: GET_PRODUCT_HANDLES,
    variables: { first: 250 },
    tags: ["products"],
  });

  return flattenEdges(data.products);
}

// ─── Collections ─────────────────────────────────────────

export async function getAllCollections(): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: ShopifyConnection<Collection>;
  }>({
    query: GET_ALL_COLLECTIONS,
    variables: { first: 50 },
    tags: ["collections"],
    revalidate: 3600,
  });

  return flattenEdges(data.collections);
}

export async function getCollectionByHandle(
  handle: string,
  productCount = 50
): Promise<(Collection & { products: Product[] }) | null> {
  const data = await shopifyFetch<{
    collection: (Collection & {
      products: ShopifyConnection<Product & { variants: ShopifyConnection<ProductVariant>; images: ShopifyConnection<Product["images"][0]> }>;
    }) | null;
  }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first: productCount },
    tags: ["collections"],
    revalidate: 3600,
  });

  if (!data.collection) return null;
  return {
    ...data.collection,
    products: flattenEdges(data.collection.products).map(normalizeProduct),
  };
}

export async function getCollectionHandles(): Promise<{ handle: string; updatedAt: string }[]> {
  const data = await shopifyFetch<{
    collections: ShopifyConnection<{ handle: string; updatedAt: string }>;
  }>({
    query: GET_COLLECTION_HANDLES,
    variables: { first: 250 },
    tags: ["collections"],
  });

  return flattenEdges(data.collections);
}

// ─── Cart ────────────────────────────────────────────────

function normalizeCart(rawCart: Record<string, unknown>): Cart {
  const cart = rawCart as unknown as Cart & { lines: ShopifyConnection<CartItem> };
  return {
    ...cart,
    lines: flattenEdges(cart.lines as unknown as ShopifyConnection<CartItem>),
  };
}

export async function createCart(variantId?: string, quantity?: number): Promise<Cart> {
  const lines = variantId ? [{ merchandiseId: variantId, quantity: quantity ?? 1 }] : [];
  const data = await shopifyFetch<{
    cartCreate: { cart: Cart & { lines: ShopifyConnection<CartItem> } };
  }>({
    query: CREATE_CART,
    variables: { lines },
  });

  return normalizeCart(data.cartCreate.cart as unknown as Record<string, unknown>);
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: Cart & { lines: ShopifyConnection<CartItem> } };
  }>({
    query: ADD_TO_CART,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  return normalizeCart(data.cartLinesAdd.cart as unknown as Record<string, unknown>);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: Cart & { lines: ShopifyConnection<CartItem> } };
  }>({
    query: UPDATE_CART_LINE,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  return normalizeCart(data.cartLinesUpdate.cart as unknown as Record<string, unknown>);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: Cart & { lines: ShopifyConnection<CartItem> } };
  }>({
    query: REMOVE_CART_LINE,
    variables: {
      cartId,
      lineIds: [lineId],
    },
  });

  return normalizeCart(data.cartLinesRemove.cart as unknown as Record<string, unknown>);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cart: (Cart & { lines: ShopifyConnection<CartItem> }) | null;
  }>({
    query: GET_CART,
    variables: { cartId },
  });

  if (!data.cart) return null;
  return normalizeCart(data.cart as unknown as Record<string, unknown>);
}

// ─── Helpers ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProduct(product: any): Product {
  return {
    ...product,
    images: product.images?.edges
      ? flattenEdges(product.images)
      : product.images ?? [],
    variants: product.variants?.edges
      ? flattenEdges(product.variants)
      : product.variants ?? [],
  };
}

// ─── Customer ───────────────────────────────────────────

export async function customerCreate(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ customer: { id: string; email: string } | null; error: string | null }> {
  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string; email: string; firstName: string; lastName: string } | null;
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_CREATE,
    variables: { input: { email, password, firstName, lastName } },
  });

  const errors = data.customerCreate.customerUserErrors;
  if (errors.length > 0) {
    return { customer: null, error: errors[0].message };
  }
  return { customer: data.customerCreate.customer, error: null };
}

export async function customerSignIn(
  email: string,
  password: string
): Promise<{ token: CustomerAccessToken | null; error: string | null }> {
  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: { input: { email, password } },
  });

  const errors = data.customerAccessTokenCreate.customerUserErrors;
  if (errors.length > 0) {
    return { token: null, error: errors[0].message };
  }
  return { token: data.customerAccessTokenCreate.customerAccessToken, error: null };
}

export async function customerSignOut(accessToken: string): Promise<void> {
  await shopifyFetch<{
    customerAccessTokenDelete: { deletedAccessToken: string };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_DELETE,
    variables: { customerAccessToken: accessToken },
  });
}

export async function getCustomer(accessToken: string): Promise<Customer | null> {
  const data = await shopifyFetch<{
    customer: (Omit<Customer, "orders" | "addresses"> & {
      addresses: ShopifyConnection<CustomerAddress>;
      orders: ShopifyConnection<Omit<CustomerOrder, "lineItems"> & {
        lineItems: ShopifyConnection<OrderLineItem>;
      }>;
    }) | null;
  }>({
    query: GET_CUSTOMER,
    variables: { customerAccessToken: accessToken },
  });

  if (!data.customer) return null;
  return {
    ...data.customer,
    addresses: flattenEdges(data.customer.addresses),
    orders: flattenEdges(data.customer.orders).map((order) => ({
      ...order,
      lineItems: flattenEdges(order.lineItems),
    })),
  };
}

export async function updateCustomer(
  accessToken: string,
  fields: { firstName?: string; lastName?: string; phone?: string; email?: string }
): Promise<{ error: string | null }> {
  const data = await shopifyFetch<{
    customerUpdate: {
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_UPDATE,
    variables: { customerAccessToken: accessToken, customer: fields },
  });

  const errors = data.customerUpdate.customerUserErrors;
  return { error: errors.length > 0 ? errors[0].message : null };
}

export async function createCustomerAddress(
  accessToken: string,
  address: Omit<CustomerAddress, "id">
): Promise<{ address: CustomerAddress | null; error: string | null }> {
  const data = await shopifyFetch<{
    customerAddressCreate: {
      customerAddress: CustomerAddress | null;
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_ADDRESS_CREATE,
    variables: { customerAccessToken: accessToken, address },
  });

  const errors = data.customerAddressCreate.customerUserErrors;
  if (errors.length > 0) return { address: null, error: errors[0].message };
  return { address: data.customerAddressCreate.customerAddress, error: null };
}

export async function updateCustomerAddress(
  accessToken: string,
  id: string,
  address: Omit<CustomerAddress, "id">
): Promise<{ error: string | null }> {
  const data = await shopifyFetch<{
    customerAddressUpdate: {
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_ADDRESS_UPDATE,
    variables: { customerAccessToken: accessToken, id, address },
  });

  const errors = data.customerAddressUpdate.customerUserErrors;
  return { error: errors.length > 0 ? errors[0].message : null };
}

export async function deleteCustomerAddress(
  accessToken: string,
  id: string
): Promise<{ error: string | null }> {
  const data = await shopifyFetch<{
    customerAddressDelete: {
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_ADDRESS_DELETE,
    variables: { customerAccessToken: accessToken, id },
  });

  const errors = data.customerAddressDelete.customerUserErrors;
  return { error: errors.length > 0 ? errors[0].message : null };
}

export async function setDefaultCustomerAddress(
  accessToken: string,
  addressId: string
): Promise<{ error: string | null }> {
  const data = await shopifyFetch<{
    customerDefaultAddressUpdate: {
      customerUserErrors: { message: string }[];
    };
  }>({
    query: CUSTOMER_DEFAULT_ADDRESS_UPDATE,
    variables: { customerAccessToken: accessToken, addressId },
  });

  const errors = data.customerDefaultAddressUpdate.customerUserErrors;
  return { error: errors.length > 0 ? errors[0].message : null };
}

// Re-exports
export { formatPrice, isOnSale, getSalePercentage } from "./normalize";
export type { Product, Collection, Cart, CartItem, ProductVariant, Customer, CustomerAddress, CustomerOrder, CustomerAccessToken } from "./types";
