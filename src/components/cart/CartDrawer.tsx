"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Shield, RotateCcw, Gift, PartyPopper } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import Link from "next/link";

const FREE_SHIPPING_THRESHOLD = 75;

const trustBadges = [
  { icon: Shield, label: "Secure" },
  { icon: RotateCcw, label: "Free Returns" },
  { icon: Gift, label: "Gift Ready" },
];

export default function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();
  const items = cart?.lines ?? [];
  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShippingReached = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountRemaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);

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
            onClick={closeCart}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[400px] max-w-[92vw] bg-paper z-50 shadow-strong flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 px-6 border-b border-border-soft">
              <h2 className="font-serif text-[22px] font-medium text-ink">
                Your cart
              </h2>
              <button
                onClick={closeCart}
                className="p-1.5 hover:bg-peach-soft rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="text-ink-subtle mb-3">
                  <ShoppingBag className="w-8 h-8" strokeWidth={1.6} />
                </div>
                <p className="text-ink-muted text-sm">
                  Your cart is empty — let&apos;s change that.
                </p>
                <Link
                  href="/collections"
                  onClick={closeCart}
                  className="mt-6 px-8 py-3 bg-apricot-deep text-white font-medium rounded-full hover:bg-apricot-deep/90 transition-colors text-sm no-underline"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Free shipping progress bar */}
                <div className="px-6 py-3 bg-stucco/50">
                  {freeShippingReached ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-sm text-espresso font-medium"
                    >
                      <PartyPopper className="w-4 h-4" strokeWidth={1.6} />
                      You&apos;ve unlocked free shipping!
                    </motion.div>
                  ) : (
                    <div>
                      <p className="text-xs text-ink-muted text-center mb-2">
                        Add <span className="font-semibold text-apricot-deep">${amountRemaining}</span> more for free shipping
                      </p>
                      <div className="w-full h-2 bg-peach-soft rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full transition-colors ${freeShippingReached ? "bg-espresso" : "bg-apricot-deep"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${shippingProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-6 cart-scrollbar">
                  <div className="divide-y divide-border-soft">
                    {items.map((item) => (
                      <CartLineItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="px-6 py-2 border-t border-border-soft">
                  <div className="flex justify-center gap-4">
                    {trustBadges.map((badge) => (
                      <div key={badge.label} className="flex items-center gap-1 text-xs text-ink-subtle">
                        <badge.icon className="w-3.5 h-3.5" strokeWidth={1.6} />
                        {badge.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-border-soft">
                  <CartSummary freeShipping={freeShippingReached} />
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
