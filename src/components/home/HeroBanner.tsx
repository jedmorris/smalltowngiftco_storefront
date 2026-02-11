"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Truck, Lock, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const trustBadges = [
  { icon: Truck, label: "Free Shipping $75+" },
  { icon: Shield, label: "Love It Guarantee" },
  { icon: Lock, label: "Secure Checkout" },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt="The Small Town Gift Co. — Thoughtful gifts for every occasion"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
      <div className="absolute inset-0 image-overlay-vignette" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-lg">
            {/* Diamond ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-brand-gold text-sm mb-4"
            >
              ◆
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4"
            >
              Thoughtful Gifts for Every Occasion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/90 text-lg mb-8 max-w-md"
            >
              Curated shirts, sweaters & personalized gifts — from our small town to yours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link href="/collections">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/collections/best-sellers">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-charcoal hover:border-white">
                  Best Sellers
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 text-white/70 text-xs"
                >
                  <badge.icon className="w-3.5 h-3.5" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
