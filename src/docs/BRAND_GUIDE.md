# The Small Town Gift Co. — Brand Guide

**Version:** 1.0
**Last Updated:** 2026-03-16
**Live Reference:** [/brand-guide](https://smalltowngiftco.vercel.app/brand-guide)

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Logo & Visual Assets](#4-logo--visual-assets)
5. [Voice & Tone](#5-voice--tone)
6. [UI Component Library](#6-ui-component-library)
7. [Photography & Imagery](#7-photography--imagery)
8. [Social Media & Marketing](#8-social-media--marketing)
9. [Accessibility](#9-accessibility)

---

## 1. Brand Identity

### Brand Name

- **Full:** The Small Town Gift Co.
- **Casual:** Small Town Gift Co.
- **Never:** "Small Town Gifts", "STGC Co.", "The Small Town Gift Company"

### Brand Values

| Value | Meaning |
|-------|---------|
| **Thoughtful Gifting** | Every product curated with care, ensuring quality you can feel |
| **Small Town Heart** | Proud of our roots, grounded in community |
| **Made with Love** | Design-forward, personal, warm |
| **Celebration-Focused** | Weddings, bachelorettes, birthdays, just-because |

### Tagline

> From our small town to yours.

### Diamond Motif

The ◆ diamond is the brand's signature decorative element.

- Section dividers and list markers
- Accent before headings
- Always rendered in brand-gold (#B8935A)
- CSS class: `.bow-accent` (adds ◆ before and after text)

---

## 2. Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Tailwind | Usage |
|------|-----|-------------|----------|-------|
| Brand Blush | `#FFF0F0` | `--color-brand-blush` | `brand-blush` | Primary page background |
| Brand Pink | `#FCDEDE` | `--color-brand-pink` | `brand-pink` | Borders, hover states, soft accents |
| Brand Gold | `#B8935A` | `--color-brand-gold` | `brand-gold` | Primary accent, CTAs, links, icons |
| Brand Forest | `#2D4A3E` | `--color-brand-forest` | `brand-forest` | Announcements, secondary CTAs |
| Brand Cream | `#FDF8F5` | `--color-brand-cream` | `brand-cream` | Card backgrounds, image placeholders |
| Brand Charcoal | `#2C2C2C` | `--color-brand-charcoal` | `brand-charcoal` | Body text, headings |

### Extended Palette (Opacity Variants)

- `brand-gold/90` — hover state for primary buttons
- `brand-forest/90` — hover state for secondary buttons
- `brand-pink/50` — ghost button hover, interactive backgrounds
- `brand-pink/30` — icon backgrounds, dropdown hover states
- `brand-gold/30` — featured badge border, decorative borders
- `brand-gold/10` — subtle card borders, background tints

### Shadows (Gold-Tinted)

| Name | Value | CSS Variable | Usage |
|------|-------|-------------|-------|
| Soft | `0 2px 15px rgba(184,147,90,0.08)` | `--shadow-soft` | Cards at rest, subtle elevation |
| Medium | `0 4px 25px rgba(184,147,90,0.12)` | `--shadow-medium` | Cards on hover, modals |
| Strong | `0 8px 40px rgba(184,147,90,0.18)` | `--shadow-strong` | Hero sections, overlays |

### Color Pairing Rules

- **Charcoal on blush/white/cream:** ~12:1 contrast — use for all body text
- **Forest on white:** ~8:1 contrast — safe for all text sizes
- **Gold on white:** ~3.5:1 contrast — decorative only, or large text (18px+ / bold 14px+)
- **Gold bg + white text:** ~4.5:1 at button size — OK for CTAs
- **Never:** Gold text on cream background (insufficient contrast)

---

## 3. Typography

### Font Stack

| Role | Font | Source | CSS Variable | Tailwind |
|------|------|--------|-------------|----------|
| Headings | Playfair Display | Google Fonts | `--font-playfair` | `font-serif` |
| Body / UI | Inter | Google Fonts | `--font-inter` | `font-sans` |

### Type Scale

| Element | Classes | Example |
|---------|---------|---------|
| Hero H1 | `font-serif text-4xl sm:text-5xl lg:text-6xl` | Landing page hero |
| Section H2 | `font-serif text-2xl lg:text-3xl` | Section headings |
| Card H3 | `font-serif text-lg` or `text-xl` | Product/feature cards |
| Body | `text-base` (16px) | Paragraph text |
| Small | `text-sm` (14px) | Captions, secondary text |
| Labels | `text-xs uppercase tracking-wide` | Badges, category labels |

### Typography Rules

- Headings: always Playfair Display (`font-serif`)
- Body: always Inter (`font-sans`)
- No italics in headings
- Links: `text-brand-gold underline underline-offset-4 decoration-brand-gold/30`
- Section header pattern: ◆ diamond → heading → subtitle → `.decorative-underline`

---

## 4. Logo & Visual Assets

### Logo

- **File:** `/public/images/logo.png` (2700×2700px PNG, transparent bg)
- **Display sizes:** h-10 (mobile header), h-14 (desktop header), h-12 (footer)
- Always maintain aspect ratio (`w-auto`)
- Minimum clear space: equal to the height of the "T" in "The"

### Logo Do's and Don'ts

**Do:**
- Use on white, blush, or cream backgrounds
- Allow generous whitespace around the logo
- Use the `priority` flag when above the fold

**Don't:**
- Place on busy photographic backgrounds without an overlay
- Stretch, rotate, recolor, or add effects
- Use smaller than 80px wide
- Recreate or modify the logo in any way

### Other Assets

| Asset | File | Dimensions | Usage |
|-------|------|-----------|-------|
| Banner | `/public/images/banner.jpg` | 1680×420px WebP | Hero section with gradient overlay |
| Guarantee | `/public/images/guarantee.png` | 2700×2700px PNG | Trust/guarantee sections |

---

## 5. Voice & Tone

### Brand Personality

Warm, approachable, celebratory. Like a best friend who always finds the perfect gift.

### Voice Attributes

| Attribute | Meaning | Example |
|-----------|---------|---------|
| **Warm** | Not corporate or stiff | "We'd love to hear from you!" not "Contact our team." |
| **Personal** | First person plural, direct address | "From our small town to your doorstep" |
| **Celebratory** | Frame around occasions and joy | "Every moment memorable" |
| **Genuine** | Avoid hyperbole | "Curated with care" not "The world's best gifts" |
| **Concise** | Short sentences, breathing room | Favor brevity over exposition |

### Writing Examples

**Good:**
- "From our small town to your doorstep — every gift tells a story."
- "Not happy? We'll make it right or your money back."
- "Curated shirts, sweaters & personalized gifts."

**Avoid:**
- "We leverage our extensive gift curation expertise to deliver..."
- "AMAZING DEALS YOU WON'T BELIEVE!!!"
- "Dear Valued Customer,"

### Punctuation & Style

- Em dashes with spaces: " — " (elegant separator)
- Ampersands in short marketing copy: "shirts & sweaters"
- Decorative star ✦ for inline accents in announcements
- Oxford comma: yes
- Exclamation marks: sparingly (max one per block of copy)

---

## 6. UI Component Library

### Buttons

**File:** `src/components/ui/Button.tsx`

| Variant | Appearance | Use Case |
|---------|-----------|----------|
| `primary` | Gold bg, white text | Main CTAs: "Shop Now", "Add to Cart" |
| `secondary` | Forest bg, white text | Secondary CTAs: announcements, alt actions |
| `outline` | Gold border + text → gold bg on hover | Paired next to primary, "Best Sellers" |
| `ghost` | Charcoal text, pink/50 hover | Subtle actions: filters, toggles |
| `text` | Gold underline link style | Inline links, "View all" |

**Sizes:** `sm` (px-4 py-1.5), `md` (px-6 py-2.5), `lg` (px-8 py-3.5)

All non-text buttons are `rounded-full` with `active:scale-[0.97]` press feedback.

### Badges

**File:** `src/components/ui/Badge.tsx`

| Variant | Colors | Use Case |
|---------|--------|----------|
| `sale` | Forest bg, white text | Discount labels |
| `new` | Gold bg, white text | New arrivals |
| `soldOut` | Gray bg, white text | Out of stock |
| `featured` | Pink bg, charcoal text, gold/30 border | Promoted items |

All badges: `rounded-full`, `uppercase`, `tracking-wide`, `text-xs`, `font-semibold`.

### Cards

- Background: `bg-brand-cream` or `bg-white`
- Border radius: `rounded-2xl`
- Shadow: `shadow-[var(--shadow-soft)]` at rest, `shadow-[var(--shadow-medium)]` on hover
- Transition: `transition-shadow duration-300`
- Product cards: `aspect-square` image container

### Form Inputs

- Border: `border-brand-pink`
- Radius: `rounded-full`
- Focus: `ring-2 ring-brand-gold/30 border-brand-gold`
- Background: `bg-white`

### Animations

| Animation | Duration | Use |
|-----------|----------|-----|
| `fade-in-up` | 0.6s ease-out | Page entrance |
| `scale-in` | 0.4s ease-out | Modals, badges |
| `shimmer` | 2s infinite | Loading skeletons |
| `pulse-soft` | 2s ease-in-out infinite | Subtle pulsing |

- Staggered children: `animate-stagger` class, 100ms delay increments
- Hover scale: `group-hover:scale-105` on images
- Active press: `active:scale-[0.97]` on buttons

### Layout Constants

| Element | Value |
|---------|-------|
| Max width | `max-w-7xl` (1280px) |
| Page padding | `px-4` |
| Section spacing | `py-16 lg:py-20` |
| Header height | `h-16` (mobile), `h-20` (desktop) |
| Grid gap | `gap-4 lg:gap-6` |
| Border color | `border-brand-pink/50` |

### Decorative Elements

- **Diamond:** ◆ in brand-gold, `text-sm`, before section headings
- **Decorative underline:** 60px wide, 2px tall, gold gradient fading right (`.decorative-underline`)
- **Bow accent:** ◆ before and after text (`.bow-accent`)
- **Image overlays:** `.image-overlay-gradient`, `.image-overlay-vignette`

---

## 7. Photography & Imagery

### Product Photography

- **Aspect ratio:** 1:1 (square) for product cards
- **Background:** Clean, light (cream/white preferred)
- **Composition:** Product clearly visible, centered
- **Hover image:** Include alternate angle as second image (hover swap)
- **Alt text:** Required on all images

### Collection / Lifestyle Photography

- **Aspect ratio:** 3:4 for collection cards
- **Lighting:** Warm, natural preferred
- **Context:** People using/wearing products in lifestyle settings
- **Overlay:** Gradient applied: `from-black/60 via-black/10 to-transparent`

### Banner / Hero Photography

- **Aspect ratio:** ~4:1 (1680×420px or similar)
- **Composition:** Must work with left-aligned text overlay; right side can be busier
- **Overlay:** Always used with gradient for text readability

### Image Specifications

| Spec | Value |
|------|-------|
| Format | WebP preferred for photos, PNG for logos/badges |
| Minimum size | 1000×1000px for product images |
| Component | Next.js `<Image>` with `sizes` attribute |
| Loading | Lazy by default; `priority` only for above-fold hero/logo |

---

## 8. Social Media & Marketing

### Instagram

- **Grid aesthetic:** Warm pinks, golds, creams — maintain the blush palette
- **Product posts:** Clean white/cream background, centered product
- **Lifestyle posts:** Warm natural lighting, lifestyle context
- **Quote/text posts:** Brand-cream bg, Playfair serif headline, charcoal text
- **Stories:** Brand-gold for link stickers and CTAs
- **Caption voice:** Warm, personal, emojis sparingly (heart, sparkle, gift)
- **Hashtags:** #SmallTownGiftCo #ThoughtfulGifts #GiftIdeas #FromOurSmallTown

### Email Headers / Newsletters

- **Header:** Logo centered on blush or cream background
- **CTA buttons:** Gold bg, white text, rounded (match website primary button)
- **Section dividers:** Gold diamond ◆ or decorative underline
- **Font fallbacks:** Georgia (serif heading), Arial (body) for email clients
- **Max width:** 600px
- **Preheader text:** Conversational, teaser-style

### Packaging Inserts

- **Card size:** 4×6" or 5×7"
- **Background:** Cream or blush
- **Layout:** Logo at top (centered), thank-you message in Playfair Display
- **Body text:** Inter or closest print equivalent (system sans-serif)
- **Include:** Thank-you note, social handles, discount code for next order
- **Accent:** Diamond motif
- **Stock:** Quality cardstock, minimum 80lb

### Promotional Banners (On-Site)

- **Announcement bar:** Forest bg, white text, centered
- **Animation:** Rotating messages with fade transition
- **Promo codes:** Bold/strong tags
- **Separator:** Decorative star ✦

---

## 9. Accessibility

### Contrast Ratios

| Pairing | Ratio | Status |
|---------|-------|--------|
| Charcoal on blush | ~12:1 | WCAG AAA — body text |
| Forest on white | ~8:1 | WCAG AAA — all text |
| Gold on white | ~3.5:1 | WCAG AA large text only (18px+ or bold 14px+) |
| Gold bg + white text | ~4.5:1 | WCAG AA — buttons at md/lg size |

### Requirements

- All interactive elements have visible focus states (`ring-2 ring-brand-gold/30`)
- All images require descriptive alt text
- Icon-only buttons use `aria-label`
- Respect `prefers-reduced-motion` for animations
- Keyboard navigable throughout
