"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartLineItem from "@/components/cart/CartLineItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { cart } = useCart();
  const items = cart?.lines ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-brand-charcoal mb-8 text-center">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 text-brand-pink mx-auto mb-4" />
          <p className="font-serif text-xl text-brand-charcoal mb-2">
            Your cart is empty
          </p>
          <p className="text-gray-500 mb-8">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 py-3 bg-brand-gold text-white font-medium rounded-md hover:bg-brand-gold/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="divide-y divide-brand-pink/50">
            {items.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
