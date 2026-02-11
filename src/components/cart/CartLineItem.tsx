"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import type { CartItem } from "@/lib/shopify/types";

interface CartLineItemProps {
  item: CartItem;
}

export default function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeItem, isLoading } = useCart();
  const { merchandise } = item;
  const image = merchandise.product.featuredImage;
  const variantTitle = merchandise.title !== "Default Title" ? merchandise.title : null;

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <Link
        href={`/products/${merchandise.product.handle}`}
        className="relative w-20 h-20 flex-shrink-0 bg-brand-cream rounded-lg overflow-hidden"
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || merchandise.product.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            No image
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${merchandise.product.handle}`}
          className="text-sm font-medium text-brand-charcoal hover:text-brand-gold transition-colors line-clamp-2"
        >
          {merchandise.product.title}
        </Link>
        {variantTitle && (
          <p className="text-xs text-gray-500 mt-0.5">{variantTitle}</p>
        )}
        <p className="text-sm font-semibold text-brand-charcoal mt-1">
          {formatPrice(merchandise.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-brand-pink rounded">
            <button
              onClick={() =>
                item.quantity === 1
                  ? removeItem(item.id)
                  : updateQuantity(item.id, item.quantity - 1)
              }
              disabled={isLoading}
              className="p-1 hover:bg-brand-pink/50 transition-colors disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-sm min-w-[24px] text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={isLoading}
              className="p-1 hover:bg-brand-pink/50 transition-colors disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            disabled={isLoading}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
