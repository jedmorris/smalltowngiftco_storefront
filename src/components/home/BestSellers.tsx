import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Product } from "@/lib/shopify/types";

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-[4.5rem] lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader
          title="Best Sellers"
          subtitle="Our most-loved gifts, hand-picked for you"
        />

        <ProductGrid products={products} columns={4} />

        <div className="mt-10 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-apricot-deep font-medium text-sm hover:gap-2.5 transition-all"
          >
            View all products <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </section>
  );
}
