"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryLink {
  label: string;
  handle: string;
}

// Curated sidebar nav for collection pages. Order matches the merchandising
// priority; add/remove handles here to control sidebar ordering without
// touching individual pages.
const DEFAULT_CATEGORIES: CategoryLink[] = [
  { label: "New Arrivals", handle: "new-arrivals" },
  { label: "Best Sellers", handle: "best-sellers" },
  { label: "Teacher Gifts", handle: "teacher" },
  { label: "4th of July", handle: "fourth-of-july" },
  { label: "Pride", handle: "pride" },
  { label: "Bachelorette", handle: "bachelorette" },
  { label: "Comfort Colors®", handle: "comfort-colors" },
  { label: "Sweatshirts", handle: "sweatshirts" },
  { label: "Tees", handle: "tees" },
  { label: "Matching Sets", handle: "matching-sets" },
  { label: "Kids & Baby", handle: "kids" },
  { label: "Accessories", handle: "accessories" },
  { label: "Sale", handle: "sale" },
];

interface CategorySidebarProps {
  categories?: CategoryLink[];
  currentHandle?: string;
}

export default function CategorySidebar({
  categories = DEFAULT_CATEGORIES,
  currentHandle,
}: CategorySidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-[120px] lg:self-start" aria-label="Collection categories">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-4">
        Shop by category
      </h3>
      <ul className="space-y-2">
        {categories.map((c) => {
          const href = `/collections/${c.handle}`;
          const active = currentHandle === c.handle || pathname === href;
          return (
            <li key={c.handle}>
              <Link
                href={href}
                className={`block text-[14px] transition-colors no-underline py-0.5 ${
                  active
                    ? "text-apricot-deep font-semibold"
                    : "text-ink-muted hover:text-apricot-deep"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
