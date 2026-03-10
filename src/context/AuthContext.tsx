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
import type { Customer } from "@/lib/shopify/types";
import {
  customerSignIn as apiSignIn,
  customerCreate as apiCreate,
  customerSignOut as apiSignOut,
  getCustomer as apiGetCustomer,
} from "@/lib/shopify";
import { encryptToken, decryptToken } from "@/lib/token-crypto";

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

async function readToken(): Promise<string | null> {
  const stored = localStorage.getItem(TOKEN_KEY);
  if (!stored) return null;
  try {
    return await decryptToken(stored);
  } catch {
    // Legacy plain token or corrupted — remove it
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

async function writeToken(token: string): Promise<void> {
  const encrypted = await encryptToken(token);
  localStorage.setItem(TOKEN_KEY, encrypted);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenRef = useRef<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    readToken()
      .then(async (token) => {
        if (token) {
          tokenRef.current = token;
          const c = await apiGetCustomer(token);
          if (c) {
            setCustomer(c);
          } else {
            localStorage.removeItem(TOKEN_KEY);
            tokenRef.current = null;
          }
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        tokenRef.current = null;
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { token, error } = await apiSignIn(email, password);
      if (error || !token) return error ?? "Sign in failed";

      await writeToken(token.accessToken);
      tokenRef.current = token.accessToken;
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

        return await signIn(email, password);
      } finally {
        setIsLoading(false);
      }
    },
    [signIn]
  );

  const refreshCustomer = useCallback(async () => {
    const token = await readToken();
    if (token) {
      tokenRef.current = token;
      const c = await apiGetCustomer(token);
      setCustomer(c);
    }
  }, []);

  const signOut = useCallback(async () => {
    const token = await readToken();
    if (token) {
      try {
        await apiSignOut(token);
      } catch {
        // Token may already be expired
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    tokenRef.current = null;
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isLoading,
        isAuthenticated: !!customer,
        accessToken: tokenRef.current,
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
