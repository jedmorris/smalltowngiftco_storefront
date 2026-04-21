"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, Heart, X, User, LogOut, Package, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import MobileNavDrawer from "./MobileNavDrawer";
import MegaMenu from "./MegaMenu";
import SearchBar from "@/components/ui/SearchBar";
import TextLogo from "@/components/ui/TextLogo";
import { PRIMARY_NAV } from "@/lib/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);

  const { cart, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { customer, isAuthenticated, signOut } = useAuth();

  const totalQuantity = cart?.totalQuantity ?? 0;

  // Close mega-menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenNav(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-border-soft">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-[88px] lg:h-[96px]">
            {/* Left — Mobile menu + logo */}
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-ink hover:text-apricot-deep transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.6} />
              </button>
              <div className="hidden lg:block" />
            </div>

            {/* Center — Text Logo */}
            <TextLogo size="md" />

            {/* Right — Search + Wishlist + Account + Cart */}
            <div className="flex items-center gap-1 flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-ink hover:text-apricot-deep transition-colors"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                {searchOpen ? <X className="w-5 h-5" strokeWidth={1.6} /> : <Search className="w-5 h-5" strokeWidth={1.6} />}
              </button>
              <Link
                href="/wishlist"
                className="hidden sm:flex relative p-2 text-ink hover:text-apricot-deep transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" strokeWidth={1.6} />
                <AnimatePresence mode="wait">
                  {wishlistCount > 0 && (
                    <motion.span
                      key={wishlistCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0.5 right-0 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-medium"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <div className="relative hidden sm:block">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                      className="p-2 text-ink hover:text-apricot-deep transition-colors"
                      aria-label="Account menu"
                    >
                      <User className="w-5 h-5" strokeWidth={1.6} />
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
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-medium border border-border-soft py-2 z-50"
                          >
                            <p className="px-4 py-1.5 text-xs text-ink-subtle truncate">
                              {customer?.firstName ?? customer?.email}
                            </p>
                            <Link
                              href="/account"
                              onClick={() => setAccountMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:text-apricot-deep transition-colors"
                            >
                              <User className="w-4 h-4" strokeWidth={1.6} />
                              My Account
                            </Link>
                            <Link
                              href="/account"
                              onClick={() => setAccountMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:text-apricot-deep transition-colors"
                            >
                              <Package className="w-4 h-4" strokeWidth={1.6} />
                              Orders
                            </Link>
                            <hr className="my-1 border-border-soft" />
                            <button
                              onClick={() => {
                                setAccountMenuOpen(false);
                                signOut();
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-ink hover:text-apricot-deep transition-colors"
                            >
                              <LogOut className="w-4 h-4" strokeWidth={1.6} />
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
                    className="p-2 text-ink hover:text-apricot-deep transition-colors"
                    aria-label="Sign in"
                  >
                    <User className="w-5 h-5" strokeWidth={1.6} />
                  </Link>
                )}
              </div>
              <button
                onClick={openCart}
                className="relative p-2 text-ink hover:text-apricot-deep transition-colors"
                aria-label={`Cart (${totalQuantity} items)`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.6} />
                <AnimatePresence mode="wait">
                  {totalQuantity > 0 && (
                    <motion.span
                      key={totalQuantity}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0.5 right-0 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-medium"
                    >
                      {totalQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Primary nav (desktop only) */}
          <nav
            className="hidden lg:flex items-center justify-center gap-9 pb-4 relative"
            aria-label="Primary"
          >
            {PRIMARY_NAV.map((item) => {
              const hasColumns = Boolean(item.columns?.length);
              const isOpen = openNav === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasColumns && setOpenNav(item.label)}
                  onMouseLeave={() => hasColumns && setOpenNav(null)}
                >
                  <Link
                    href={item.href}
                    onFocus={() => hasColumns && setOpenNav(item.label)}
                    aria-haspopup={hasColumns ? "menu" : undefined}
                    aria-expanded={hasColumns ? isOpen : undefined}
                    className={`inline-flex items-center gap-1 text-[11.5px] font-medium tracking-[0.18em] uppercase transition-colors py-1 ${
                      item.emphasis === "sale"
                        ? "text-apricot-deep hover:text-espresso"
                        : "text-ink hover:text-apricot-deep"
                    }`}
                  >
                    {item.label}
                    {hasColumns && (
                      <ChevronDown className="w-3 h-3 opacity-70" strokeWidth={1.8} />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Mega-menus positioned below the nav row */}
          {PRIMARY_NAV.map((item) =>
            item.columns ? (
              <MegaMenu
                key={item.label}
                item={item}
                open={openNav === item.label}
                onClose={() => setOpenNav(null)}
              />
            ) : null
          )}

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

      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
