"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <span className="text-brand-gold text-sm mb-4">◆</span>
      <h1 className="font-serif text-4xl text-brand-charcoal mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        We&apos;re sorry — something unexpected happened. Please try again, or head
        back to our homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 bg-brand-gold text-white font-medium rounded-full hover:bg-brand-gold/90 transition-all hover:shadow-[var(--shadow-medium)]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-3 border-2 border-brand-gold text-brand-gold font-medium rounded-full hover:bg-brand-gold hover:text-white transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
