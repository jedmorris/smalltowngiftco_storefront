import type { Metadata } from "next";
import { Truck, Clock, Globe, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping methods, timeframes, and costs for The Small Town Gift Co. orders.",
};

const shippingMethods = [
  {
    icon: Truck,
    title: "Standard Shipping",
    time: "3–7 business days",
    cost: "Free on orders $75+ · $5.99 under $75",
  },
  {
    icon: Clock,
    title: "Expedited Shipping",
    time: "2–3 business days",
    cost: "$12.99 flat rate",
  },
  {
    icon: Package,
    title: "Overnight Shipping",
    time: "1 business day",
    cost: "$24.99 flat rate",
  },
  {
    icon: Globe,
    title: "International Shipping",
    time: "7–21 business days",
    cost: "Calculated at checkout",
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-brand-gold text-sm">◆</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-brand-charcoal mt-2 mb-4">
          Shipping Policy
        </h1>
        <p className="text-gray-500">Everything you need to know about getting your order to you.</p>
        <div className="decorative-underline mx-auto" />
      </div>

      {/* Shipping Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {shippingMethods.map((method) => (
          <div
            key={method.title}
            className="bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-pink/30 flex items-center justify-center">
                <method.icon className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-charcoal">{method.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">{method.time}</p>
            <p className="text-sm font-medium text-brand-gold">{method.cost}</p>
          </div>
        ))}
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">Processing Time</h2>
          <p>
            Orders are typically processed within 1–2 business days. During peak seasons (holidays,
            sale events), processing may take up to 3 business days. You&apos;ll receive a
            confirmation email with tracking information once your order ships.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">Order Tracking</h2>
          <p>
            Once your order ships, you&apos;ll receive an email with a tracking number. You can also
            view your order status by signing into your account and visiting your{" "}
            <a href="/account" className="text-brand-gold hover:text-brand-gold/80">order history</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">Free Shipping</h2>
          <p>
            We offer <strong>free standard shipping</strong> on all domestic orders of $75 or more.
            The free shipping threshold is calculated before taxes. Free shipping applies to the
            contiguous United States only.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">International Orders</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>International shipping rates are calculated at checkout based on destination and package weight.</li>
            <li>Delivery times vary by country (typically 7–21 business days).</li>
            <li>Customs duties, taxes, and import fees are the responsibility of the buyer and are not included in the shipping cost.</li>
            <li>We are not responsible for delays caused by customs processing.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">Shipping Delays</h2>
          <p>
            While we do our best to meet estimated delivery times, delays can occur due to carrier
            issues, weather, or high order volume. We are not responsible for delays once an order
            has been handed off to the shipping carrier.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">Lost or Damaged Packages</h2>
          <p>
            If your package is lost or arrives damaged, please contact us within 7 days of the
            expected delivery date at{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-brand-gold hover:text-brand-gold/80">
              hello@smalltowngiftco.com
            </a>
            . We&apos;ll work with the carrier to resolve the issue and send a replacement or refund
            as appropriate.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">Questions?</h2>
          <p>
            Have a shipping question? Reach out to us at{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-brand-gold hover:text-brand-gold/80">
              hello@smalltowngiftco.com
            </a>{" "}
            or visit our <a href="/contact" className="text-brand-gold hover:text-brand-gold/80">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
