"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, Heart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import MobileMenu from "./MobileMenu";
import SearchBar from "@/components/ui/SearchBar";

const navLinks = [
  { label: "Shop All", href: "/collections" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Bachelorette", href: "/collections/bachelorette" },
  { label: "Wedding", href: "/collections/wedding" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, openCart } = useCart();

  const totalQuantity = cart?.totalQuantity ?? 0;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-brand-pink/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left — Mobile menu + nav */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-sm font-medium text-brand-charcoal hover:text-brand-gold transition-colors group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center — Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="The Small Town Gift Co."
                width={180}
                height={60}
                className="h-10 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Right — Search + Wishlist + Cart */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <Link
                href="/wishlist"
                className="hidden sm:flex p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                aria-label={`Cart (${totalQuantity} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence mode="wait">
                  {totalQuantity > 0 && (
                    <motion.span
                      key={totalQuantity}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium"
                    >
                      {totalQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Search bar dropdown */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-4">
                  <SearchBar onClose={() => setSearchOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
