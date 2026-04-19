"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/product/ProductGrid";

export default function WishlistContent() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 rounded-full bg-peach-soft/30 flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-apricot-deep" strokeWidth={1.6} />
        </div>
        <p className="font-serif text-xl text-ink mb-2">
          Your wishlist is empty
        </p>
        <p className="text-sm text-ink-muted mb-6">
          Save your favorite items by tapping the heart icon.
        </p>
        <Link
          href="/collections"
          className="px-8 py-3 bg-apricot-deep text-white font-medium rounded-full hover:bg-apricot-deep/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-ink-muted mb-6">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>
      <ProductGrid products={items} columns={4} />
    </div>
  );
}
