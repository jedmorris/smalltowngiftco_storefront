import { Instagram } from "lucide-react";

/**
 * Social proof / Instagram-style grid — v1 uses decorative placeholder tiles
 * with gradient art in the Positano palette. Plug in a real Instagram feed
 * widget (Curator / InstaFeed / Foursixty) later by swapping the tile grid
 * contents for an iframe or fetched feed.
 */
export default function SocialProofGrid() {
  const tiles = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    // rotating gradient classes to keep the grid lively
    classes:
      i % 6 === 0
        ? "from-bougainvillea-soft to-peach-soft"
        : i % 6 === 1
          ? "from-apricot to-peach"
          : i % 6 === 2
            ? "from-ocean-soft to-stucco"
            : i % 6 === 3
              ? "from-lemon/70 to-bougainvillea-soft"
              : i % 6 === 4
                ? "from-peach-soft to-apricot/60"
                : "from-stucco to-peach-soft",
  }));

  return (
    <section className="py-[3rem] lg:py-20 bg-paper-deep">
      <div className="max-w-[1280px] mx-auto px-4 text-center">
        <span className="text-gold text-[13px] tracking-[0.3em] uppercase">
          ✦ #smalltowngiftstyle
        </span>
        <h2 className="font-serif text-ink text-[clamp(1.75rem,1.25rem+1.5vw,2.25rem)] mt-3 mb-2">
          Share the love
        </h2>
        <p className="text-ink-muted text-sm md:text-base max-w-md mx-auto mb-8">
          Tag us on Instagram for a chance to be featured. We love seeing your gifts in the wild.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 max-w-[1000px] mx-auto mb-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={`relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${tile.classes} image-grain`}
              aria-hidden="true"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-ink/30 transition-opacity">
                <Instagram className="w-5 h-5 text-paper" strokeWidth={1.6} />
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://instagram.com/smalltowngiftco"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-apricot-deep font-medium text-sm hover:gap-3 transition-all no-underline"
        >
          <Instagram className="w-4 h-4" strokeWidth={1.8} />
          Follow us on Instagram
        </a>
      </div>
    </section>
  );
}
