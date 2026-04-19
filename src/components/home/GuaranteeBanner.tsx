"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Truck, Heart, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Love-it promise",
    description: "Not happy? We'll make it right.",
  },
  {
    icon: Truck,
    title: "Free shipping",
    description: "On orders over $75.",
  },
  {
    icon: Heart,
    title: "Packed with love",
    description: "From our small town in SD.",
  },
  {
    icon: Lock,
    title: "Secure checkout",
    description: "Safe & encrypted.",
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
    <section className="py-16 border-t border-border-soft" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
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
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-peach-soft text-apricot-deep border border-apricot-deep/25 mb-3">
                <feature.icon className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <h3 className="font-serif text-[15px] font-medium text-ink mb-0.5">
                {feature.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
