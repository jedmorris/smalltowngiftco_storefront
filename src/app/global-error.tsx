"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-500 mb-8 max-w-md">
            We&apos;re sorry — a critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            className="px-8 py-3 bg-amber-700 text-white font-medium rounded-full hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
