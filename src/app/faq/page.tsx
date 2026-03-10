"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3–7 business days. Expedited shipping (2–3 business days) and overnight shipping are also available at checkout. Orders are processed within 1–2 business days.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all domestic orders of $75 or more. The free shipping threshold is calculated before taxes.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship internationally. Rates are calculated at checkout based on your destination. Please note that customs duties and import taxes are the responsibility of the buyer.",
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive an email with a tracking number. You can also sign into your account and view your order status on your account dashboard.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery for a full refund. Items must be unworn, unwashed, and in original packaging with tags attached. Personalized items and items marked as final sale are not eligible for return.",
      },
      {
        question: "How do I start a return?",
        answer: "Email us at hello@smalltowngiftco.com with your order number and the item(s) you'd like to return. We'll send you a prepaid return label within 1–2 business days.",
      },
      {
        question: "How long do refunds take?",
        answer: "Refunds are processed within 5–7 business days after we receive your return. It may take an additional 3–5 business days for the refund to appear on your statement.",
      },
      {
        question: "Do you offer exchanges?",
        answer: "We don't offer direct exchanges at this time. Please return the original item for a refund and place a new order for the size or color you'd like.",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        question: "Can I modify or cancel my order?",
        answer: "We process orders quickly! If you need to modify or cancel, please email us as soon as possible at hello@smalltowngiftco.com. We can usually make changes if the order hasn't been shipped yet.",
      },
      {
        question: "I received a damaged item. What should I do?",
        answer: "We're sorry about that! Please email us within 7 days of delivery with photos of the damage. We'll send a replacement or issue a full refund — no return needed.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer: "We love gifting! Many of our products come beautifully packaged and gift-ready. Check individual product pages for gift wrapping availability.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        question: "What sizes do you carry?",
        answer: "Sizing varies by product. Check each product page for a detailed size guide. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
      },
      {
        question: "Are your products true to color?",
        answer: "We do our best to photograph products accurately, but colors may vary slightly depending on your screen settings. If you have questions about a specific product's color, feel free to email us.",
      },
      {
        question: "Do you restock sold-out items?",
        answer: "It depends on the item! Some products are limited edition. For popular items, we do restock — sign up for our newsletter to be the first to know when favorites come back.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "Do I need an account to place an order?",
        answer: "No, you can check out as a guest. However, creating an account lets you track orders, save your wishlist, and check out faster on future orders.",
      },
      {
        question: "How do I reset my password?",
        answer: "Currently, please email us at hello@smalltowngiftco.com and we'll help you reset your password. We're working on adding self-service password reset soon.",
      },
    ],
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-pink/30 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-sm font-medium text-brand-charcoal pr-4">{item.question}</span>
        <ChevronDown
          className={`w-4 h-4 text-brand-gold flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-600 pb-4 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-brand-gold text-sm">◆</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-brand-charcoal mt-2 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact" className="text-brand-gold hover:text-brand-gold/80">
            Contact us
          </Link>
        </p>
        <div className="decorative-underline mx-auto" />
      </div>

      <div className="space-y-8">
        {faqSections.map((section) => (
          <div key={section.title}>
            <h2 className="font-serif text-xl text-brand-charcoal mb-3">{section.title}</h2>
            <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)] px-6">
              {section.items.map((item) => (
                <FAQAccordion key={item.question} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 bg-brand-cream/30 rounded-2xl p-8">
        <h3 className="font-serif text-xl text-brand-charcoal mb-2">Still have questions?</h3>
        <p className="text-sm text-gray-500 mb-4">
          We&apos;re here to help! Reach out and we&apos;ll get back to you within 1–2 business days.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-2.5 bg-brand-gold text-white font-medium rounded-full hover:bg-brand-gold/90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
