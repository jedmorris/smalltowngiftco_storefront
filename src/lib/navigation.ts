// Navigation configuration — drives Header mega-menu + MobileNavDrawer.
// Mirrors Pink Lily's top-level nav shape adapted for STGC: Occasion + Recipient
// + product-type. Each top-level item either links directly or opens a mega-menu
// with grouped columns.

export interface NavColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface NavFeatured {
  imageUrl?: string; // optional featured-tile image (collection hero)
  title: string;
  ctaLabel: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** If `columns` is set, the item renders a mega-menu dropdown instead of a plain link */
  columns?: NavColumn[];
  featured?: NavFeatured;
  /** Highlight style — e.g. Sale renders in apricot-deep */
  emphasis?: "default" | "sale";
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "New",
    href: "/collections/new-arrivals",
  },
  {
    label: "Best Sellers",
    href: "/collections/best-sellers",
  },
  {
    label: "Shop by Occasion",
    href: "/collections",
    columns: [
      {
        heading: "Seasonal",
        links: [
          { label: "Teacher Gifts", href: "/collections/teacher" },
          { label: "Fourth of July", href: "/collections/fourth-of-july" },
          { label: "Pride", href: "/collections/pride" },
          { label: "Bachelorette", href: "/collections/bachelorette" },
        ],
      },
      {
        heading: "Celebrations",
        links: [
          { label: "Bridal", href: "/collections/bridal" },
          { label: "Mother's Day", href: "/collections/mothers-day" },
          { label: "Father's Day", href: "/collections/fathers-day" },
          { label: "Birthday", href: "/collections/birthday" },
        ],
      },
      {
        heading: "Year-round",
        links: [
          { label: "Christmas", href: "/collections/christmas" },
          { label: "Halloween", href: "/collections/halloween" },
          { label: "Valentine's Day", href: "/collections/valentines" },
          { label: "View all", href: "/collections" },
        ],
      },
    ],
    featured: {
      title: "Teacher Appreciation",
      ctaLabel: "Shop teacher gifts",
      href: "/collections/teacher",
    },
  },
  {
    label: "Shop by Recipient",
    href: "/collections",
    columns: [
      {
        heading: "For her",
        links: [
          { label: "For Mom", href: "/collections/for-mom" },
          { label: "For Grandma", href: "/collections/for-grandma" },
          { label: "For Bestie", href: "/collections/for-bestie" },
          { label: "For Bride", href: "/collections/for-bride" },
        ],
      },
      {
        heading: "For him",
        links: [
          { label: "For Dad", href: "/collections/for-dad" },
          { label: "For Grandpa", href: "/collections/for-grandpa" },
          { label: "For Groom", href: "/collections/for-groom" },
        ],
      },
      {
        heading: "For the little ones",
        links: [
          { label: "For Kids", href: "/collections/for-kids" },
          { label: "For Baby", href: "/collections/for-baby" },
          { label: "For Teachers", href: "/collections/teacher" },
        ],
      },
    ],
    featured: {
      title: "Gifts for Mom",
      ctaLabel: "Shop for mom",
      href: "/collections/for-mom",
    },
  },
  {
    label: "Apparel",
    href: "/collections",
    columns: [
      {
        heading: "Tops",
        links: [
          { label: "Tees", href: "/collections/tees" },
          { label: "Tanks", href: "/collections/tanks" },
          { label: "Long Sleeves", href: "/collections/long-sleeves" },
          { label: "Sweatshirts", href: "/collections/sweatshirts" },
        ],
      },
      {
        heading: "Styles",
        links: [
          { label: "Comfort Colors®", href: "/collections/comfort-colors" },
          { label: "Graphic Tees", href: "/collections/graphic-tees" },
          { label: "Matching Sets", href: "/collections/matching-sets" },
        ],
      },
      {
        heading: "Kids & Baby",
        links: [
          { label: "Kids Tees", href: "/collections/kids" },
          { label: "Baby Bodysuits", href: "/collections/baby" },
          { label: "Matching Family", href: "/collections/matching-family" },
        ],
      },
    ],
    featured: {
      title: "Matching Sets",
      ctaLabel: "Shop matching sets",
      href: "/collections/matching-sets",
    },
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
  },
  {
    label: "Sale",
    href: "/collections/sale",
    emphasis: "sale",
  },
];
