"use client";

import { useState } from "react";
import { toast } from "sonner";
import TextLogo from "@/components/ui/TextLogo";
import GoldBow from "@/components/ui/GoldBow";
import SectionHeader from "@/components/ui/SectionHeader";
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

function ColorSwatch({
  name,
  hex,
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
      className="text-left bg-white rounded-[16px] overflow-hidden shadow-soft hover:shadow-medium transition-shadow group"
    >
      <div
        className="h-28 relative"
        style={{ backgroundColor: hex }}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? (
            <Check className="w-4 h-4 text-espresso" strokeWidth={1.6} />
          ) : (
            <Copy className="w-4 h-4 text-ink/50" strokeWidth={1.6} />
          )}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <p className="font-medium text-sm text-ink">{name}</p>
        <p className="text-xs text-ink-muted font-mono">{hex}</p>
        <p className="text-xs text-ink-subtle">{tailwind}</p>
        <p className="text-xs text-ink-subtle italic">{usage}</p>
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
      className="bg-white rounded-[16px] p-6 text-center"
      style={{ boxShadow: value }}
    >
      <p className="font-medium text-sm text-ink mb-1">{name}</p>
      <p className="text-xs text-ink-muted font-mono">{variable}</p>
      <p className="text-xs text-ink-subtle mt-1">{usage}</p>
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
    <nav className="bg-white rounded-[16px] p-6 shadow-soft">
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-3 font-medium">
        On this page
      </p>
      <ul className="space-y-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-sm text-ink-muted hover:text-apricot-deep transition-colors"
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
        <span className="text-apricot-deep text-[13px] tracking-[0.3em] uppercase font-medium">✦</span>
        <h1 className="font-serif font-normal text-4xl lg:text-5xl text-ink mt-2 mb-4">
          Brand Guide
        </h1>
        <p className="text-ink-muted text-lg max-w-2xl mx-auto">
          Visual identity, components, and brand standards for The Small Town
          Gift Co. — Positano Edition.
        </p>
        <div className="flex justify-center items-center gap-2.5 mt-4">
          <span className="block w-10 h-px bg-gradient-to-r from-transparent to-gold" />
          <GoldBow width={36} opacity={0.85} />
          <span className="block w-10 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-20 max-w-xs mx-auto">
        <TableOfContents />
      </div>

      {/* 1. Brand Identity */}
      <section className="mb-20">
        <SectionHeader title="Brand Identity" subtitle="Who we are and what we stand for" className="scroll-mt-24" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" id="identity">
          <div className="bg-white rounded-[16px] p-8 shadow-soft">
            <h3 className="font-serif text-xl text-ink mb-4">Brand Name</h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><strong className="text-ink">Full:</strong> The Small Town Gift Co.</li>
              <li><strong className="text-ink">Casual:</strong> Small Town Gift Co.</li>
              <li className="text-red-400"><strong>Never:</strong> &quot;Small Town Gifts&quot;, &quot;STGC Co.&quot;</li>
            </ul>
          </div>

          <div className="bg-white rounded-[16px] p-8 shadow-soft">
            <h3 className="font-serif text-xl text-ink mb-4">Tagline</h3>
            <p className="font-serif text-2xl text-apricot-deep italic">
              &quot;From our small town to yours.&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-apricot-deep">❋</span>
              <p className="text-sm text-ink-muted">
                The bloom motif — our signature decorative accent
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Thoughtful Gifting", desc: "Every product curated with care" },
            { title: "Small Town Heart", desc: "Proud of our roots, grounded in community" },
            { title: "Packed with Love", desc: "Design-forward, personal, warm" },
            { title: "Celebration-Focused", desc: "Weddings, bachelorettes, birthdays, just-because" },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-[16px] p-6 shadow-soft text-center">
              <span className="text-apricot-deep text-sm">❋</span>
              <h4 className="font-serif text-base text-ink mt-1 mb-2">{v.title}</h4>
              <p className="text-xs text-ink-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Color Palette */}
      <section className="mb-20" id="colors">
        <SectionHeader
          title="Color Palette"
          subtitle="Positano Edition — Italian Riviera pastels, warm and sun-washed"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {brandColors.map((color) => (
            <ColorSwatch key={color.hex} {...color} />
          ))}
        </div>

        <h3 className="font-serif text-xl text-ink mb-4 text-center">
          Espresso-Tinted Shadows
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {brandShadows.map((shadow) => (
            <ShadowCard key={shadow.name} {...shadow} />
          ))}
        </div>
      </section>

      {/* 3. Typography */}
      <section className="mb-20" id="typography">
        <SectionHeader
          title="Typography"
          subtitle="Cormorant Garamond for headings, DM Sans for body, Caveat for script accents"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandFonts.map((font) => (
            <div key={font.name} className="bg-white rounded-[16px] p-8 shadow-soft">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-4 font-medium">
                {font.role}
              </p>
              <div className={
                font.tailwind === "font-serif" ? "font-serif" :
                font.tailwind === "font-script" ? "font-script" : "font-sans"
              }>
                <p className="text-4xl text-ink mb-2">{font.name}</p>
                <p className="text-2xl text-ink/70 mb-2">Aa Bb Cc Dd Ee Ff Gg</p>
                <p className="text-lg text-ink/50 mb-4">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="border-t border-border-soft pt-4 space-y-1">
                <p className="text-xs text-ink-subtle font-mono">CSS: {font.variable}</p>
                <p className="text-xs text-ink-subtle font-mono">Tailwind: {font.tailwind}</p>
                <p className="text-xs text-ink-subtle">Fallback: {font.fallback}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Type Scale Demo */}
        <div className="mt-8 bg-white rounded-[16px] p-8 shadow-soft">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-6 font-medium">Type Scale</p>
          <div className="space-y-4">
            {[
              { label: "Hero H1", cls: "font-serif text-4xl sm:text-5xl text-ink font-normal", text: "Every Gift Tells a Story" },
              { label: "Section H2", cls: "font-serif text-2xl lg:text-3xl text-ink font-normal", text: "New Arrivals" },
              { label: "Card H3", cls: "font-serif text-lg text-ink font-medium", text: "Bachelorette Collection" },
              { label: "Body", cls: "text-base text-ink-muted", text: "Thoughtful gifts for every occasion, curated with love from our small town." },
              { label: "Small", cls: "text-sm text-ink-muted", text: "Free shipping on orders over $75" },
              { label: "Eyebrow", cls: "text-[11px] uppercase tracking-[0.18em] text-ink-muted font-medium", text: "NEW ARRIVAL" },
              { label: "Script", cls: "font-script text-[28px] text-bougainvillea", text: "love" },
            ].map(({ label, cls, text }) => (
              <div key={label} className="flex items-baseline gap-4">
                <span className="text-xs text-ink-subtle w-20 flex-shrink-0">{label}</span>
                <p className={cls}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Logo & Assets */}
      <section className="mb-20" id="logo">
        <SectionHeader title="Logo & Assets" subtitle="Usage guidelines and visual assets" />

        <div className="bg-white rounded-[16px] p-8 shadow-soft mb-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-6 font-medium">
            Text Logo at multiple sizes
          </p>
          <div className="space-y-6">
            {(["lg", "md", "sm"] as const).map((size) => (
              <div key={size} className="flex items-center gap-6">
                <div className="bg-paper rounded-[16px] px-6 py-4">
                  <TextLogo size={size} asLink={false} />
                </div>
                <div>
                  <p className="text-xs text-ink-subtle">{size === "lg" ? "Desktop header" : size === "md" ? "Footer" : "Mobile header"}</p>
                  <p className="text-xs text-ink-subtle font-mono">size=&quot;{size}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink mb-3">Do&apos;s</h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li className="flex gap-2"><span className="text-espresso">&#10003;</span>Always use Cormorant Garamond, font-semibold</li>
              <li className="flex gap-2"><span className="text-espresso">&#10003;</span>Display on white, paper, or stucco backgrounds</li>
              <li className="flex gap-2"><span className="text-espresso">&#10003;</span>Allow generous whitespace around the logo</li>
            </ul>
          </div>
          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink mb-3">Don&apos;ts</h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use a different font or weight</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Change letter spacing or capitalization</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Place on busy backgrounds without overlay</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Voice & Tone */}
      <section className="mb-20" id="voice">
        <SectionHeader
          title="Voice & Tone"
          subtitle="Warm, approachable, celebratory — like a best friend just back from Positano"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { attr: "Warm", desc: "Not corporate or stiff", example: '"We\'d love to hear from you!"' },
            { attr: "Personal", desc: 'First person ("we", "our", "you")', example: '"From our small town to your doorstep"' },
            { attr: "Celebratory", desc: "Frame around occasions and joy", example: '"Every gift, an invitation."' },
            { attr: "Genuine", desc: "Avoid hyperbole", example: '"Curated with care"' },
          ].map((v) => (
            <div key={v.attr} className="bg-white rounded-[16px] p-6 shadow-soft">
              <h4 className="font-serif text-lg text-ink mb-1">{v.attr}</h4>
              <p className="text-xs text-ink-subtle mb-3">{v.desc}</p>
              <p className="text-sm text-apricot-deep italic">{v.example}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-espresso mb-4">Good Examples</h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="border-l-2 border-apricot-deep pl-3">&quot;From our small town to your doorstep — every gift tells a story.&quot;</li>
              <li className="border-l-2 border-apricot-deep pl-3">&quot;Not happy? We&apos;ll make it right.&quot;</li>
              <li className="border-l-2 border-apricot-deep pl-3">&quot;Curated shirts, sweaters &amp; personalized gifts.&quot;</li>
            </ul>
          </div>
          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-red-400 mb-4">Avoid</h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="border-l-2 border-red-300 pl-3 line-through decoration-red-300">&quot;We leverage our extensive gift curation expertise...&quot;</li>
              <li className="border-l-2 border-red-300 pl-3 line-through decoration-red-300">&quot;AMAZING DEALS YOU WON&apos;T BELIEVE!!!&quot;</li>
              <li className="border-l-2 border-red-300 pl-3 line-through decoration-red-300">&quot;Dear Valued Customer,&quot;</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Buttons */}
      <section className="mb-20" id="buttons">
        <SectionHeader
          title="Buttons"
          subtitle="Six variants, three sizes — all rendered live from Button.tsx"
        />

        <div className="bg-white rounded-[16px] p-8 shadow-soft">
          <div className="space-y-8">
            {buttonVariants.map((variant) => (
              <div key={variant}>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-sm font-medium text-ink capitalize">{variant}</p>
                  <span className="text-xs text-ink-subtle font-mono">variant=&quot;{variant}&quot;</span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Badges */}
      <section className="mb-20" id="badges">
        <SectionHeader title="Badges" subtitle="Product labels — rendered live from Badge.tsx" />

        <div className="bg-white rounded-[16px] p-8 shadow-soft">
          <div className="flex flex-wrap gap-4">
            {badgeVariants.map((variant) => (
              <div key={variant} className="text-center">
                <Badge variant={variant}>{badgeLabels[variant]}</Badge>
                <p className="text-xs text-ink-subtle mt-2 font-mono">{variant}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Cards & Shadows */}
      <section className="mb-20" id="cards">
        <SectionHeader title="Cards & Decorative Elements" subtitle="Warm radii, espresso-tinted shadows, and Positano motifs" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-stucco rounded-[16px] p-6 shadow-soft hover:shadow-medium transition-shadow">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-2 font-medium">Product tile</p>
            <p className="font-serif text-lg text-ink mb-1">Product Title</p>
            <p className="text-sm text-ink-muted">shadow-soft at rest, shadow-medium on hover</p>
          </div>
          <div className="bg-white rounded-[16px] p-6 shadow-soft hover:shadow-medium transition-shadow">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-2 font-medium">Feature card</p>
            <p className="font-serif text-lg text-ink mb-1">Feature Card</p>
            <p className="text-sm text-ink-muted">rounded-[16px], white bg</p>
          </div>
          <div className="bg-peach-soft rounded-[16px] p-6 border border-apricot-deep/25">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-2 font-medium">Callout</p>
            <p className="font-serif text-lg text-ink mb-1">Callout Card</p>
            <p className="text-sm text-ink-muted">peach-soft bg, apricot border</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-white rounded-[16px] p-8 shadow-soft">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle mb-6 font-medium">Decorative Elements</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-ink-muted mb-2">Bloom eyebrow + heading + bow separator:</p>
              <span className="text-apricot-deep text-[13px] tracking-[0.3em] uppercase font-medium">✦</span>
              <p className="font-serif text-2xl text-ink mt-1 font-normal">Section Heading</p>
              <div className="flex items-center gap-2.5 mt-3">
                <span className="block w-10 h-px bg-gradient-to-r from-transparent to-gold" />
                <GoldBow width={36} opacity={0.85} />
                <span className="block w-10 h-px bg-gradient-to-l from-transparent to-gold" />
              </div>
            </div>
            <div>
              <p className="text-sm text-ink-muted mb-2">Decorative underline:</p>
              <div className="decorative-underline" />
            </div>
            <div>
              <p className="text-sm text-ink-muted mb-2">Form input (pill, border-soft):</p>
              <input
                type="text"
                placeholder="your@email.com"
                readOnly
                className="px-5 py-[11px] border border-border-soft rounded-full text-sm focus:outline-none focus:ring-[3px] focus:ring-apricot-deep/25 focus:border-apricot-deep bg-white w-full max-w-sm font-sans"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Photography */}
      <section className="mb-20" id="photography">
        <SectionHeader title="Photography & Imagery" subtitle="Sun-bleached warmth, soft shadows, subtle film grain" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Product Photos", ratio: "aspect-square", label: "1:1 / 4:5 ratio", tips: ["Clean, warm background", "Product centered and clear", "Include alternate angle for hover swap", "Minimum 1000x1000px"] },
            { title: "Collection / Lifestyle", ratio: "aspect-[3/4]", label: "3:4 ratio", tips: ["Warm, natural lighting", "Lifestyle context preferred", "Espresso-tinted gradient overlay for text", "WebP format preferred"] },
            { title: "Hero / Banner", ratio: "aspect-[4/1]", label: "~4:1 ratio", tips: ["Pastel wash or lifestyle image", "Left-aligned text overlay compatible", "520px height standard", "Priority loading when above-fold"] },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-[16px] p-6 shadow-soft">
              <h3 className="font-serif text-lg text-ink mb-3">{item.title}</h3>
              <div className={`${item.ratio} bg-stucco rounded-[16px] mb-3 flex items-center justify-center image-grain`}>
                <p className="text-xs text-ink-subtle">{item.label}</p>
              </div>
              <ul className="space-y-1 text-xs text-ink-muted">
                {item.tips.map((tip) => <li key={tip}>{tip}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Social & Marketing */}
      <section className="mb-12" id="social">
        <SectionHeader title="Social Media & Marketing" subtitle="Instagram, email, packaging, and on-site promos" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink mb-4">Instagram</h3>
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {["#FFF8EE", "#E39A6E", "#F4E9D6", "#F5CDD4", "#4A2E1F", "#FBE3D1", "#7FB5B5", "#F6C9A8", "#E08EA3"].map((color, i) => (
                <div key={i} className="aspect-square rounded-[10px]" style={{ backgroundColor: color }} />
              ))}
            </div>
            <ul className="space-y-1 text-xs text-ink-muted">
              <li>Maintain Positano palette across grid</li>
              <li>Quote posts: stucco bg, Cormorant headline</li>
              <li>Apricot-deep for link stickers and CTAs</li>
              <li>#SmallTownGiftCo #ThoughtfulGifts</li>
            </ul>
          </div>

          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink mb-4">Email Newsletters</h3>
            <div className="border border-border-soft rounded-[16px] overflow-hidden mb-4">
              <div className="bg-paper px-4 py-3 text-center">
                <p className="font-serif text-sm text-ink">The Small Town Gift Co.</p>
              </div>
              <div className="bg-white p-4 text-center">
                <p className="font-serif text-base text-ink mb-1">New Arrivals Are Here</p>
                <p className="text-xs text-ink-muted mb-3">Curated with love, just for you.</p>
                <span className="inline-block bg-apricot-deep text-white text-xs px-4 py-1.5 rounded-full">Shop Now</span>
              </div>
            </div>
            <ul className="space-y-1 text-xs text-ink-muted">
              <li>Logo centered on paper/stucco header</li>
              <li>Max width: 600px</li>
              <li>Font fallbacks: Georgia / system-ui</li>
              <li>Apricot-deep CTAs matching website</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink mb-4">Packaging Inserts</h3>
            <div className="bg-stucco rounded-[16px] p-6 text-center mb-4 border border-apricot-deep/10">
              <p className="text-apricot-deep text-xs mb-2">❋</p>
              <p className="font-serif text-base text-ink mb-1">Thank You!</p>
              <p className="text-xs text-ink-muted mb-3">We hope you love your gift as much as we loved picking it out.</p>
              <p className="text-xs text-apricot-deep font-medium">SAVE15 — 15% off your next order</p>
              <p className="text-[10px] text-ink-subtle mt-2">@smalltowngiftco</p>
            </div>
            <ul className="space-y-1 text-xs text-ink-muted">
              <li>4x6&quot; or 5x7&quot; card size</li>
              <li>Stucco or paper background</li>
              <li>Include discount code + social handles</li>
              <li>Minimum 80lb cardstock</li>
            </ul>
          </div>

          <div className="bg-white rounded-[16px] p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink mb-4">On-Site Promos</h3>
            <div className="bg-espresso rounded-[16px] px-4 py-2.5 text-center mb-4">
              <p className="text-paper text-xs">
                ✦ Free Shipping on Orders $75+ ✦ Use Code{" "}
                <strong className="text-peach">SUMMER15</strong> for 15% Off
              </p>
            </div>
            <ul className="space-y-1 text-xs text-ink-muted">
              <li>Announcement bar: espresso bg, paper text</li>
              <li>Rotating messages with fade transition</li>
              <li>Promo codes highlighted in peach</li>
              <li>✦ star as separator (not ◆)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
