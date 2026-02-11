"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Price from "@/components/ui/Price";
import { isOnSale, getSalePercentage } from "@/lib/shopify";
import type { Product } from "@/lib/shopify/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const image = product.featuredImage;
  const secondImage = product.images.length > 1 ? product.images[1] : null;
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const onSale = isOnSale(price, compareAtPrice ?? null);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square bg-brand-cream rounded-2xl overflow-hidden mb-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300">
        {image ? (
          <>
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className={`object-cover transition-all duration-500 ${
                hovered && secondImage ? "opacity-0" : "opacity-100"
              } group-hover:scale-105`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {secondImage && (
              <Image
                src={secondImage.url}
                alt={secondImage.altText || `${product.title} - alternate`}
                fill
                className={`object-cover transition-all duration-500 ${
                  hovered ? "opacity-100 scale-105" : "opacity-0"
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
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

        {/* Hover action buttons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="p-2 bg-white/90 rounded-full hover:bg-brand-gold hover:text-white transition-colors shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="p-2 bg-white/90 rounded-full hover:bg-brand-gold hover:text-white transition-colors shadow-sm"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Image dots for multi-image */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.slice(0, 4).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  (hovered && i === 1) || (!hovered && i === 0)
                    ? "bg-white"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-brand-charcoal group-hover:text-brand-gold transition-colors line-clamp-2">
        {product.title}
      </h3>
      <p className={`text-xs text-brand-gold/60 transition-all duration-300 h-4 ${
        hovered ? "opacity-100" : "opacity-0"
      }`}>
        Quick view
      </p>
      <div className="mt-0.5">
        <Price price={price} compareAtPrice={compareAtPrice} className="text-sm" />
      </div>
    </Link>
  );
}
