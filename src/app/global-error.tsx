"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          <pre className="text-left text-xs text-red-600 bg-red-50 p-4 rounded-lg max-w-lg overflow-auto mb-8">
            {error?.message}
            {error?.digest ? `\nDigest: ${error.digest}` : ""}
            {error?.stack ? `\n\n${error.stack}` : ""}
          </pre>
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
