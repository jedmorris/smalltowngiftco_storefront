"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = await signIn(email, password);
    if (err) {
      setError(err);
    } else {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="font-serif text-2xl text-ink text-center mb-6">
        Sign In
      </h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep"
          placeholder="Your password"
        />
      </div>

      <div className="text-right">
        <Link href="/account/forgot-password" className="text-sm text-apricot-deep hover:text-apricot-deep/80">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" disabled={isLoading} size="lg" className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" strokeWidth={1.6} />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        Don&apos;t have an account?{" "}
        <Link href="/account/register" className="text-apricot-deep hover:text-apricot-deep/80 font-medium">
          Create one
        </Link>
      </p>
    </form>
  );
}
