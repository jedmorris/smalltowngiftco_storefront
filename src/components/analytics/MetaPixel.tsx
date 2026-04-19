"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, onConsentChange } from "@/lib/consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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

export default function MetaPixel() {
  const hasConsent = useConsent();

  if (!PIXEL_ID || !hasConsent) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
