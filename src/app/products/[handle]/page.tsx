import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle, getProductHandles, getProductRecommendations } from "@/lib/shopify";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductGrid from "@/components/product/ProductGrid";
import ReviewSection from "@/components/product/ReviewSection";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import JsonLd from "@/components/seo/JsonLd";
import ProductViewTracker from "@/components/product/ProductViewTracker";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProductHandles();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    alternates: {
      canonical: `/products/${handle}`,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export const revalidate = 3600;

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const recommendations = await getProductRecommendations(product.id);
  const relatedProducts = recommendations.slice(0, 4);

  return (
    <>
      <JsonLd
        product={product}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/collections" },
          { name: product.title, url: `/products/${product.handle}` },
        ]}
      />
      <ProductViewTracker product={product} />

      <div className="max-w-[1280px] mx-auto px-4 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink-subtle mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-apricot-deep transition-colors no-underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-apricot-deep transition-colors no-underline">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink line-clamp-1 inline">{product.title}</span>
        </nav>

        {/* Main gallery + info */}
        <div id="product-main" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border-soft">
            <div className="text-center mb-8">
              <span className="text-gold text-[13px] tracking-[0.3em] uppercase">✦</span>
              <h2 className="font-serif text-2xl lg:text-3xl text-ink mt-1">
                You may also love
              </h2>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}

        {/* Reviews */}
        <div className="mt-16 pt-12 border-t border-border-soft">
          <ReviewSection productHandle={handle} />
        </div>
      </div>

      <StickyAddToCart product={product} triggerId="product-main" />
    </>
  );
}
