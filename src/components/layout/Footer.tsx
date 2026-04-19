"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Mail, Shield, Truck, Heart, RotateCcw } from "lucide-react";
import TextLogo from "@/components/ui/TextLogo";

const shopLinks = [
  { label: "Shop All", href: "/collections" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Bachelorette", href: "/collections/bachelorette" },
  { label: "Wedding", href: "/collections/wedding" },
];

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Returns Policy", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

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
      {/* Newsletter Banner */}
      <div className="bg-stucco relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 py-14 text-center relative">
          <span className="text-gold text-[13px] tracking-[0.3em] uppercase">✦</span>
          <h3 className="font-serif font-normal text-[32px] text-ink mt-1.5 mb-1.5">
            Postcards from our small town
          </h3>
          <p className="text-sm text-ink-muted max-w-[400px] mx-auto mb-5">
            New arrivals, quiet sales &amp; gifting inspo — straight to your inbox.
          </p>
          {subscribed ? (
            <p className="text-apricot-deep font-medium animate-fade-in-up">
              ✦ You&apos;re in! Thanks for subscribing.
            </p>
          ) : (
            <>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-[380px] mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-[11px] border border-border-soft rounded-full text-sm focus:outline-none focus:ring-[3px] focus:ring-apricot-deep/25 focus:border-apricot-deep bg-white font-sans"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-[22px] py-[11px] bg-apricot-deep text-white text-sm font-medium rounded-full hover:bg-apricot-deep/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "..." : "Join"}
                </button>
              </form>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <TextLogo size="md" asLink={false} className="mb-4 inline-flex" />
            <p className="text-sm text-ink-muted mb-4 max-w-xs">
              Curated gifts for every celebration, packed with love — from our small town in San Diego to your doorstep.
            </p>
            <ul className="space-y-1.5 mb-5">
              {promises.map((promise) => (
                <li key={promise.text} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="text-gold"><promise.icon className="w-3.5 h-3.5" strokeWidth={1.6} /></span>
                  {promise.text}
                </li>
              ))}
            </ul>
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

          {/* Shop */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-apricot-deep transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-4">Info</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-apricot-deep transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border-soft text-center text-xs text-ink-subtle">
          <p>&copy; {new Date().getFullYear()} The Small Town Gift Co. ✦ Made with love in San Diego.</p>
        </div>
      </div>
    </footer>
  );
}
