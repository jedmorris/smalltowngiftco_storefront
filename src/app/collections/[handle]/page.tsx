import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle, getCollectionHandles } from "@/lib/shopify";
import CollectionContent from "./CollectionContent";
import CategorySidebar from "@/components/collection/CategorySidebar";
import JsonLd from "@/components/seo/JsonLd";

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
    alternates: {
      canonical: `/collections/${handle}`,
    },
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
    <div className="max-w-[1280px] mx-auto px-4 py-8 lg:py-12">
      <JsonLd
        collection={collection}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Collections", url: "/collections" },
          { name: collection.title, url: `/collections/${collection.handle}` },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-ink-subtle mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-apricot-deep transition-colors no-underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:text-apricot-deep transition-colors no-underline">Collections</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{collection.title}</span>
      </nav>

      {/* Optional collection hero image banner */}
      {collection.image && (
        <div className="relative w-full h-40 lg:h-56 rounded-[18px] overflow-hidden mb-8">
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
      )}

      {/* Header row: title + meta */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl lg:text-5xl text-ink mb-2">{collection.title}</h1>
        {collection.description && (
          <p className="text-ink-muted max-w-2xl">{collection.description}</p>
        )}
        <p className="text-xs text-ink-subtle mt-2 uppercase tracking-[0.18em]">
          {collection.products.length} product{collection.products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Two-column body: sidebar + product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">
        <div className="hidden lg:block">
          <CategorySidebar currentHandle={handle} />
        </div>

        <div>
          <CollectionContent
            products={collection.products}
            collectionHandle={handle}
            initialPageInfo={collection.pageInfo}
          />
        </div>
      </div>
    </div>
  );
}
