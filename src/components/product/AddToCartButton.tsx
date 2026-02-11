"use client";

import { ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

interface AddToCartButtonProps {
  variantId: string;
  availableForSale: boolean;
}

export default function AddToCartButton({
  variantId,
  availableForSale,
}: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();

  if (!availableForSale) {
    return (
      <Button disabled size="lg" className="w-full" variant="secondary">
        Sold Out
      </Button>
    );
  }

  return (
    <Button
      onClick={() => addToCart(variantId)}
      disabled={isLoading}
      size="lg"
      className="w-full"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <ShoppingBag className="w-5 h-5 mr-2" />
      )}
      Add to Cart
    </Button>
  );
}
