"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, Heart, X, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
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
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { cart, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { customer, isAuthenticated, signOut } = useAuth();

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
                className="hidden sm:flex relative p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" />
                <AnimatePresence mode="wait">
                  {wishlistCount > 0 && (
                    <motion.span
                      key={wishlistCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              {/* Account */}
              <div className="relative hidden sm:block">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                      className="p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                      aria-label="Account menu"
                    >
                      <User className="w-5 h-5" />
                    </button>
                    <AnimatePresence>
                      {accountMenuOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setAccountMenuOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-brand-pink/50 py-2 z-50"
                          >
                            <p className="px-4 py-1.5 text-xs text-gray-400 truncate">
                              {customer?.firstName ?? customer?.email}
                            </p>
                            <Link
                              href="/account"
                              onClick={() => setAccountMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-pink/30 transition-colors"
                            >
                              <User className="w-4 h-4" />
                              My Account
                            </Link>
                            <Link
                              href="/account"
                              onClick={() => setAccountMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-pink/30 transition-colors"
                            >
                              <Package className="w-4 h-4" />
                              Orders
                            </Link>
                            <hr className="my-1 border-brand-pink/30" />
                            <button
                              onClick={() => {
                                setAccountMenuOpen(false);
                                signOut();
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-pink/30 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href="/account/login"
                    className="p-2 hover:bg-brand-pink/50 rounded-full transition-colors"
                    aria-label="Sign in"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>
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
