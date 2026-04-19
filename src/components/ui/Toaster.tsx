"use client";

import { Toaster as SonnerToaster } from "sonner";

export default function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        className: "font-sans",
        style: {
          borderRadius: "1rem",
          border: "1px solid var(--color-bougainvillea-soft, #f5e6e0)",
        },
      }}
    />
  );
}
