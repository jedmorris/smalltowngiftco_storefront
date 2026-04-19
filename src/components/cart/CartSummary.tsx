"use client";

import { ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import { trackBeginCheckout } from "@/lib/analytics";
import Button from "@/components/ui/Button";

interface CartSummaryProps {
  freeShipping?: boolean;
}

export default function CartSummary({ freeShipping = false }: CartSummaryProps) {
  const { cart } = useCart();

  if (!cart) return null;

  return (
    <div className="border-t border-soft pt-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-ink-muted">Subtotal</span>
        <span className="font-semibold text-ink">
          {formatPrice(cart.cost.subtotalAmount)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-ink-muted">Shipping</span>
        <span className={freeShipping ? "font-semibold text-espresso" : "text-ink-subtle"}>
          {freeShipping ? "FREE" : "Calculated at checkout"}
        </span>
      </div>
      <div className="flex justify-between items-baseline pt-2 border-t border-soft/30">
        <span className="text-ink-muted text-sm">Total</span>
        <span className="font-serif text-xl font-semibold text-ink">
          {formatPrice(cart.cost.subtotalAmount)}
        </span>
      </div>
      <a
        href={cart.checkoutUrl}
        className="block"
        onClick={() => {
          trackBeginCheckout(
            cart.lines,
            cart.cost.totalAmount.amount,
            cart.cost.totalAmount.currencyCode
          );
        }}
      >
        <Button className="w-full" size="lg">
          Checkout
        </Button>
      </a>
      <div className="flex items-center justify-center gap-1.5 text-xs text-ink-subtle">
        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.6} />
        Secure, encrypted checkout
      </div>
    </div>
  );
}
