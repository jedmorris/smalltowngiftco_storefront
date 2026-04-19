"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Instagram, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import TextLogo from "@/components/ui/TextLogo";

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
            className="fixed inset-0 bg-ink/35 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-paper z-50 shadow-strong flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border-soft">
              <TextLogo size="sm" asLink={false} withBow={false} />
              <button onClick={onClose} className="p-1 text-ink hover:text-apricot-deep transition-colors">
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>
            <nav className="flex-1 p-5">
              <ul className="space-y-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3.5 text-ink hover:text-apricot-deep transition-colors font-serif text-[15px] border-b border-border-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-5 border-t border-border-soft">
              <div className="flex gap-3">
                {[
                  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
                  { href: "mailto:hello@smalltowngiftco.com", icon: Mail, label: "Email us" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-ink-subtle hover:text-apricot-deep transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
