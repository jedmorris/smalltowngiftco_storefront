// Brand constants for The Small Town Gift Co.
// Source of truth for brand metadata — consumed by /brand-guide and available for tooling.

export const brandColors = [
  { name: "Brand Blush", hex: "#FFF0F0", variable: "--color-brand-blush", tailwind: "brand-blush", usage: "Primary page background" },
  { name: "Brand Pink", hex: "#FCDEDE", variable: "--color-brand-pink", tailwind: "brand-pink", usage: "Borders, hover states, soft accents" },
  { name: "Brand Gold", hex: "#B8935A", variable: "--color-brand-gold", tailwind: "brand-gold", usage: "Primary accent, CTAs, links, icons" },
  { name: "Brand Forest", hex: "#2D4A3E", variable: "--color-brand-forest", tailwind: "brand-forest", usage: "Announcements, secondary CTAs" },
  { name: "Brand Cream", hex: "#FDF8F5", variable: "--color-brand-cream", tailwind: "brand-cream", usage: "Card backgrounds, image placeholders" },
  { name: "Brand Charcoal", hex: "#2C2C2C", variable: "--color-brand-charcoal", tailwind: "brand-charcoal", usage: "Body text, headings" },
] as const;

export const brandShadows = [
  { name: "Soft", value: "0 2px 15px rgba(184, 147, 90, 0.08)", variable: "--shadow-soft", usage: "Cards at rest, subtle elevation" },
  { name: "Medium", value: "0 4px 25px rgba(184, 147, 90, 0.12)", variable: "--shadow-medium", usage: "Cards on hover, modals" },
  { name: "Strong", value: "0 8px 40px rgba(184, 147, 90, 0.18)", variable: "--shadow-strong", usage: "Hero sections, overlays" },
] as const;

export const brandFonts = [
  { name: "Playfair Display", role: "Headings", variable: "--font-playfair", tailwind: "font-serif", fallback: "Georgia, serif" },
  { name: "Inter", role: "Body / UI", variable: "--font-inter", tailwind: "font-sans", fallback: "system-ui, sans-serif" },
] as const;

export const buttonVariants = ["primary", "secondary", "outline", "ghost", "text"] as const;
export const buttonSizes = ["sm", "md", "lg"] as const;
export const badgeVariants = ["sale", "new", "soldOut", "featured"] as const;

export const badgeLabels: Record<typeof badgeVariants[number], string> = {
  sale: "SALE -20%",
  new: "NEW",
  soldOut: "SOLD OUT",
  featured: "FEATURED",
};
