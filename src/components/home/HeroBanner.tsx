"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { getHeroContent } from "@/lib/seasons";

const hero = getHeroContent();

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[540px] lg:min-h-[640px] overflow-hidden border-b border-border-soft">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-peach-soft via-stucco to-bougainvillea-soft" />
      <div className="absolute inset-0 image-grain opacity-80" />
      <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-bougainvillea/25 blur-[120px]" />
      <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-apricot/25 blur-[120px]" />

      {/* Content */}
      <div className="relative z-[3] flex items-center min-h-[540px] lg:min-h-[640px]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10 w-full py-16">
          <div className="max-w-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.26em] text-espresso-soft mb-4 inline-block"
            >
              ✦ {hero.tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-serif font-normal text-ink text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] leading-[1.02] tracking-[-0.01em] mb-5"
            >
              Thoughtful gifts<br />
              for every occasion.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-espresso text-[17px] md:text-[18px] leading-[1.55] mb-8 max-w-[500px]"
            >
              Curated shirts, sweaters &amp; personalized gifts — from our small
              town in San Diego to your doorstep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/collections/new-arrivals">
                <Button size="lg">Shop new arrivals</Button>
              </Link>
              <Link href="/collections/best-sellers">
                <Button size="lg" variant="outline">
                  Shop best sellers
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
