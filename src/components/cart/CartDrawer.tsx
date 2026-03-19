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
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeCart}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-serif text-lg text-brand-charcoal">
                Your Cart ({cart?.totalQuantity ?? 0})
              </h2>
              <button
                onClick={closeCart}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="w-16 h-16 rounded-full bg-brand-pink/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-brand-gold" />
                </div>
                <p className="font-serif text-xl text-brand-charcoal mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Looks like you haven&apos;t added anything yet.
                </p>
                <Link
                  href="/collections"
                  onClick={closeCart}
                  className="px-8 py-3 bg-brand-gold text-white font-medium rounded-full hover:bg-brand-gold/90 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Free shipping progress bar */}
                <div className="px-4 py-3 bg-brand-cream/50">
                  {freeShippingReached ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-sm text-brand-espresso font-medium"
                    >
                      <PartyPopper className="w-4 h-4" />
                      You&apos;ve unlocked free shipping!
                    </motion.div>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-500 text-center mb-2">
                        Add <span className="font-semibold text-brand-gold">${amountRemaining}</span> more for free shipping
                      </p>
                      <div className="w-full h-2 bg-brand-pink/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full transition-colors ${freeShippingReached ? "bg-brand-espresso" : "bg-brand-gold"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${shippingProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-4 cart-scrollbar">
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <CartLineItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <div className="flex justify-center gap-4">
                    {trustBadges.map((badge) => (
                      <div key={badge.label} className="flex items-center gap-1 text-xs text-gray-400">
                        <badge.icon className="w-3.5 h-3.5" />
                        {badge.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4">
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
