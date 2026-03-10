"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm bg-white rounded-2xl shadow-lg border border-brand-pink/50 p-5 z-50"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-pink/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 text-brand-gold" />
            </div>
            <div>
              <p className="text-sm text-brand-charcoal font-medium mb-1">
                We value your privacy
              </p>
              <p className="text-xs text-gray-500 mb-3">
                We use local storage to save your cart, wishlist, and login session.
                No third-party tracking cookies. See our{" "}
                <Link href="/privacy" className="text-brand-gold hover:text-brand-gold/80 underline">
                  Privacy Policy
                </Link>.
              </p>
              <button
                onClick={accept}
                className="px-5 py-1.5 bg-brand-gold text-white text-sm font-medium rounded-full hover:bg-brand-gold/90 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
