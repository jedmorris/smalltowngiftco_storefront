"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
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
    <section className="py-[4.5rem] lg:py-24" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader
          title="Shop by Collection"
          subtitle="Find the perfect gift for every celebration"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {collections.map((collection, i) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className={`group block transition-all duration-700 no-underline ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-stucco image-grain">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-bougainvillea-soft to-peach-soft" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[22px]">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-paper/90 mb-1">
                    {collection.description?.slice(0, 30) || "Collection"}
                  </div>
                  <h3 className="font-serif text-2xl text-paper font-medium tracking-[0.01em] transition-transform duration-300 group-hover:-translate-y-1">
                    {collection.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-paper/85 text-[13px] mt-1.5 no-underline">
                    Shop now
                    <ArrowRight className="w-[13px] h-[13px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
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
