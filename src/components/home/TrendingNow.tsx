import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Product } from "@/lib/shopify/types";

interface TrendingNowProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function TrendingNow({
  products,
  title = "Now trending",
  subtitle = "Selling fast — grab yours before they’re gone",
  ctaHref = "/collections/new-arrivals",
  ctaLabel = "Shop new arrivals",
}: TrendingNowProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-[3rem] lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} />

        <ProductGrid products={products} columns={4} />

        <div className="mt-8 text-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 text-apricot-deep font-medium text-sm hover:gap-2.5 transition-all"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </section>
  );
}
