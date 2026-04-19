"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart } from "lucide-react";
import { useQuickView } from "@/context/QuickViewContext";
import { useWishlist } from "@/context/WishlistContext";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";
import Price from "@/components/ui/Price";
import { isOnSale, getSalePercentage } from "@/lib/shopify";
import Badge from "@/components/ui/Badge";

export default function QuickViewModal() {
  const { product, isOpen, closeQuickView } = useQuickView();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeQuickView();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closeQuickView]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        modalRef.current?.querySelector<HTMLElement>("button")?.focus();
      }, 100);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const selectedVariant = product?.variants[selectedVariantIndex] ?? product?.variants[0];
  const wishlisted = product ? isInWishlist(product.id) : false;
  const price = selectedVariant?.price ?? product?.priceRange.minVariantPrice;
  const compareAtPrice = selectedVariant?.compareAtPrice ?? product?.compareAtPriceRange?.minVariantPrice;
  const onSale = price && compareAtPrice ? isOnSale(price, compareAtPrice) : false;

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/40 z-40"
            onClick={closeQuickView}
          />
          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.title}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl sm:max-h-[85vh] bg-white z-50 rounded-[20px] shadow-strong overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={closeQuickView}
              className="absolute top-3 right-3 z-10 p-1.5 bg-white/90 hover:bg-peach-soft rounded-full transition-colors"
              aria-label="Close quick view"
            >
              <X className="w-5 h-5" strokeWidth={1.6} />
            </button>

            <div className="flex flex-col sm:flex-row overflow-y-auto">
              {/* Image */}
              <div className="relative sm:w-1/2 aspect-square bg-stucco flex-shrink-0">
                {product.featuredImage ? (
                  <Image
                    src={selectedVariant?.image?.url ?? product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-subtle">
                    No image
                  </div>
                )}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {!product.availableForSale && <Badge variant="soldOut">Sold Out</Badge>}
                  {onSale && compareAtPrice && price && (
                    <Badge variant="sale">-{getSalePercentage(price, compareAtPrice)}%</Badge>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="sm:w-1/2 p-6 flex flex-col">
                <p className="text-xs text-apricot-deep/60 uppercase tracking-wider mb-1">
                  {product.vendor}
                </p>
                <h2 className="font-serif text-xl lg:text-2xl text-ink mb-2">
                  {product.title}
                </h2>
                {price && (
                  <div className="mb-4">
                    <Price price={price} compareAtPrice={compareAtPrice} className="text-lg" />
                  </div>
                )}

                <p className="text-sm text-ink-muted mb-6 line-clamp-4">
                  {product.description}
                </p>

                {selectedVariant && (
                  <div className="mb-6">
                    <VariantSelector
                      variants={product.variants}
                      selectedVariant={selectedVariant}
                      onSelect={(v) => {
                        const idx = product.variants.findIndex((pv) => pv.id === v.id);
                        setSelectedVariantIndex(idx >= 0 ? idx : 0);
                      }}
                    />
                  </div>
                )}

                <div className="mt-auto space-y-3">
                  {selectedVariant && (
                    <AddToCartButton
                      variantId={selectedVariant.id}
                      availableForSale={selectedVariant.availableForSale}
                    />
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 border-[1.5px] rounded-full text-sm font-medium transition-colors ${
                        wishlisted
                          ? "border-apricot-deep bg-apricot-deep/10 text-apricot-deep"
                          : "border-border-soft text-ink hover:border-espresso"
                      }`}
                    >
                      <Heart className="w-4 h-4" strokeWidth={1.6} fill={wishlisted ? "currentColor" : "none"} />
                      {wishlisted ? "Saved" : "Save"}
                    </button>
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={closeQuickView}
                      className="flex-1 flex items-center justify-center py-2.5 border-[1.5px] border-border-soft rounded-full text-sm font-medium text-ink hover:border-espresso transition-colors no-underline"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
