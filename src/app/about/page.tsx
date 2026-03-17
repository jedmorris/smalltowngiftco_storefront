import type { Metadata } from "next";
import Image from "next/image";
import { Heart, MapPin, Sparkles, Mail, Phone, Clock, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Small Town Gift Co. — our story, our mission, and why we love curating thoughtful gifts.",
};

const values = [
  {
    icon: Heart,
    title: "Thoughtful Gifting",
    description:
      "Every product is designed and curated with care, ensuring quality you can feel.",
  },
  {
    icon: MapPin,
    title: "Small Town Heart",
    description:
      "We're proud of where we come from. Our small-town values guide everything we do.",
  },
  {
    icon: Sparkles,
    title: "Made with Love",
    description:
      "Whether it's a wedding, party, or just because — we've got the perfect gift.",
  },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@smalltowngiftco.com", href: "mailto:hello@smalltowngiftco.com" },
  { icon: Phone, label: "Call or Text", value: "(555) 123-4567", href: "tel:+15551234567" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9am–5pm CST", href: null },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl lg:text-5xl text-brand-charcoal mb-4">
          Our Story
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          From our small town to your doorstep — every gift tells a story.
        </p>
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-cream shadow-[var(--shadow-medium)]">
          <Image
            src="/images/banner.jpg"
            alt="The Small Town Gift Co. storefront"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-brand-charcoal">
            Born from a love of giving
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Small Town Gift Co. started with a simple idea: everyone deserves a gift
            that feels personal, special, and thoughtfully chosen. We believe the best
            gifts come from the heart — and a little bit of great design.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From bachelorette weekends to wedding celebrations, seasonal surprises to
            everyday treats, we curate collections that bring people together and make
            every moment memorable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each of our products is designed with love and attention to detail, because
            we know that the right gift can turn an ordinary day into something
            extraordinary.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {values.map((item) => (
          <div
            key={item.title}
            className="text-center bg-white rounded-xl p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-pink/30 mb-4">
              <item.icon className="w-7 h-7 text-brand-gold" />
            </div>
            <h3 className="font-serif text-xl text-brand-charcoal mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div id="contact" className="mb-16 scroll-mt-24">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl text-brand-charcoal mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-500">We&apos;d love to hear from you!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="text-center bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]"
            >
              <item.icon className="w-6 h-6 text-brand-gold mx-auto mb-3" />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-sm text-brand-charcoal hover:text-brand-gold transition-colors">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-brand-charcoal">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shipping & Returns */}
      <div id="shipping" className="scroll-mt-24">
        <div className="bg-brand-cream/50 rounded-xl p-8 border border-brand-gold/10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-brand-gold" />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-brand-charcoal mb-4">
                Shipping & Returns
              </h2>
              <div className="prose-boutique prose prose-sm text-gray-600 max-w-none space-y-3">
                <p>
                  We offer <strong>free shipping</strong> on all orders over $75. Standard shipping typically
                  takes 3-7 business days. Expedited shipping options are available at checkout.
                </p>
                <p>
                  Not happy with your purchase? We accept returns within <strong>30 days</strong> of delivery
                  for a full refund. Items must be unworn and in original packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
