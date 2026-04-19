"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Price from "@/components/ui/Price";
import { isOnSale, getSalePercentage } from "@/lib/shopify";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickView } from "@/context/QuickViewContext";
import type { Product } from "@/lib/shopify/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const wishlisted = isInWishlist(product.id);
  const image = product.featuredImage;
  const secondImage = product.images.length > 1 ? product.images[1] : null;
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const onSale = isOnSale(price, compareAtPrice ?? null);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="block no-underline">
        <div className="relative aspect-[4/5] bg-peach-soft rounded-[16px] overflow-hidden mb-3 image-grain">
          {image ? (
            <>
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                className={`object-cover transition-all duration-500 ${
                  hovered && secondImage ? "opacity-0" : "opacity-100"
                } group-hover:scale-[1.03]`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {secondImage && (
                <Image
                  src={secondImage.url}
                  alt={secondImage.altText || `${product.title} - alternate`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    hovered ? "opacity-100 scale-[1.03]" : "opacity-0"
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ink-subtle">
              No image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {!product.availableForSale && <Badge variant="soldOut">Sold Out</Badge>}
            {onSale && compareAtPrice && (
              <Badge variant="sale">-{getSalePercentage(price, compareAtPrice)}%</Badge>
            )}
          </div>

          {/* Quick add button */}
          <button
            onClick={(e) => { e.preventDefault(); openQuickView(product); }}
            className={`absolute bottom-3 right-3 p-[9px] rounded-full bg-paper/92 backdrop-blur-sm border-0 cursor-pointer text-espresso transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Quick add"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.6} />
          </button>
        </div>

        <h3 className="font-serif text-[16px] font-medium text-ink group-hover:text-apricot-deep transition-colors line-clamp-2 tracking-[0.005em] leading-tight">
          {product.title}
        </h3>
        <div className="mt-1">
          <Price price={price} compareAtPrice={compareAtPrice} className="text-sm" />
        </div>
      </Link>

      {/* Action buttons */}
      <div
        className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => toggleWishlist(product)}
          className={`p-2 rounded-full transition-colors shadow-soft ${
            wishlisted
              ? "bg-apricot-deep text-white"
              : "bg-paper/90 hover:bg-apricot-deep hover:text-white text-ink"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="w-4 h-4" strokeWidth={1.6} fill={wishlisted ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => openQuickView(product)}
          className="p-2 bg-paper/90 rounded-full hover:bg-apricot-deep hover:text-white text-ink transition-colors shadow-soft"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}
