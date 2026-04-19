"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { signUp, isLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = await signUp(email, password, firstName, lastName);
    if (err) {
      setError(err);
    } else {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="font-serif text-2xl text-ink text-center mb-6">
        Create Account
      </h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-ink mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-ink mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep"
          />
        </div>
      </div>

      <div>
        <label htmlFor="regEmail" className="block text-sm font-medium text-ink mb-1">
          Email
        </label>
        <input
          id="regEmail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="regPassword" className="block text-sm font-medium text-ink mb-1">
          Password
        </label>
        <input
          id="regPassword"
          type="password"
          required
          minLength={5}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep"
          placeholder="At least 5 characters"
        />
      </div>

      <Button type="submit" disabled={isLoading} size="lg" className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" strokeWidth={1.6} />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href="/account/login" className="text-apricot-deep hover:text-apricot-deep/80 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}
