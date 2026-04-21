"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Price from "@/components/ui/Price";
import AddToCartButton from "./AddToCartButton";
import type { Product } from "@/lib/shopify/types";

interface StickyAddToCartProps {
  product: Product;
  /** DOM id of the main (above-the-fold) Add to Cart button wrapper — used as a scroll threshold */
  triggerId?: string;
}

/**
 * Mobile sticky bar that appears once the user scrolls past the main ATC.
 * Desktop: hidden (main ATC is already persistent in the info column).
 */
export default function StickyAddToCart({ product, triggerId }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = triggerId
      ? document.getElementById(triggerId)
      : null;

    const onScroll = () => {
      if (!trigger) {
        setVisible(window.scrollY > 600);
        return;
      }
      const rect = trigger.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerId]);

  const firstVariant = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  if (!firstVariant) return null;

  const image = product.featuredImage;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-paper/95 backdrop-blur-md border-t border-border-soft px-4 py-3 shadow-strong"
        >
          <div className="max-w-[1280px] mx-auto flex items-center gap-3">
            {image && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-peach-soft">
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink truncate">
                {product.title}
              </p>
              <Price
                price={firstVariant.price}
                compareAtPrice={firstVariant.compareAtPrice}
                className="text-xs"
              />
            </div>
            <div className="flex-shrink-0 min-w-[140px]">
              <AddToCartButton
                variantId={firstVariant.id}
                availableForSale={firstVariant.availableForSale}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
