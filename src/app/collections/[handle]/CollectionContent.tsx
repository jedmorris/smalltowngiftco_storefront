"use client";

import { useMemo, useState } from "react";
import CollectionSortDropdown from "@/components/collection/CollectionSortDropdown";
import FilterSidebar, { type FilterState } from "@/components/collection/FilterSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/lib/shopify/types";

interface CollectionContentProps {
  products: Product[];
}

export default function CollectionContent({ products }: CollectionContentProps) {
  const [sortKey, setSortKey] = useState("featured");

  // Extract available filter values from products
  const { vendors, types, priceBounds } = useMemo(() => {
    const vendorSet = new Set<string>();
    const typeSet = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    for (const p of products) {
      if (p.vendor) vendorSet.add(p.vendor);
      if (p.productType) typeSet.add(p.productType);
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      if (price < minPrice) minPrice = price;
      if (price > maxPrice) maxPrice = price;
    }

    return {
      vendors: Array.from(vendorSet).sort(),
      types: Array.from(typeSet).sort(),
      priceBounds: [
        Math.floor(minPrice === Infinity ? 0 : minPrice),
        Math.ceil(maxPrice || 100),
      ] as [number, number],
    };
  }, [products]);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: priceBounds,
    vendors: [],
    productTypes: [],
    availableOnly: false,
  });

  const filteredAndSorted = useMemo(() => {
    const result = products.filter((p) => {
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
      if (filters.availableOnly && !p.availableForSale) return false;
      if (filters.vendors.length > 0 && !filters.vendors.includes(p.vendor)) return false;
      if (filters.productTypes.length > 0 && !filters.productTypes.includes(p.productType)) return false;
      return true;
    });

    switch (sortKey) {
      case "price-asc":
        result.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
    }
    return result;
  }, [products, filters, sortKey]);

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">
        No products in this collection yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <FilterSidebar
        availableVendors={vendors}
        availableTypes={types}
        priceBounds={priceBounds}
        filters={filters}
        onChange={setFilters}
        resultCount={filteredAndSorted.length}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "product" : "products"}
          </p>
          <CollectionSortDropdown value={sortKey} onChange={setSortKey} />
        </div>
        {filteredAndSorted.length > 0 ? (
          <ProductGrid products={filteredAndSorted} columns={3} />
        ) : (
          <p className="text-center text-gray-500 py-20">
            No products match your filters. Try adjusting or clearing them.
          </p>
        )}
      </div>
    </div>
  );
}
