import Link from "next/link";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "All Products", href: "/collections" },
      { label: "Sale", href: "/collections/sale" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Our Story",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Brand Guide", href: "/brand-guide" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export default function FooterMegaGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {columns.map((col) => (
        <div key={col.heading}>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-4">
            {col.heading}
          </h3>
          <ul className="space-y-2.5">
            {col.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-muted hover:text-apricot-deep transition-colors no-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
