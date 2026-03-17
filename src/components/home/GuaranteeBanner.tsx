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
    <section className="py-16 lg:py-20 border-t border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`text-center transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-cream mb-3">
                <feature.icon className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-sm text-brand-charcoal mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
