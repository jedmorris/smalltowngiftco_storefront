"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MegaMenuColumn from "./MegaMenuColumn";
import type { NavItem } from "@/lib/navigation";

interface MegaMenuProps {
  item: NavItem;
  open: boolean;
  onClose: () => void;
}

/**
 * Mega-menu dropdown — renders grouped columns plus an optional featured tile
 * on the right. Keyed off `open` prop; the parent (Header) controls state based
 * on hover/focus so keyboard users can tab through and screen readers announce
 * expansion. Close on Esc via parent.
 */
export default function MegaMenu({ item, open, onClose }: MegaMenuProps) {
  if (!item.columns) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="absolute left-0 right-0 top-full bg-white border-t border-border-soft shadow-medium z-40"
          role="menu"
          aria-label={`${item.label} menu`}
          onMouseLeave={onClose}
        >
          <div className="max-w-[1280px] mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[repeat(3,1fr)_320px] gap-10">
              {item.columns.map((col) => (
                <MegaMenuColumn key={col.heading} column={col} onNavigate={onClose} />
              ))}

              {/* Featured tile on the right */}
              {item.featured && (
                <Link
                  href={item.featured.href}
                  onClick={onClose}
                  className="group relative block aspect-[4/5] rounded-[20px] overflow-hidden bg-stucco image-grain no-underline"
                  aria-label={item.featured.title}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-bougainvillea-soft via-peach-soft to-stucco transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-paper/85 mb-1">
                      Featured
                    </div>
                    <h4 className="font-serif text-xl text-paper font-medium mb-1.5">
                      {item.featured.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-paper/90 text-[13px]">
                      {item.featured.ctaLabel}
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={1.6}
                      />
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
