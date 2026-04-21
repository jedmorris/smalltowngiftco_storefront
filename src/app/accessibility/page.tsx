import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Our commitment to making The Small Town Gift Co. accessible to everyone.",
  openGraph: {
    title: "Accessibility | The Small Town Gift Co.",
    description:
      "Our commitment to making The Small Town Gift Co. accessible to everyone.",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-apricot-deep text-sm">✦</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-ink mt-2 mb-4">
          Accessibility
        </h1>
        <p className="text-ink-muted">Last updated: April 2026</p>
        <div className="decorative-underline mx-auto" />
      </div>

      <div className="prose prose-sm max-w-none text-ink-muted space-y-8">
        <section>
          <h2 className="font-serif text-xl text-ink">Our commitment</h2>
          <p>
            The Small Town Gift Co. is committed to providing a website that is
            accessible to the widest possible audience, regardless of technology
            or ability. We actively work to increase the accessibility and
            usability of our site, and in doing so, we adhere to many of the
            available standards and guidelines.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Standards we follow</h2>
          <p>
            This site strives to conform to level AA of the World Wide Web
            Consortium (W3C) Web Content Accessibility Guidelines 2.1. These
            guidelines explain how to make web content more accessible for
            people with disabilities.
          </p>
          <p>
            We take the following steps to ensure accessibility:
          </p>
          <ul>
            <li>Semantic HTML and ARIA landmarks for screen reader navigation</li>
            <li>Keyboard-navigable menus, dialogs, and product selectors</li>
            <li>Alt text for meaningful imagery and icons</li>
            <li>Sufficient color contrast between text and background</li>
            <li>Responsive layouts that support zoom up to 200% without loss of function</li>
            <li>Skip-to-content link at the top of every page</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Ongoing improvements</h2>
          <p>
            Accessibility is not a one-time project — it&apos;s a continuous
            commitment. We regularly audit our site with automated tooling and
            manual review, and we incorporate customer feedback to identify
            areas for improvement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Need help?</h2>
          <p>
            If you experience any difficulty accessing content on our site, or
            have suggestions for how we can improve, please reach out. We want
            to hear from you.
          </p>
          <ul>
            <li>
              Email: <a href="mailto:hello@smalltowngiftco.com">hello@smalltowngiftco.com</a>
            </li>
            <li>
              Contact form: <Link href="/contact">smalltowngiftco.com/contact</Link>
            </li>
          </ul>
          <p>
            We aim to respond to all accessibility-related inquiries within 3
            business days.
          </p>
        </section>
      </div>
    </div>
  );
}
