"use client";

import { useState } from "react";
import { Star, Heart, Share2, Shield, Truck, RotateCcw, Lock, ChevronDown, Circle } from "lucide-react";
import Price from "@/components/ui/Price";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { sanitizeHtml } from "@/lib/sanitize";

interface ProductInfoProps {
  product: Product;
}

const trustBadges = [
  { icon: Lock, label: "Secure Checkout" },
  { icon: Truck, label: "Free Shipping $75+" },
  { icon: Shield, label: "Love It Guarantee" },
  { icon: RotateCcw, label: "Easy Returns" },
];

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.availableForSale) || product.variants[0]
  );
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="font-serif font-normal text-3xl lg:text-4xl text-ink">
        {product.title}
      </h1>

      {/* Star rating placeholder */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-apricot-deep/30" strokeWidth={1.6} />
        ))}
        <span className="text-xs text-ink-subtle ml-1">No reviews yet</span>
      </div>

      {/* Price */}
      <Price
        price={selectedVariant.price}
        compareAtPrice={selectedVariant.compareAtPrice}
        className="text-lg"
      />

      {/* Stock indicator */}
      {selectedVariant.availableForSale ? (
        <div className="flex items-center gap-1.5 text-sm">
          <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500" />
          <span className="text-green-600">In Stock</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-sm">
          <Circle className="w-2.5 h-2.5 fill-ink-subtle text-ink-subtle" />
          <span className="text-ink-muted">Out of Stock</span>
        </div>
      )}

      {/* Variants */}
      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelect={setSelectedVariant}
      />

      {/* Add to Cart */}
      <AddToCartButton
        variantId={selectedVariant.id}
        availableForSale={selectedVariant.availableForSale}
      />

      {/* Wishlist + Share */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border-soft rounded-full text-sm text-ink hover:border-espresso transition-colors">
          <Heart className="w-4 h-4" strokeWidth={1.6} />
          Wishlist
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border-soft rounded-full text-sm text-ink hover:border-espresso transition-colors"
        >
          <Share2 className="w-4 h-4" strokeWidth={1.6} />
          Share
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-4 pt-6 border-t border-border-soft">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-1.5 text-xs text-ink-muted">
            <badge.icon className="w-3.5 h-3.5 text-apricot-deep flex-shrink-0" strokeWidth={1.6} />
            {badge.label}
          </div>
        ))}
      </div>

      {/* Collapsible Description */}
      {product.descriptionHtml && (
        <div className="border-t border-border-soft">
          <button
            onClick={() => setDescriptionOpen(!descriptionOpen)}
            className="flex items-center justify-between w-full py-4 text-left"
          >
            <h3 className="font-serif text-lg text-ink">Description</h3>
            <ChevronDown className={`w-5 h-5 text-ink-subtle transition-transform ${descriptionOpen ? "rotate-180" : ""}`} strokeWidth={1.6} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${descriptionOpen ? "max-h-[500px] pb-4" : "max-h-0"}`}>
            <div
              className="prose-boutique prose prose-sm text-ink-muted max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml) }}
            />
          </div>
        </div>
      )}

      {/* Collapsible Product Details */}
      <div className="border-t border-border-soft">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex items-center justify-between w-full py-4 text-left"
        >
          <h3 className="font-serif text-lg text-ink">Product Details</h3>
          <ChevronDown className={`w-5 h-5 text-ink-subtle transition-transform ${detailsOpen ? "rotate-180" : ""}`} strokeWidth={1.6} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${detailsOpen ? "max-h-[500px] pb-4" : "max-h-0"}`}>
          <dl className="space-y-2 text-sm">
            {product.vendor && (
              <div className="flex gap-2">
                <dt className="text-ink-subtle w-24">Brand</dt>
                <dd className="text-ink">{product.vendor}</dd>
              </div>
            )}
            {product.productType && (
              <div className="flex gap-2">
                <dt className="text-ink-subtle w-24">Type</dt>
                <dd className="text-ink">{product.productType}</dd>
              </div>
            )}
            {product.tags.length > 0 && (
              <div className="flex gap-2">
                <dt className="text-ink-subtle w-24">Tags</dt>
                <dd className="text-ink">{product.tags.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
