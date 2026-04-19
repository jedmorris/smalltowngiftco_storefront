import type { Product, CartItem } from "@/lib/shopify/types";

// Extend window for gtag and fbq
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── GA4 E-commerce Events ──────────────────────────────

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

export function trackViewItem(product: Product) {
  const item = productToItem(product);
  gtag("event", "view_item", {
    currency: product.priceRange.minVariantPrice.currencyCode,
    value: parseFloat(product.priceRange.minVariantPrice.amount),
    items: [item],
  });
  fbqTrack("ViewContent", {
    content_ids: [product.id],
    content_name: product.title,
    content_type: "product",
    value: parseFloat(product.priceRange.minVariantPrice.amount),
    currency: product.priceRange.minVariantPrice.currencyCode,
  });
}

export function trackAddToCart(product: Product, variantId: string, quantity: number = 1) {
  const variant = product.variants.find((v) => v.id === variantId);
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const item = productToItem(product, variant?.title);

  gtag("event", "add_to_cart", {
    currency: price.currencyCode,
    value: parseFloat(price.amount) * quantity,
    items: [{ ...item, quantity }],
  });
  fbqTrack("AddToCart", {
    content_ids: [product.id],
    content_name: product.title,
    content_type: "product",
    value: parseFloat(price.amount) * quantity,
    currency: price.currencyCode,
  });
}

export function trackRemoveFromCart(item: CartItem) {
  gtag("event", "remove_from_cart", {
    currency: item.merchandise.price.currencyCode,
    value: parseFloat(item.merchandise.price.amount) * item.quantity,
    items: [
      {
        item_id: item.merchandise.id,
        item_name: item.merchandise.product.title,
        price: parseFloat(item.merchandise.price.amount),
        quantity: item.quantity,
      },
    ],
  });
}

export function trackBeginCheckout(cartItems: CartItem[], totalValue: string, currency: string) {
  const items = cartItems.map((item) => ({
    item_id: item.merchandise.id,
    item_name: item.merchandise.product.title,
    price: parseFloat(item.merchandise.price.amount),
    quantity: item.quantity,
  }));

  gtag("event", "begin_checkout", {
    currency,
    value: parseFloat(totalValue),
    items,
  });
  fbqTrack("InitiateCheckout", {
    content_ids: cartItems.map((i) => i.merchandise.id),
    num_items: cartItems.reduce((sum, i) => sum + i.quantity, 0),
    value: parseFloat(totalValue),
    currency,
  });
}

export function trackSearch(query: string) {
  gtag("event", "search", { search_term: query });
  fbqTrack("Search", { search_string: query });
}

// ─── Meta Pixel Events ──────────────────────────────────

function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

// ─── Helpers ────────────────────────────────────────────

function productToItem(product: Product, variantTitle?: string) {
  return {
    item_id: product.id,
    item_name: product.title,
    item_brand: product.vendor,
    item_category: product.productType,
    item_variant: variantTitle,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
  };
}
