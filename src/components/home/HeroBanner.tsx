"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt="The Small Town Gift Co. — Thoughtful gifts for every occasion"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4"
            >
              Thoughtful Gifts for Every Occasion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/85 text-lg mb-8 max-w-md"
            >
              Curated shirts, sweaters & personalized gifts — from our small town to yours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="/collections">
                <Button size="lg">Shop Now</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
