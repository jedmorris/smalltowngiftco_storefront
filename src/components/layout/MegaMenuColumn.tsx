"use client";

import Link from "next/link";
import type { NavColumn } from "@/lib/navigation";

interface MegaMenuColumnProps {
  column: NavColumn;
  onNavigate?: () => void;
}

export default function MegaMenuColumn({ column, onNavigate }: MegaMenuColumnProps) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-4">
        {column.heading}
      </h4>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="text-[13px] text-ink-muted hover:text-apricot-deep transition-colors no-underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
