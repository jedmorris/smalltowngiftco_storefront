"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { toast } from "sonner";
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
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  clearError: () => void;
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
  const [error, setError] = useState<string | null>(null);
  const cartRef = useRef<string | null>(null);

  // Keep ref in sync with cart state
  useEffect(() => {
    cartRef.current = cart?.id ?? null;
  }, [cart]);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      apiGetCart(cartId)
        .then((existingCart) => {
          if (existingCart && existingCart.lines.length > 0) {
            setCart(existingCart);
          } else {
            localStorage.removeItem(CART_ID_KEY);
          }
        })
        .catch(() => {
          localStorage.removeItem(CART_ID_KEY);
        });
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const clearError = useCallback(() => setError(null), []);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      let updatedCart: Cart;
      if (cartRef.current) {
        updatedCart = await apiAddToCart(cartRef.current, variantId, quantity);
      } else {
        updatedCart = await apiCreateCart(variantId, quantity);
        localStorage.setItem(CART_ID_KEY, updatedCart.id);
      }
      setCart(updatedCart);
      setIsOpen(true);
      toast.success("Added to cart");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add to cart";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartRef.current) return;
    setIsLoading(true);
    setError(null);
    try {
      const updatedCart = await apiUpdateCartLine(cartRef.current, lineId, quantity);
      setCart(updatedCart);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update quantity";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartRef.current) return;
    setIsLoading(true);
    setError(null);
    try {
      const updatedCart = await apiRemoveCartLine(cartRef.current, lineId);
      setCart(updatedCart);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to remove item";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        error,
        openCart,
        closeCart,
        clearError,
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
