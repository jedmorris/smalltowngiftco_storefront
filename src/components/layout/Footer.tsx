"use client";

import { useState } from "react";
import { Instagram, Facebook, Mail, Shield, Truck, Heart, RotateCcw } from "lucide-react";
import TextLogo from "@/components/ui/TextLogo";
import FooterMegaGrid from "./FooterMegaGrid";
import PaymentIconsRow from "./PaymentIconsRow";

const promises = [
  { icon: Shield, text: "Love-it promise" },
  { icon: Truck, text: "Free shipping $75+" },
  { icon: Heart, text: "Packed with love" },
  { icon: RotateCcw, text: "Easy returns" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setSubscribed(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white border-t border-border-soft">
      {/* Trust strip */}
      <div className="border-b border-border-soft">
        <div className="max-w-[1280px] mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {promises.map((p) => (
            <div
              key={p.text}
              className="flex items-center justify-center gap-2.5 text-sm text-ink-muted"
            >
              <span className="text-apricot-deep">
                <p.icon className="w-4 h-4" strokeWidth={1.6} />
              </span>
              {p.text}
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1280px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1.2fr] gap-10 mb-10">
          {/* Brand column */}
          <div>
            <TextLogo size="md" asLink={false} className="mb-4 inline-flex" />
            <p className="text-sm text-ink-muted mb-5 max-w-xs">
              Curated gifts for every celebration, packed with love — from our small town in San Diego to your doorstep.
            </p>
            <div className="flex gap-3 text-ink-subtle">
              {[
                { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
                { href: "mailto:hello@smalltowngiftco.com", icon: Mail, label: "Email us" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="hover:text-apricot-deep transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Link grid */}
          <FooterMegaGrid />

          {/* Mini newsletter */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-4">
              Stay in the loop
            </h3>
            <p className="text-sm text-ink-muted mb-3">
              Quiet sales, new arrivals & gifting inspo.
            </p>
            {subscribed ? (
              <p className="text-apricot-deep text-sm font-medium">
                ✦ You&apos;re in! Thanks for subscribing.
              </p>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    aria-label="Email address"
                    className="flex-1 px-4 py-2.5 border border-border-soft rounded-full text-sm focus:outline-none focus:ring-[3px] focus:ring-apricot-deep/25 focus:border-apricot-deep bg-white font-sans"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2.5 bg-apricot-deep text-white text-sm font-medium rounded-full hover:bg-apricot-deep/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "..." : "Join"}
                  </button>
                </form>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </>
            )}
          </div>
        </div>

        {/* Bottom strip: copyright + payments */}
        <div className="pt-6 border-t border-border-soft flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between text-xs text-ink-subtle">
          <p>
            &copy; {new Date().getFullYear()} The Small Town Gift Co. ✦ Made with love in San Diego.
          </p>
          <PaymentIconsRow />
        </div>
      </div>
    </footer>
  );
}
