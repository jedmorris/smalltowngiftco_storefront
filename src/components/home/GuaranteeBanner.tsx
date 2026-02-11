"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Truck, Heart, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Love It Guarantee",
    description: "Not happy? We'll make it right or your money back.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75. Fast & tracked delivery.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Designed in our small town, crafted with care.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "Your payment info is safe & encrypted.",
  },
];

export default function GuaranteeBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 lg:py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-brand-forest to-brand-forest/90 rounded-2xl p-8 lg:p-12 shadow-[var(--shadow-medium)]">
          <div className="text-center mb-8">
            <span className="text-brand-gold text-sm">◆</span>
            <h2 className="font-serif text-2xl lg:text-3xl text-white mt-2">
              Why Shop With Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`text-center transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                  <feature.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-serif text-lg text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
