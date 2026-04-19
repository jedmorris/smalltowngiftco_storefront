// Brand constants for The Small Town Gift Co. — Positano Edition
// Source of truth for brand metadata — consumed by /brand-guide and available for tooling.

export const brandColors = [
  { name: "Paper", hex: "#FFF8EE", variable: "--color-paper", tailwind: "paper", usage: "Primary page background" },
  { name: "Paper Deep", hex: "#F9EBD5", variable: "--color-paper-deep", tailwind: "paper-deep", usage: "Alt page background" },
  { name: "Stucco", hex: "#F4E9D6", variable: "--color-stucco", tailwind: "stucco", usage: "Card warm / tile background" },
  { name: "Peach Soft", hex: "#FBE3D1", variable: "--color-peach-soft", tailwind: "peach-soft", usage: "Washes & light backgrounds" },
  { name: "Peach", hex: "#F6C9A8", variable: "--color-peach", tailwind: "peach", usage: "Sun-washed accent" },
  { name: "Apricot", hex: "#F3B488", variable: "--color-apricot", tailwind: "apricot", usage: "Ripe accent" },
  { name: "Apricot Deep", hex: "#E39A6E", variable: "--color-apricot-deep", tailwind: "apricot-deep", usage: "Primary CTA & links" },
  { name: "Bougainvillea Soft", hex: "#F5CDD4", variable: "--color-bougainvillea-soft", tailwind: "bougainvillea-soft", usage: "Washed pink accent" },
  { name: "Bougainvillea", hex: "#E08EA3", variable: "--color-bougainvillea", tailwind: "bougainvillea", usage: "Pink floral accent" },
  { name: "Ocean Soft", hex: "#BCD9D7", variable: "--color-ocean-soft", tailwind: "ocean-soft", usage: "Shallow teal" },
  { name: "Ocean", hex: "#7FB5B5", variable: "--color-ocean", tailwind: "ocean", usage: "Highlight / collection tone" },
  { name: "Ocean Deep", hex: "#4F8E8E", variable: "--color-ocean-deep", tailwind: "ocean-deep", usage: "Deep harbor" },
  { name: "Lemon", hex: "#F2D27B", variable: "--color-lemon", tailwind: "lemon", usage: "Accent yellow" },
  { name: "Espresso", hex: "#4A2E1F", variable: "--color-espresso", tailwind: "espresso", usage: "Announcement bar, dark CTA" },
  { name: "Espresso Soft", hex: "#6B4A38", variable: "--color-espresso-soft", tailwind: "espresso-soft", usage: "Medium espresso tint" },
  { name: "Ink", hex: "#33231A", variable: "--color-ink", tailwind: "ink", usage: "Body text & headings" },
  { name: "Ink Muted", hex: "#7A6458", variable: "--color-ink-muted", tailwind: "ink-muted", usage: "Secondary text" },
  { name: "Ink Subtle", hex: "#A89586", variable: "--color-ink-subtle", tailwind: "ink-subtle", usage: "Tertiary text" },
  { name: "Gold", hex: "#B8935A", variable: "--color-gold", tailwind: "gold", usage: "Logo wordmark" },
] as const;

export const brandShadows = [
  { name: "Soft", value: "0 2px 12px rgba(74, 46, 31, 0.06)", variable: "--shadow-soft", usage: "Cards at rest, subtle elevation" },
  { name: "Medium", value: "0 6px 24px rgba(74, 46, 31, 0.10)", variable: "--shadow-medium", usage: "Hover, modals" },
  { name: "Strong", value: "0 14px 40px rgba(74, 46, 31, 0.16)", variable: "--shadow-strong", usage: "Hero overlays, strong emphasis" },
] as const;

export const brandFonts = [
  { name: "Cormorant Garamond", role: "Headings", variable: "--font-cormorant", tailwind: "font-serif", fallback: "Georgia, serif" },
  { name: "DM Sans", role: "Body / UI", variable: "--font-dm-sans", tailwind: "font-sans", fallback: "system-ui, sans-serif" },
  { name: "Caveat", role: "Script accent", variable: "--font-caveat", tailwind: "font-script", fallback: "cursive" },
] as const;

export const buttonVariants = ["primary", "secondary", "outline", "soft", "ghost", "text"] as const;
export const buttonSizes = ["sm", "md", "lg"] as const;
export const badgeVariants = ["sale", "new", "soldOut", "featured", "limited"] as const;

export const badgeLabels: Record<typeof badgeVariants[number], string> = {
  sale: "SALE -20%",
  new: "NEW",
  soldOut: "SOLD OUT",
  featured: "FEATURED",
  limited: "LIMITED",
};
