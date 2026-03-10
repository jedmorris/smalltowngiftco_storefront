"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, onConsentChange } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function subscribeConsent(callback: () => void) {
  return onConsentChange(() => callback());
}

function useConsent() {
  return useSyncExternalStore(
    subscribeConsent,
    () => getConsent() === true,
    () => false
  );
}

export default function GoogleAnalytics() {
  const hasConsent = useConsent();

  if (!GA_ID || !hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
