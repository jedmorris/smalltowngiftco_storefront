import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for shopping at The Small Town Gift Co.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-brand-gold text-sm">◆</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-brand-charcoal mt-2 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-500">Last updated: March 2026</p>
        <div className="decorative-underline mx-auto" />
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">1. Agreement to Terms</h2>
          <p>
            By accessing or using The Small Town Gift Co. website at smalltowngiftco.com (&quot;Site&quot;),
            you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to
            these Terms, please do not use our Site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">2. Products & Pricing</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All product descriptions, images, and prices are subject to change without notice.</li>
            <li>We make every effort to display product colors and details accurately, but we cannot guarantee your screen will display them exactly.</li>
            <li>Prices are listed in US dollars (USD) and do not include applicable taxes or shipping costs unless stated otherwise.</li>
            <li>We reserve the right to limit quantities or refuse any order at our discretion.</li>
            <li>In the event of a pricing error, we reserve the right to cancel the order and notify you.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">3. Orders & Payment</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>By placing an order, you represent that you are at least 18 years old or have parental consent.</li>
            <li>All orders are subject to acceptance and product availability.</li>
            <li>Payment is processed securely through Shopify Payments or other accepted payment methods at checkout.</li>
            <li>You agree to provide accurate billing and shipping information.</li>
            <li>An order confirmation email does not constitute acceptance of your order — acceptance occurs when we ship your items.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">4. Shipping</h2>
          <p>
            Please refer to our <a href="/shipping" className="text-brand-gold hover:text-brand-gold/80">Shipping Policy</a> for
            detailed information on shipping methods, timeframes, and costs. We are not responsible
            for delays caused by shipping carriers or customs processing.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">5. Returns & Refunds</h2>
          <p>
            Please refer to our <a href="/returns" className="text-brand-gold hover:text-brand-gold/80">Returns Policy</a> for
            detailed information on returns, exchanges, and refunds.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">6. User Accounts</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">7. Intellectual Property</h2>
          <p>
            All content on this Site — including text, graphics, logos, images, product designs, and
            software — is the property of The Small Town Gift Co. or its licensors and is protected
            by copyright, trademark, and other intellectual property laws. You may not reproduce,
            distribute, or create derivative works from our content without written permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, The Small Town Gift Co. shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising from your
            use of our Site or products. Our total liability shall not exceed the amount you paid
            for the product giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless The Small Town Gift Co. and its officers,
            directors, employees, and agents from any claims, losses, or damages arising from your
            violation of these Terms or your use of the Site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            United States. Any disputes shall be resolved in the courts of the state in which
            The Small Town Gift Co. is registered.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on this
            page with an updated date. Your continued use of the Site after changes constitutes
            acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">12. Contact</h2>
          <p>
            Questions about these Terms? Contact us at{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-brand-gold hover:text-brand-gold/80">
              hello@smalltowngiftco.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
