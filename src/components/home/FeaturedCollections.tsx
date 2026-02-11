"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@/lib/shopify/types";

interface FeaturedCollectionsProps {
  collections: Collection[];
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (collections.length === 0) return null;

  return (
    <section className="py-16 lg:py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold text-sm">◆</span>
          <h2 className="font-serif text-3xl lg:text-4xl text-brand-charcoal mt-2 mb-3">
            Shop by Collection
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Find the perfect gift for every celebration
          </p>
          <div className="decorative-underline mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {collections.map((collection, i) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className={`group block transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-cream shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-pink to-brand-blush" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl text-white transition-transform duration-300 group-hover:-translate-y-1">
                    {collection.title}
                  </h3>
                  <span className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    Shop now
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
