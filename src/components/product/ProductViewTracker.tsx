"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";
import type { Product } from "@/lib/shopify/types";

export default function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackViewItem(product);
  }, [product]);

  return null;
}
