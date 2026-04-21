"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, User, Heart } from "lucide-react";
import { PRIMARY_NAV } from "@/lib/navigation";
import { useAuth } from "@/context/AuthContext";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { isAuthenticated, signOut } = useAuth();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) => {
    setExpanded((curr) => (curr === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/30 z-40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 w-[86%] max-w-[380px] bg-white z-50 flex flex-col shadow-strong"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-soft">
              <span className="font-serif text-lg text-ink">Menu</span>
              <button
                onClick={onClose}
                className="p-2 text-ink hover:text-apricot-deep transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {PRIMARY_NAV.map((item) => {
                const isExpanded = expanded === item.label;
                const hasColumns = Boolean(item.columns?.length);
                return (
                  <div key={item.label} className="border-b border-border-soft/60 last:border-b-0">
                    {hasColumns ? (
                      <>
                        <button
                          onClick={() => toggle(item.label)}
                          aria-expanded={isExpanded}
                          className={`flex items-center justify-between w-full px-3 py-3.5 text-[15px] font-medium transition-colors ${
                            item.emphasis === "sale" ? "text-apricot-deep" : "text-ink"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            strokeWidth={1.6}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-4 space-y-4">
                                {item.columns!.map((col) => (
                                  <div key={col.heading}>
                                    <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-2">
                                      {col.heading}
                                    </h4>
                                    <ul className="space-y-2">
                                      {col.links.map((link) => (
                                        <li key={link.href}>
                                          <Link
                                            href={link.href}
                                            onClick={onClose}
                                            className="text-[14px] text-ink-muted hover:text-apricot-deep transition-colors no-underline"
                                          >
                                            {link.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                {item.featured && (
                                  <Link
                                    href={item.featured.href}
                                    onClick={onClose}
                                    className="inline-flex items-center gap-1 text-[13px] text-apricot-deep font-medium no-underline pt-1"
                                  >
                                    {item.featured.ctaLabel} →
                                  </Link>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`block px-3 py-3.5 text-[15px] font-medium transition-colors ${
                          item.emphasis === "sale"
                            ? "text-apricot-deep"
                            : "text-ink hover:text-apricot-deep"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="border-t border-border-soft px-5 py-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex items-center gap-2 text-sm text-ink"
                  >
                    <User className="w-4 h-4" strokeWidth={1.6} />
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      onClose();
                      signOut();
                    }}
                    className="text-sm text-ink-muted"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/account/login"
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm text-ink"
                >
                  <User className="w-4 h-4" strokeWidth={1.6} />
                  Sign In / Register
                </Link>
              )}
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-ink"
              >
                <Heart className="w-4 h-4" strokeWidth={1.6} />
                Wishlist
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
