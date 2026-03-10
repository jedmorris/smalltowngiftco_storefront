import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Small Town Gift Co. collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | The Small Town Gift Co.",
    description: "How we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-brand-gold text-sm">◆</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-brand-charcoal mt-2 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500">Last updated: March 2026</p>
        <div className="decorative-underline mx-auto" />
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">1. Information We Collect</h2>
          <p>
            When you visit The Small Town Gift Co. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) at smalltowngiftco.com,
            we may collect the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account information:</strong> Name, email address, and password when you create an account.</li>
            <li><strong>Order information:</strong> Billing and shipping addresses, payment details (processed securely by Shopify), and order history.</li>
            <li><strong>Browsing data:</strong> Pages visited, products viewed, and items added to your cart or wishlist.</li>
            <li><strong>Device information:</strong> Browser type, operating system, and screen resolution.</li>
            <li><strong>Communication data:</strong> Any messages you send us via email or our contact form.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Manage your account and provide customer support</li>
            <li>Send order confirmations, shipping updates, and receipts</li>
            <li>Personalize your shopping experience (wishlist, cart persistence)</li>
            <li>Send promotional emails if you opt in to our newsletter</li>
            <li>Improve our website, products, and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">3. Local Storage & Cookies</h2>
          <p>
            Our website uses your browser&apos;s local storage to enhance your experience. We store:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Shopping cart:</strong> Your cart contents are saved so they persist between visits.</li>
            <li><strong>Wishlist:</strong> Products you save to your wishlist are stored locally on your device.</li>
            <li><strong>Authentication:</strong> If you sign in, a secure access token is stored to keep you logged in.</li>
            <li><strong>Preferences:</strong> Cookie consent status and other display preferences.</li>
          </ul>
          <p>
            You can clear this data at any time through your browser settings. Clearing local storage will
            sign you out and reset your cart and wishlist.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">4. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Shopify:</strong> Our e-commerce platform that processes orders and payments. See <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold/80">Shopify&apos;s Privacy Policy</a>.</li>
            <li><strong>Payment processors:</strong> Payments are handled by Shopify Payments and/or third-party processors. We never store your full credit card number.</li>
            <li><strong>Vercel:</strong> Our website hosting provider. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold/80">Vercel&apos;s Privacy Policy</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">5. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            your data only:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>With service providers necessary to fulfill your order (shipping carriers, payment processors)</li>
            <li>When required by law or to protect our rights</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">6. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information. Our website uses HTTPS
            encryption, and payments are processed through PCI-compliant providers. However, no method
            of internet transmission is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Clear your local storage data through your browser settings</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-brand-gold hover:text-brand-gold/80">
              hello@smalltowngiftco.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">8. Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-charcoal">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:hello@smalltowngiftco.com" className="text-brand-gold hover:text-brand-gold/80">
              hello@smalltowngiftco.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
