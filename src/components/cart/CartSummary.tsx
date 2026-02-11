"use client";

import { ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import Button from "@/components/ui/Button";

interface CartSummaryProps {
  freeShipping?: boolean;
}

export default function CartSummary({ freeShipping = false }: CartSummaryProps) {
  const { cart } = useCart();

  if (!cart) return null;

  return (
    <div className="border-t border-brand-pink pt-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span className="font-semibold text-brand-charcoal">
          {formatPrice(cart.cost.subtotalAmount)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Shipping</span>
        <span className={freeShipping ? "font-semibold text-brand-forest" : "text-gray-400"}>
          {freeShipping ? "FREE" : "Calculated at checkout"}
        </span>
      </div>
      <div className="flex justify-between items-baseline pt-2 border-t border-brand-pink/30">
        <span className="text-gray-500 text-sm">Total</span>
        <span className="font-serif text-xl font-semibold text-brand-charcoal">
          {formatPrice(cart.cost.subtotalAmount)}
        </span>
      </div>
      <a href={cart.checkoutUrl} className="block">
        <Button className="w-full" size="lg">
          Checkout
        </Button>
      </a>
      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        Secure, encrypted checkout
      </div>
    </div>
  );
}
