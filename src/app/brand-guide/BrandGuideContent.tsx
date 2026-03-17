"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import TextLogo from "@/components/ui/TextLogo";
import { Check, Copy } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  brandColors,
  brandShadows,
  brandFonts,
  buttonVariants,
  buttonSizes,
  badgeVariants,
  badgeLabels,
} from "@/lib/brand";

function SectionHeader({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id: string;
}) {
  return (
    <div className="text-center mb-12 scroll-mt-24" id={id}>
      <span className="text-brand-gold text-sm">◆</span>
      <h2 className="font-serif text-3xl lg:text-4xl text-brand-charcoal mt-2 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base max-w-xl mx-auto">{subtitle}</p>
      )}
      <div className="decorative-underline mx-auto" />
    </div>
  );
}

function ColorSwatch({
  name,
  hex,
  variable,
  tailwind,
  usage,
}: (typeof brandColors)[number]) {
  const [copied, setCopied] = useState(false);

  const copyHex = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyHex}
      className="text-left bg-white rounded-xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow group"
    >
      <div
        className="h-28 relative"
        style={{ backgroundColor: hex }}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? (
            <Check className="w-4 h-4 text-brand-forest" />
          ) : (
            <Copy className="w-4 h-4 text-brand-charcoal/50" />
          )}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <p className="font-medium text-sm text-brand-charcoal">{name}</p>
        <p className="text-xs text-gray-500 font-mono">{hex}</p>
        <p className="text-xs text-gray-400">{tailwind}</p>
        <p className="text-xs text-gray-400 italic">{usage}</p>
      </div>
    </button>
  );
}

function ShadowCard({
  name,
  value,
  variable,
  usage,
}: (typeof brandShadows)[number]) {
  return (
    <div
      className="bg-white rounded-xl p-6 text-center"
      style={{ boxShadow: value }}
    >
      <p className="font-medium text-sm text-brand-charcoal mb-1">{name}</p>
      <p className="text-xs text-gray-500 font-mono">{variable}</p>
      <p className="text-xs text-gray-400 mt-1">{usage}</p>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "identity", label: "Brand Identity" },
    { id: "colors", label: "Color Palette" },
    { id: "typography", label: "Typography" },
    { id: "logo", label: "Logo & Assets" },
    { id: "voice", label: "Voice & Tone" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "cards", label: "Cards & Shadows" },
    { id: "photography", label: "Photography" },
    { id: "social", label: "Social & Marketing" },
  ];

  return (
    <nav className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
        On this page
      </p>
      <ul className="space-y-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-sm text-gray-500 hover:text-brand-gold transition-colors"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BrandGuideContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-brand-gold text-sm">◆</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-brand-charcoal mt-2 mb-4">
          Brand Guide
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Visual identity, components, and brand standards for The Small Town
          Gift Co.
        </p>
        <div className="decorative-underline mx-auto" />
      </div>

      {/* Table of Contents */}
      <div className="mb-20 max-w-xs mx-auto">
        <TableOfContents />
      </div>

      {/* ─── 1. Brand Identity ─── */}
      <section className="mb-20">
        <SectionHeader
          id="identity"
          title="Brand Identity"
          subtitle="Who we are and what we stand for"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-xl text-brand-charcoal mb-4">
              Brand Name
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong>Full:</strong> The Small Town Gift Co.
              </li>
              <li>
                <strong>Casual:</strong> Small Town Gift Co.
              </li>
              <li className="text-red-400">
                <strong>Never:</strong> &quot;Small Town Gifts&quot;,
                &quot;STGC Co.&quot;, &quot;The Small Town Gift Company&quot;
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-xl text-brand-charcoal mb-4">
              Tagline
            </h3>
            <p className="font-serif text-2xl text-brand-gold italic">
              &quot;From our small town to yours.&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-brand-gold">◆</span>
              <p className="text-sm text-gray-500">
                The diamond motif — our signature decorative accent
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Thoughtful Gifting",
              desc: "Every product curated with care",
            },
            {
              title: "Small Town Heart",
              desc: "Proud of our roots, grounded in community",
            },
            {
              title: "Made with Love",
              desc: "Design-forward, personal, warm",
            },
            {
              title: "Celebration-Focused",
              desc: "Weddings, bachelorettes, birthdays, just-because",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)] text-center"
            >
              <span className="text-brand-gold text-sm">◆</span>
              <h4 className="font-serif text-base text-brand-charcoal mt-1 mb-2">
                {v.title}
              </h4>
              <p className="text-xs text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 2. Color Palette ─── */}
      <section className="mb-20">
        <SectionHeader
          id="colors"
          title="Color Palette"
          subtitle="Six curated colors — warm, approachable, premium"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {brandColors.map((color) => (
            <ColorSwatch key={color.hex} {...color} />
          ))}
        </div>

        <h3 className="font-serif text-xl text-brand-charcoal mb-4 text-center">
          Gold-Tinted Shadows
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {brandShadows.map((shadow) => (
            <ShadowCard key={shadow.name} {...shadow} />
          ))}
        </div>
      </section>

      {/* ─── 3. Typography ─── */}
      <section className="mb-20">
        <SectionHeader
          id="typography"
          title="Typography"
          subtitle="Playfair Display for headings, Inter for everything else"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandFonts.map((font) => (
            <div
              key={font.name}
              className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">
                {font.role}
              </p>
              <div
                className={
                  font.tailwind === "font-serif" ? "font-serif" : "font-sans"
                }
              >
                <p className="text-4xl text-brand-charcoal mb-2">{font.name}</p>
                <p className="text-2xl text-brand-charcoal/70 mb-2">
                  Aa Bb Cc Dd Ee Ff Gg
                </p>
                <p className="text-lg text-brand-charcoal/50 mb-4">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-1">
                <p className="text-xs text-gray-400 font-mono">
                  CSS: {font.variable}
                </p>
                <p className="text-xs text-gray-400 font-mono">
                  Tailwind: {font.tailwind}
                </p>
                <p className="text-xs text-gray-400">
                  Fallback: {font.fallback}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Type Scale Demo */}
        <div className="mt-8 bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-6">
            Type Scale
          </p>
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                Hero H1
              </span>
              <p className="font-serif text-4xl sm:text-5xl text-brand-charcoal">
                Every Gift Tells a Story
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                Section H2
              </span>
              <p className="font-serif text-2xl lg:text-3xl text-brand-charcoal">
                New Arrivals
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                Card H3
              </span>
              <p className="font-serif text-lg text-brand-charcoal">
                Bachelorette Collection
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                Body
              </span>
              <p className="text-base text-gray-600">
                Thoughtful gifts for every occasion, curated with love from our
                small town.
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                Small
              </span>
              <p className="text-sm text-gray-500">
                Free shipping on orders over $75
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                Label
              </span>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                New Arrival
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Logo & Assets ─── */}
      <section className="mb-20">
        <SectionHeader
          id="logo"
          title="Logo & Assets"
          subtitle="Usage guidelines and visual assets"
        />

        <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)] mb-6">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-6">
            Text Logo at multiple sizes
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="bg-brand-blush rounded-xl px-6 py-4">
                <TextLogo size="lg" asLink={false} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Desktop header</p>
                <p className="text-xs text-gray-400 font-mono">size=&quot;lg&quot;</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-brand-blush rounded-xl px-6 py-4">
                <TextLogo size="md" asLink={false} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Footer</p>
                <p className="text-xs text-gray-400 font-mono">size=&quot;md&quot;</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-brand-blush rounded-xl px-6 py-4">
                <TextLogo size="sm" asLink={false} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Mobile header</p>
                <p className="text-xs text-gray-400 font-mono">size=&quot;sm&quot;</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-3">
              Do&apos;s
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-brand-forest">&#10003;</span>
                Always use Playfair Display, font-bold
              </li>
              <li className="flex gap-2">
                <span className="text-brand-forest">&#10003;</span>
                Display on white, blush, or cream backgrounds
              </li>
              <li className="flex gap-2">
                <span className="text-brand-forest">&#10003;</span>
                Allow generous whitespace around the text
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-3">
              Don&apos;ts
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-red-400">&#10007;</span>
                Use a different font or weight
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">&#10007;</span>
                Change letter spacing or capitalization
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">&#10007;</span>
                Place on busy backgrounds without overlay
              </li>
            </ul>
          </div>
        </div>

        {/* Banner Preview */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">
            Hero Banner (with gradient overlay)
          </p>
          <div className="relative rounded-xl overflow-hidden aspect-[4/1]">
            <Image
              src="/images/banner.jpg"
              alt="The Small Town Gift Co. hero banner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/10" />
            <div className="absolute bottom-4 left-6">
              <p className="font-serif text-white text-xl">
                Sample overlay text
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Voice & Tone ─── */}
      <section className="mb-20">
        <SectionHeader
          id="voice"
          title="Voice & Tone"
          subtitle="Warm, approachable, celebratory — like a best friend who always finds the perfect gift"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              attr: "Warm",
              desc: "Not corporate or stiff",
              example: '"We\'d love to hear from you!"',
            },
            {
              attr: "Personal",
              desc: 'First person ("we", "our", "you")',
              example: '"From our small town to your doorstep"',
            },
            {
              attr: "Celebratory",
              desc: "Frame around occasions and joy",
              example: '"Every moment memorable"',
            },
            {
              attr: "Genuine",
              desc: "Avoid hyperbole",
              example: '"Curated with care"',
            },
          ].map((v) => (
            <div
              key={v.attr}
              className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]"
            >
              <h4 className="font-serif text-lg text-brand-charcoal mb-1">
                {v.attr}
              </h4>
              <p className="text-xs text-gray-400 mb-3">{v.desc}</p>
              <p className="text-sm text-brand-gold italic">{v.example}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-forest mb-4">
              Good Examples
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="border-l-2 border-brand-gold pl-3">
                &quot;From our small town to your doorstep — every gift tells a
                story.&quot;
              </li>
              <li className="border-l-2 border-brand-gold pl-3">
                &quot;Not happy? We&apos;ll make it right or your money
                back.&quot;
              </li>
              <li className="border-l-2 border-brand-gold pl-3">
                &quot;Curated shirts, sweaters &amp; personalized gifts.&quot;
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-red-400 mb-4">Avoid</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="border-l-2 border-red-300 pl-3 line-through decoration-red-300">
                &quot;We leverage our extensive gift curation expertise to
                deliver...&quot;
              </li>
              <li className="border-l-2 border-red-300 pl-3 line-through decoration-red-300">
                &quot;AMAZING DEALS YOU WON&apos;T BELIEVE!!!&quot;
              </li>
              <li className="border-l-2 border-red-300 pl-3 line-through decoration-red-300">
                &quot;Dear Valued Customer,&quot;
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 6. Buttons ─── */}
      <section className="mb-20">
        <SectionHeader
          id="buttons"
          title="Buttons"
          subtitle="Five variants, three sizes — all rendered live from Button.tsx"
        />

        <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]">
          <div className="space-y-8">
            {buttonVariants.map((variant) => (
              <div key={variant}>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-sm font-medium text-brand-charcoal capitalize">
                    {variant}
                  </p>
                  <span className="text-xs text-gray-400 font-mono">
                    variant=&quot;{variant}&quot;
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {size === "sm"
                        ? "Small"
                        : size === "md"
                          ? "Medium"
                          : "Large"}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Badges ─── */}
      <section className="mb-20">
        <SectionHeader
          id="badges"
          title="Badges"
          subtitle="Product labels — rendered live from Badge.tsx"
        />

        <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap gap-4">
            {badgeVariants.map((variant) => (
              <div key={variant} className="text-center">
                <Badge variant={variant}>{badgeLabels[variant]}</Badge>
                <p className="text-xs text-gray-400 mt-2 font-mono">
                  {variant}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Cards & Shadows ─── */}
      <section className="mb-20">
        <SectionHeader
          id="cards"
          title="Cards & Decorative Elements"
          subtitle="Rounded-xl cards, gold-tinted shadows, and brand motifs"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-brand-cream rounded-xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Card — Cream bg
            </p>
            <p className="font-serif text-lg text-brand-charcoal mb-1">
              Product Title
            </p>
            <p className="text-sm text-gray-500">
              shadow-soft at rest, shadow-medium on hover
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Card — White bg
            </p>
            <p className="font-serif text-lg text-brand-charcoal mb-1">
              Feature Card
            </p>
            <p className="text-sm text-gray-500">
              rounded-xl, transition-shadow duration-300
            </p>
          </div>
          <div className="bg-brand-cream/50 rounded-xl p-6 border border-brand-gold/10">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Card — Subtle border
            </p>
            <p className="font-serif text-lg text-brand-charcoal mb-1">
              Info Card
            </p>
            <p className="text-sm text-gray-500">
              border-brand-gold/10, no shadow
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-6">
            Decorative Elements
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Diamond ornament + heading + decorative underline:
              </p>
              <span className="text-brand-gold text-sm">◆</span>
              <p className="font-serif text-2xl text-brand-charcoal mt-1">
                Section Heading
              </p>
              <div className="decorative-underline" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Bow accent:</p>
              <p className="bow-accent text-sm text-brand-charcoal inline-block">
                Free Shipping on Orders $75+
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Form input (rounded-full, gray border):
              </p>
              <input
                type="text"
                placeholder="your@email.com"
                readOnly
                className="px-5 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold bg-white w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Photography ─── */}
      <section className="mb-20">
        <SectionHeader
          id="photography"
          title="Photography & Imagery"
          subtitle="Guidelines for product, lifestyle, and banner photography"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-3">
              Product Photos
            </h3>
            <div className="aspect-square bg-brand-cream rounded-xl mb-3 flex items-center justify-center">
              <p className="text-xs text-gray-400">1:1 ratio</p>
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>Clean, light background</li>
              <li>Product centered and clear</li>
              <li>Include alternate angle for hover swap</li>
              <li>Minimum 1000x1000px</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-3">
              Collection / Lifestyle
            </h3>
            <div className="aspect-[3/4] bg-brand-cream rounded-xl mb-3 flex items-center justify-center">
              <p className="text-xs text-gray-400">3:4 ratio</p>
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>Warm, natural lighting</li>
              <li>Lifestyle context preferred</li>
              <li>Gradient overlay for text readability</li>
              <li>WebP format preferred</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-3">
              Hero / Banner
            </h3>
            <div className="aspect-[4/1] bg-brand-cream rounded-xl mb-3 flex items-center justify-center">
              <p className="text-xs text-gray-400">~4:1 ratio</p>
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>Left-aligned text overlay compatible</li>
              <li>Always use with gradient overlay</li>
              <li>1680x420px or similar</li>
              <li>Priority loading when above-fold</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 10. Social & Marketing ─── */}
      <section className="mb-12">
        <SectionHeader
          id="social"
          title="Social Media & Marketing"
          subtitle="Instagram, email, packaging, and on-site promos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Instagram */}
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-4">
              Instagram
            </h3>
            {/* Mock grid showing palette */}
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {[
                "#FFF0F0",
                "#B8935A",
                "#FDF8F5",
                "#FCDEDE",
                "#2D4A3E",
                "#FFF0F0",
                "#B8935A",
                "#FDF8F5",
                "#FCDEDE",
              ].map((color, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>Maintain warm blush palette across grid</li>
              <li>Quote posts: cream bg, Playfair headline</li>
              <li>Gold for link stickers and CTAs</li>
              <li>#SmallTownGiftCo #ThoughtfulGifts</li>
            </ul>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-4">
              Email Newsletters
            </h3>
            {/* Mini email mockup */}
            <div className="border border-gray-100 rounded-xl overflow-hidden mb-4">
              <div className="bg-brand-blush px-4 py-3 text-center">
                <p className="font-serif text-sm text-brand-charcoal">
                  The Small Town Gift Co.
                </p>
              </div>
              <div className="bg-white p-4 text-center">
                <p className="font-serif text-base text-brand-charcoal mb-1">
                  New Arrivals Are Here
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Curated with love, just for you.
                </p>
                <span className="inline-block bg-brand-gold text-white text-xs px-4 py-1.5 rounded-full">
                  Shop Now
                </span>
              </div>
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>Logo centered on blush/cream header</li>
              <li>Max width: 600px</li>
              <li>Font fallbacks: Georgia / Arial</li>
              <li>Gold CTAs matching website buttons</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Packaging */}
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-4">
              Packaging Inserts
            </h3>
            {/* Mini insert mockup */}
            <div className="bg-brand-cream rounded-xl p-6 text-center mb-4 border border-brand-gold/10">
              <p className="text-brand-gold text-xs mb-2">◆</p>
              <p className="font-serif text-base text-brand-charcoal mb-1">
                Thank You!
              </p>
              <p className="text-xs text-gray-500 mb-3">
                We hope you love your gift as much as we loved picking it out.
              </p>
              <p className="text-xs text-brand-gold font-medium">
                SAVE15 — 15% off your next order
              </p>
              <p className="text-[10px] text-gray-400 mt-2">
                @smalltowngiftco
              </p>
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>4x6&quot; or 5x7&quot; card size</li>
              <li>Cream or blush background</li>
              <li>Include discount code + social handles</li>
              <li>Minimum 80lb cardstock</li>
            </ul>
          </div>

          {/* On-Site Promos */}
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-lg text-brand-charcoal mb-4">
              On-Site Promos
            </h3>
            {/* Mini announcement bar mockup */}
            <div className="bg-brand-forest rounded-xl px-4 py-2.5 text-center mb-4">
              <p className="text-white text-xs">
                ✦ Free Shipping on Orders $75+ ✦ Use Code{" "}
                <strong>SPRING15</strong> for 15% Off
              </p>
            </div>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>Announcement bar: forest bg, white text</li>
              <li>Rotating messages with fade transition</li>
              <li>Promo codes in bold/strong</li>
              <li>✦ star as separator</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
