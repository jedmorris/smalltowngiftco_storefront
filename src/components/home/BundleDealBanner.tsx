import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Promotional banner mimicking Pink Lily's bundle-deal banner.
 * Two stacked offers with a CTA — visual treatment uses the Positano palette
 * (stucco bg, apricot-deep accent) rather than pink.
 */
export default function BundleDealBanner() {
  return (
    <section className="py-10">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-apricot-deep via-apricot to-peach-soft image-grain">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6 md:px-14 py-10 md:py-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-paper/85 mb-3">
                Bundle & save
              </p>
              <h2 className="font-serif text-paper text-[clamp(2rem,1.5rem+2vw,2.75rem)] leading-[1.05] mb-4">
                2 for $40 tees.<br />
                2 for $60 sweatshirts.
              </h2>
              <p className="text-paper/90 text-sm md:text-base mb-6 max-w-md">
                Mix, match & save automatically at checkout. No code needed — discount applies to any two qualifying pieces.
              </p>
              <Link
                href="/collections/bundle-deals"
                className="inline-flex items-center gap-1.5 bg-paper text-espresso px-6 py-3 rounded-full text-sm font-semibold hover:bg-white transition-colors no-underline"
              >
                Shop the bundle
                <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
              </Link>
            </div>

            {/* Right side: decorative product grid placeholder */}
            <div className="hidden md:grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[12px] bg-paper/25 backdrop-blur-sm border border-paper/20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
