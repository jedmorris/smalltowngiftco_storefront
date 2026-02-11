import type { ShopifyConnection, MoneyV2 } from "./types";

export function flattenEdges<T>(connection: ShopifyConnection<T>): T[] {
  return connection.edges.map((edge) => edge.node);
}

export function formatPrice(money: MoneyV2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}

export function isOnSale(price: MoneyV2, compareAtPrice: MoneyV2 | null): boolean {
  if (!compareAtPrice) return false;
  return parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
}

export function getSalePercentage(price: MoneyV2, compareAtPrice: MoneyV2): number {
  const original = parseFloat(compareAtPrice.amount);
  const current = parseFloat(price.amount);
  return Math.round(((original - current) / original) * 100);
}
