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
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <TextLogo size="sm" asLink={false} />
              <button onClick={onClose} className="p-1 text-brand-charcoal hover:text-brand-gold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-5">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 text-brand-charcoal hover:text-brand-gold transition-colors font-medium tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-5 border-t border-gray-100">
              <div className="flex gap-4">
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
                    className="text-gray-400 hover:text-brand-gold transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
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
