"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const announcements = [
  <>Free shipping on orders over $75 ✦ Use code <strong>WELCOME15</strong> for 15% off</>,
  <>Love It Guarantee ✦ Not happy? We&apos;ll make it right or your money back</>,
  <>New arrivals weekly ✦ Curated gifts for every occasion</>,
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % announcements.length);
        setAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="bg-brand-forest text-white text-center py-1.5 px-4 text-xs tracking-wide relative">
      <p
        className={`transition-all duration-300 ${
          animating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {announcements[currentIndex]}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
