import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCollections } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our curated collections of gifts for every occasion.",
};

export const revalidate = 3600;

export default async function CollectionsPage() {
  const collections = await getAllCollections();
  const displayCollections = collections.filter((c) => c.handle !== "frontpage");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-brand-charcoal mb-3">Our Collections</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Thoughtful gifts, curated for every celebration
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-brand-cream">
              {collection.image ? (
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-pink to-brand-blush" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="font-serif text-2xl text-white mb-1">{collection.title}</h2>
                {collection.description && (
                  <p className="text-white/80 text-sm line-clamp-2">{collection.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
