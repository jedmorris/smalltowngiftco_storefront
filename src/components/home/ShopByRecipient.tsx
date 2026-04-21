import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const tiles = [
  {
    label: "For Mom",
    handle: "for-mom",
    gradientFrom: "from-bougainvillea/80",
    gradientTo: "to-peach-soft",
  },
  {
    label: "For Teacher",
    handle: "teacher",
    gradientFrom: "from-apricot/80",
    gradientTo: "to-lemon",
  },
  {
    label: "For Bestie",
    handle: "for-bestie",
    gradientFrom: "from-ocean-soft",
    gradientTo: "to-bougainvillea-soft",
  },
  {
    label: "For Baby",
    handle: "for-baby",
    gradientFrom: "from-peach-soft",
    gradientTo: "to-stucco",
  },
];

export default function ShopByRecipient() {
  return (
    <section className="py-[3rem] lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader
          title="Shop by recipient"
          subtitle="Curated picks for the people you love"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {tiles.map((tile) => (
            <Link
              key={tile.handle}
              href={`/collections/${tile.handle}`}
              className="group relative block aspect-[5/6] rounded-[18px] overflow-hidden bg-stucco image-grain no-underline"
              aria-label={`Shop ${tile.label}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="font-serif text-lg md:text-xl text-paper font-medium mb-1">
                  {tile.label}
                </h3>
                <span className="text-[10px] tracking-[0.2em] uppercase text-paper/85">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
