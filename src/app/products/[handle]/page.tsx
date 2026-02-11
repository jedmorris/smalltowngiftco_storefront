import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle, getProductHandles, getFeaturedProducts } from "@/lib/shopify";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductGrid from "@/components/product/ProductGrid";
import JsonLd from "@/components/seo/JsonLd";

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
  const [product, allProducts] = await Promise.all([
    getProductByHandle(handle),
    getFeaturedProducts(8),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <JsonLd product={product} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-pink/50">
            <div className="text-center mb-10">
              <span className="text-brand-gold text-sm">◆</span>
              <h2 className="font-serif text-2xl lg:text-3xl text-brand-charcoal mt-2 mb-2">
                You Might Also Love
              </h2>
              <div className="decorative-underline mx-auto" />
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </>
  );
}
