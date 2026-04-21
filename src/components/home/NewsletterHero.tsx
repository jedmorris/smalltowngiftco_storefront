"use client";

import { useState } from "react";

/**
 * Mid-page prominent newsletter signup with discount incentive (matches Pink
 * Lily's "Get 30% off your first order" conversion module). Adapted to STGC
 * voice ("Postcards from our small town") and the Positano palette.
 */
export default function NewsletterHero() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section className="py-[3rem] lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="relative overflow-hidden rounded-[28px] bg-stucco image-grain">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.bougainvillea-soft/40),transparent_60%)]" />
          <div className="relative max-w-[680px] mx-auto text-center px-6 py-14 md:py-20">
            <span className="text-gold text-[13px] tracking-[0.3em] uppercase">
              ✦ Small Town Perks
            </span>
            <h2 className="font-serif text-ink text-[clamp(2rem,1.5rem+2vw,2.75rem)] leading-[1.05] mt-3 mb-3">
              Get 15% off your first order
            </h2>
            <p className="text-ink-muted text-base md:text-[17px] leading-[1.55] mb-7">
              Join our list for postcards from our small town — new arrivals,
              quiet sales, gifting inspo, and a welcome discount in your inbox.
            </p>

            {subscribed ? (
              <p className="text-apricot-deep text-base font-medium animate-fade-in-up">
                ✦ You&apos;re in! Check your inbox for your welcome code.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2 max-w-[440px] mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  className="flex-1 px-5 py-3 border border-border-soft rounded-full text-sm focus:outline-none focus:ring-[3px] focus:ring-apricot-deep/25 focus:border-apricot-deep bg-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-apricot-deep text-white text-sm font-semibold rounded-full hover:bg-apricot-deep/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? "Joining..." : "Join & save"}
                </button>
              </form>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-[11px] text-ink-subtle mt-4">
              By subscribing, you agree to our privacy policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
