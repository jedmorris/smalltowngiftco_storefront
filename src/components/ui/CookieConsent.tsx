"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent(false);
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
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm bg-white rounded-xl shadow-lg border border-soft p-5 z-50"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-peach-soft/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 text-apricot-deep" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-sm text-ink font-medium mb-1">
                We value your privacy
              </p>
              <p className="text-xs text-ink-muted mb-3">
                We use cookies and local storage for your cart, wishlist, and login session.
                With your permission, we also use analytics cookies to improve your experience.
                See our{" "}
                <Link href="/privacy" className="text-apricot-deep hover:text-apricot-deep/80 underline">
                  Privacy Policy
                </Link>.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleAccept}
                  className="px-5 py-1.5 bg-apricot-deep text-white text-sm font-medium rounded-full hover:bg-apricot-deep/90 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="px-5 py-1.5 border border-soft text-sm font-medium text-ink-muted rounded-full hover:bg-gray-50 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
