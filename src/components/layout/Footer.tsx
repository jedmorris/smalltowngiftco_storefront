"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Shield, Truck, Heart, RotateCcw } from "lucide-react";

const shopLinks = [
  { label: "Shop All", href: "/collections" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Bachelorette", href: "/collections/bachelorette" },
  { label: "Wedding", href: "/collections/wedding" },
];

const promises = [
  { icon: Shield, text: "Love It Guarantee" },
  { icon: Truck, text: "Free Shipping $75+" },
  { icon: Heart, text: "Made with Love" },
  { icon: RotateCcw, text: "Easy Returns" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-brand-pink/50">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-brand-pink via-brand-blush to-brand-pink">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <h3 className="font-serif text-2xl text-brand-charcoal mb-2">Stay in the Loop</h3>
          <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
            Get exclusive offers, new arrivals & gifting inspo straight to your inbox.
          </p>
          {subscribed ? (
            <p className="text-brand-forest font-medium animate-fade-in-up">
              ✦ You&apos;re in! Thanks for subscribing.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-2.5 border border-brand-pink rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-gold text-white text-sm font-medium rounded-full hover:bg-brand-gold/90 transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="The Small Town Gift Co."
              width={160}
              height={54}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-gray-500 mb-4 max-w-xs">
              Thoughtful gifts for every occasion. Curated with love from our small town to yours.
            </p>
            <div className="flex gap-3">
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
                  className="p-2 bg-brand-blush hover:bg-brand-gold hover:text-white rounded-full transition-all duration-200 text-brand-charcoal"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-brand-charcoal">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-gold hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Promise */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-brand-charcoal">Our Promise</h3>
            <ul className="space-y-3">
              {promises.map((promise) => (
                <li key={promise.text} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-brand-gold text-[8px]">◆</span>
                  <promise.icon className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  {promise.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-brand-charcoal">Info</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Shipping & Returns", href: "/about#shipping" },
                { label: "Contact Us", href: "/about#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-gold hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-brand-pink/50 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Small Town Gift Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
