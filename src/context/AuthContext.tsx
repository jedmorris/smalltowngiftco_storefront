"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Customer } from "@/lib/shopify/types";
import {
  customerSignIn as apiSignIn,
  customerCreate as apiCreate,
  customerSignOut as apiSignOut,
  getCustomer as apiGetCustomer,
} from "@/lib/shopify";

interface AuthContextValue {
  customer: Customer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "shopify_customer_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      apiGetCustomer(token)
        .then((c) => {
          if (c) {
            setCustomer(c);
          } else {
            localStorage.removeItem(TOKEN_KEY);
          }
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { token, error } = await apiSignIn(email, password);
      if (error || !token) return error ?? "Sign in failed";

      localStorage.setItem(TOKEN_KEY, token.accessToken);
      const c = await apiGetCustomer(token.accessToken);
      setCustomer(c);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, firstName: string, lastName: string): Promise<string | null> => {
      setIsLoading(true);
      try {
        const { error: createError } = await apiCreate(email, password, firstName, lastName);
        if (createError) return createError;

        // Auto sign-in after registration
        return await signIn(email, password);
      } finally {
        setIsLoading(false);
      }
    },
    [signIn]
  );

  const refreshCustomer = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const c = await apiGetCustomer(token);
      setCustomer(c);
    }
  }, []);

  const signOut = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await apiSignOut(token);
      } catch {
        // Token may already be expired
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isLoading,
        isAuthenticated: !!customer,
        accessToken: typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
        signIn,
        signUp,
        signOut,
        refreshCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
