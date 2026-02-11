"use client";

import { useMemo, useState } from "react";
import CollectionSortDropdown from "@/components/collection/CollectionSortDropdown";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/lib/shopify/types";

interface CollectionContentProps {
  products: Product[];
}

export default function CollectionContent({ products }: CollectionContentProps) {
  const [sortKey, setSortKey] = useState("featured");

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortKey) {
      case "price-asc":
        sorted.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case "newest":
        sorted.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sortKey]);

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">
        No products in this collection yet. Check back soon!
      </p>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <CollectionSortDropdown value={sortKey} onChange={setSortKey} />
      </div>
      <ProductGrid products={sortedProducts} columns={4} />
    </>
  );
}
