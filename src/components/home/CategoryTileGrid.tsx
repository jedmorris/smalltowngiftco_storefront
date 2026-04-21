"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Collection } from "@/lib/shopify/types";

interface Tile {
  label: string;
  handle: string;
  /** optional Shopify image override */
  imageUrl?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const fallbackTiles: Tile[] = [
  {
    label: "Teacher Gifts",
    handle: "teacher",
    gradientFrom: "from-apricot/80",
    gradientTo: "to-peach-soft",
  },
  {
    label: "4th of July",
    handle: "fourth-of-july",
    gradientFrom: "from-bougainvillea/80",
    gradientTo: "to-ocean-soft",
  },
  {
    label: "Pride",
    handle: "pride",
    gradientFrom: "from-lemon/80",
    gradientTo: "to-bougainvillea",
  },
  {
    label: "Bachelorette",
    handle: "bachelorette",
    gradientFrom: "from-peach/80",
    gradientTo: "to-apricot-deep/60",
  },
  {
    label: "New Arrivals",
    handle: "new-arrivals",
    gradientFrom: "from-ocean-soft",
    gradientTo: "to-stucco",
  },
];

interface CategoryTileGridProps {
  /** Optional: pass Shopify-fetched collections to source images/handles from */
  collections?: Collection[];
}

export default function CategoryTileGrid({ collections = [] }: CategoryTileGridProps) {
  // If Shopify collections match our handles, use their images; else fall back to gradient tiles.
  const byHandle = new Map(collections.map((c) => [c.handle, c]));

  const tiles = fallbackTiles.map((t) => {
    const live = byHandle.get(t.handle);
    return {
      ...t,
      imageUrl: live?.image?.url,
      label: live?.title ?? t.label,
    };
  });

  return (
    <section className="py-[3rem] lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader
          title="Shop by Occasion"
          subtitle="Find the perfect gift for every celebration"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tiles.map((tile) => (
            <Link
              key={tile.handle}
              href={`/collections/${tile.handle}`}
              className="group relative block aspect-[4/5] rounded-[18px] overflow-hidden bg-stucco image-grain no-underline"
              aria-label={`Shop ${tile.label}`}
            >
              {tile.imageUrl ? (
                <Image
                  src={tile.imageUrl}
                  alt={tile.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} transition-transform duration-500 group-hover:scale-105`}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg sm:text-xl text-paper font-medium leading-tight">
                  {tile.label}
                </h3>
                <span className="text-[11px] tracking-[0.18em] uppercase text-paper/80">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
