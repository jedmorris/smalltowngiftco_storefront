import type { Metadata } from "next";
import Link from "next/link";
import { searchProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/ProductGrid";
import SearchTracker from "@/components/analytics/SearchTracker";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}"` : "Search",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const products = query ? await searchProducts(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {query && <SearchTracker query={query} />}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-ink mb-3">
          {query ? `Results for "${query}"` : "Search"}
        </h1>
        {query && (
          <p className="text-ink-muted">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </p>
        )}
      </div>

      {!query ? (
        <p className="text-center text-ink-muted py-20">
          Enter a search term to find products.
        </p>
      ) : products.length > 0 ? (
        <ProductGrid products={products} columns={4} />
      ) : (
        <div className="text-center py-20">
          <p className="text-ink-muted mb-4">
            No products found for &ldquo;{query}&rdquo;.
          </p>
          <p className="text-sm text-ink-subtle">
            Try a different search term or browse our{" "}
            <Link href="/collections" className="text-apricot-deep hover:underline">
              collections
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
