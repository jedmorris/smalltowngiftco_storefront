import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/lib/shopify/types";

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-brand-gold text-sm">◆</span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-charcoal mt-2 mb-2">
              Best Sellers
            </h2>
            <p className="text-gray-500">Our most-loved gifts, hand-picked for you</p>
            <div className="decorative-underline" />
          </div>
          <Link
            href="/collections"
            className="hidden sm:inline-flex items-center gap-1 text-brand-gold font-medium hover:gap-2 transition-all"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} columns={4} />

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1 text-brand-gold font-medium"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
