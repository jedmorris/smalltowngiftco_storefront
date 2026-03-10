const CONSENT_KEY = "cookie_consent";

type Listener = (accepted: boolean) => void;
const listeners: Listener[] = [];

export function onConsentChange(fn: Listener) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

export function setConsent(accepted: boolean) {
  localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "declined");
  listeners.forEach((fn) => fn(accepted));
}

export function getConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "accepted") return true;
  if (v === "declined") return false;
  return null;
}
