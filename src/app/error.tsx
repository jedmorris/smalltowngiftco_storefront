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
      <span className="text-apricot-deep text-sm mb-4">◆</span>
      <h1 className="font-serif text-4xl text-ink mb-4">
        Something went wrong
      </h1>
      <p className="text-ink-muted mb-8 max-w-md">
        We&apos;re sorry — something unexpected happened. Please try again, or head
        back to our homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 bg-apricot-deep text-white font-medium rounded-full hover:bg-apricot-deep/90 transition-all hover:shadow-[var(--shadow-medium)]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-3 border-2 border-apricot-deep text-apricot-deep font-medium rounded-full hover:bg-apricot-deep hover:text-white transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
