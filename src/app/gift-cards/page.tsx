import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Digital gift cards from The Small Town Gift Co. — the perfect gift when you can't quite decide.",
  openGraph: {
    title: "Gift Cards | The Small Town Gift Co.",
    description:
      "Digital gift cards from The Small Town Gift Co. — the perfect gift when you can't quite decide.",
  },
};

const AMOUNTS = [25, 50, 75, 100, 150, 250];

export default function GiftCardsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Preview tile */}
        <div className="relative aspect-[5/4] rounded-[24px] overflow-hidden bg-gradient-to-br from-bougainvillea-soft via-stucco to-peach-soft image-grain">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <span className="text-gold text-[13px] tracking-[0.3em] uppercase mb-3">
              ✦ Digital gift card
            </span>
            <p className="font-serif text-4xl lg:text-5xl text-ink mb-3">
              The Small Town Gift Co.
            </p>
            <p className="text-ink-muted text-base max-w-sm">
              A little note of love, delivered straight to their inbox.
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-apricot-deep text-[13px] tracking-[0.3em] uppercase">
            Gift cards
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-ink mt-2 mb-5">
            When you can&apos;t quite decide, let them.
          </h1>
          <p className="text-ink-muted text-base mb-6">
            Our digital gift cards are the thoughtful plan B — delivered by
            email, redeemable at checkout, and valid on everything in the shop.
            No expiry, no fees, no fine print. Just a warm way to say &quot;you
            pick&quot; without sacrificing the gifting moment.
          </p>

          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink mb-3">
            Available amounts
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
            {AMOUNTS.map((a) => (
              <div
                key={a}
                className="text-center py-3 rounded-xl border border-border-soft bg-white font-serif text-lg text-ink"
              >
                ${a}
              </div>
            ))}
          </div>

          <Link href="/products/gift-card">
            <Button size="lg">Shop gift cards</Button>
          </Link>

          <ul className="mt-8 space-y-2 text-sm text-ink-muted">
            <li>✦ Delivered instantly by email (choose a future date if you&apos;d like)</li>
            <li>✦ Never expires — use it anytime</li>
            <li>✦ Works alongside sitewide promotions</li>
            <li>✦ Need a specific amount? <Link href="/contact">Contact us.</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
