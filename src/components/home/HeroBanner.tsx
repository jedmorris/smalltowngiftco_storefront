"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[520px] overflow-hidden bg-peach-soft border-b border-border-soft">
      {/* Content */}
      <div className="absolute inset-0 flex items-center z-[3]">
        <div className="max-w-[1280px] mx-auto px-10 w-full">
          <div className="max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.22em] text-espresso-soft opacity-75 mb-3.5"
            >
              Summer &middot; New arrivals
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-serif font-normal text-ink text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-[1.02] tracking-[-0.01em] mb-4"
            >
              Thoughtful gifts for every occasion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-espresso text-[17px] leading-[1.55] mb-7 max-w-[460px]"
            >
              Curated shirts, sweaters &amp; personalized gifts — from our small town to your doorstep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="/collections">
                <Button size="lg">Shop now</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
