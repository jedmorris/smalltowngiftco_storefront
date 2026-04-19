"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Instagram, Facebook, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@smalltowngiftco.com", href: "mailto:hello@smalltowngiftco.com" },
  { icon: Phone, label: "Call or Text", value: "(555) 123-4567", href: "tel:+15551234567" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9am–5pm CST" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-soft rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep";

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl lg:text-5xl text-ink mb-4">
          Get in Touch
        </h1>
        <p className="text-ink-muted max-w-lg mx-auto">
          Have a question, need help with an order, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="text-center py-16 bg-stucco/30 rounded-xl">
              <div className="w-14 h-14 rounded-full bg-peach-soft/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-apricot-deep" strokeWidth={1.6} />
              </div>
              <h2 className="font-serif text-2xl text-ink mb-2">Message Sent!</h2>
              <p className="text-ink-muted mb-6">
                Thanks for reaching out!
                We&apos;ll get back to you within 1–2 business days.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-ink mb-1">
                    Email Address
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-ink mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                  placeholder="Order question, product inquiry, etc."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us how we can help..."
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
              )}
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                <Send className="w-4 h-4 mr-2" strokeWidth={1.6} />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stucco/30 rounded-xl p-6 space-y-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-peach-soft/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-apricot-deep" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-xs text-ink-subtle uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-ink hover:text-apricot-deep transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-ink">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-stucco/30 rounded-xl p-6">
            <h3 className="font-serif text-lg text-ink mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-apricot-deep hover:text-white rounded-full transition-all duration-200 text-ink shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-stucco/30 rounded-xl p-6">
            <h3 className="font-serif text-lg text-ink mb-2">Quick Links</h3>
            <ul className="space-y-1.5 text-sm">
              <li><a href="/shipping" className="text-ink-muted hover:text-apricot-deep transition-colors">Shipping Policy</a></li>
              <li><a href="/returns" className="text-ink-muted hover:text-apricot-deep transition-colors">Returns & Refunds</a></li>
              <li><a href="/faq" className="text-ink-muted hover:text-apricot-deep transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
