"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import {
  createCart as apiCreateCart,
  addToCart as apiAddToCart,
  updateCartLine as apiUpdateCartLine,
  removeCartLine as apiRemoveCartLine,
  getCart as apiGetCart,
} from "@/lib/shopify";

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      apiGetCart(cartId).then((existingCart) => {
        if (existingCart && existingCart.lines.length > 0) {
          setCart(existingCart);
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
      });
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        let updatedCart: Cart;
        if (cart?.id) {
          updatedCart = await apiAddToCart(cart.id, variantId, quantity);
        } else {
          updatedCart = await apiCreateCart(variantId, quantity);
          localStorage.setItem(CART_ID_KEY, updatedCart.id);
        }
        setCart(updatedCart);
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updatedCart = await apiUpdateCartLine(cart.id, lineId, quantity);
        setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updatedCart = await apiRemoveCartLine(cart.id, lineId);
        setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
