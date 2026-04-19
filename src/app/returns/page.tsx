import type { Metadata } from "next";
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Return policy, exchange process, and refund information for The Small Town Gift Co.",
  openGraph: {
    title: "Returns & Refunds | The Small Town Gift Co.",
    description: "Return policy, exchange process, and refund information.",
  },
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-apricot-deep text-sm">◆</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-ink mt-2 mb-4">
          Returns & Refunds
        </h1>
        <p className="text-ink-muted">Your satisfaction is our top priority.</p>
        <div className="decorative-underline mx-auto" />
      </div>

      {/* Quick summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="text-center bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-peach-soft/30 mb-3">
            <Clock className="w-6 h-6 text-apricot-deep" strokeWidth={1.6} />
          </div>
          <h3 className="font-serif text-lg text-ink mb-1">30 Days</h3>
          <p className="text-sm text-ink-muted">Return window from delivery</p>
        </div>
        <div className="text-center bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-peach-soft/30 mb-3">
            <RotateCcw className="w-6 h-6 text-apricot-deep" strokeWidth={1.6} />
          </div>
          <h3 className="font-serif text-lg text-ink mb-1">Free Returns</h3>
          <p className="text-sm text-ink-muted">On all domestic orders</p>
        </div>
        <div className="text-center bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-peach-soft/30 mb-3">
            <CheckCircle className="w-6 h-6 text-apricot-deep" strokeWidth={1.6} />
          </div>
          <h3 className="font-serif text-lg text-ink mb-1">Easy Process</h3>
          <p className="text-sm text-ink-muted">Email us to start a return</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none text-ink-muted space-y-8">
        <section>
          <h2 className="font-serif text-xl text-ink">Return Eligibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={1.6} />
                <h3 className="font-medium text-ink">Eligible for Return</h3>
              </div>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>Items in original, unworn condition</li>
                <li>Items with tags still attached</li>
                <li>Items in original packaging</li>
                <li>Items returned within 30 days of delivery</li>
              </ul>
            </div>
            <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" strokeWidth={1.6} />
                <h3 className="font-medium text-ink">Not Eligible</h3>
              </div>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>Personalized or custom items</li>
                <li>Items that have been worn or washed</li>
                <li>Items without original tags</li>
                <li>Sale items marked as final sale</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">How to Start a Return</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Email us</strong> at{" "}
              <a href="mailto:hello@smalltowngiftco.com" className="text-apricot-deep hover:text-apricot-deep/80">
                hello@smalltowngiftco.com
              </a>{" "}
              with your order number and the item(s) you&apos;d like to return.
            </li>
            <li>
              <strong>We&apos;ll send you a prepaid return label</strong> (domestic orders) within
              1–2 business days.
            </li>
            <li>
              <strong>Pack your items</strong> securely in their original packaging with tags attached.
            </li>
            <li>
              <strong>Drop off your package</strong> at any USPS location or schedule a pickup.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Refunds</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Refunds are processed within 5–7 business days after we receive your return.</li>
            <li>Refunds are issued to the original payment method.</li>
            <li>Original shipping costs are non-refundable (unless the return is due to our error).</li>
            <li>You&apos;ll receive an email confirmation once your refund has been processed.</li>
            <li>It may take an additional 3–5 business days for the refund to appear on your statement.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Exchanges</h2>
          <p>
            We don&apos;t offer direct exchanges at this time. To get a different size or color,
            please return the original item for a refund and place a new order. This ensures you
            get the item you want before your preferred size or color sells out.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Damaged or Defective Items</h2>
          <p>
            Received a damaged or defective item? We&apos;re sorry about that! Please email us at{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-apricot-deep hover:text-apricot-deep/80">
              hello@smalltowngiftco.com
            </a>{" "}
            within 7 days of delivery with photos of the damage. We&apos;ll send a replacement or
            issue a full refund — no return required.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">International Returns</h2>
          <p>
            International customers are responsible for return shipping costs. Please contact us
            before shipping to receive return instructions. Customs duties and taxes on returns
            are not refundable.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Questions?</h2>
          <p>
            Need help with a return? Contact us at{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-apricot-deep hover:text-apricot-deep/80">
              hello@smalltowngiftco.com
            </a>{" "}
            or visit our <a href="/contact" className="text-apricot-deep hover:text-apricot-deep/80">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
