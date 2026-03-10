"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { customerRecover } from "@/lib/shopify";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: err } = await customerRecover(email);
      if (err) {
        setError(err);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h2 className="font-serif text-2xl text-brand-charcoal mb-2">Check Your Email</h2>
        <p className="text-sm text-gray-500 mb-6">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
          Check your inbox (and spam folder) for the email.
        </p>
        <Link
          href="/account/login"
          className="text-brand-gold hover:text-brand-gold/80 font-medium text-sm"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full bg-brand-pink/30 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7 text-brand-gold" />
        </div>
        <h2 className="font-serif text-2xl text-brand-charcoal mb-2">Forgot Password?</h2>
        <p className="text-sm text-gray-500">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="resetEmail" className="block text-sm font-medium text-brand-charcoal mb-1">
            Email Address
          </label>
          <input
            id="resetEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-brand-pink rounded-lg text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
            placeholder="you@example.com"
          />
        </div>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/account/login" className="text-brand-gold hover:text-brand-gold/80 font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
