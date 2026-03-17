import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle, getCollectionHandles } from "@/lib/shopify";
import CollectionContent from "./CollectionContent";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollectionHandles();
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) return {};

  return {
    title: collection.seo?.title || collection.title,
    description: collection.seo?.description || collection.description,
  };
}

export const revalidate = 3600;

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <span className="mx-2">·</span>
        <Link href="/collections" className="hover:text-brand-gold transition-colors">Collections</Link>
        <span className="mx-2">·</span>
        <span className="text-brand-charcoal">{collection.title}</span>
      </nav>

      {/* Collection Header */}
      <div className="text-center mb-10">
        {collection.image && (
          <div className="relative w-full h-48 lg:h-64 rounded-xl overflow-hidden mb-6">
            <Image
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="font-serif text-4xl lg:text-5xl text-white">
                {collection.title}
              </h1>
            </div>
          </div>
        )}
        {!collection.image && (
          <h1 className="font-serif text-4xl text-brand-charcoal mb-3">
            {collection.title}
          </h1>
        )}
        {collection.description && (
          <p className="text-gray-500 max-w-lg mx-auto">{collection.description}</p>
        )}
        <p className="text-sm text-gray-400 mt-2">
          {collection.products.length} product{collection.products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <CollectionContent products={collection.products} />
    </div>
  );
}
