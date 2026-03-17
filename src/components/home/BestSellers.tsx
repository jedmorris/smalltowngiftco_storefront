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
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl text-brand-charcoal mb-3">
            Best Sellers
          </h2>
          <p className="text-gray-500">Our most-loved gifts, hand-picked for you</p>
        </div>

        <ProductGrid products={products} columns={4} />

        <div className="mt-10 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-brand-gold font-medium text-sm hover:gap-2.5 transition-all"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
