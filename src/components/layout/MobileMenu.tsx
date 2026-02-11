"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Shop All", href: "/collections" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Bachelorette", href: "/collections/bachelorette" },
  { label: "Wedding", href: "/collections/wedding" },
  { label: "Seasonal", href: "/collections/seasonal" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-brand-pink">
              <span className="font-serif text-lg text-brand-charcoal">Menu</span>
              <button onClick={onClose} className="p-1 hover:bg-brand-pink/50 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 px-4 text-brand-charcoal hover:bg-brand-blush rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
