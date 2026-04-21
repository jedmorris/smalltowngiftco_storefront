"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Unisex comfort-fit tee/sweatshirt sizing (Comfort Colors-aligned). Measurements
// in inches. For a richer guide per product, fetch metafields on the product
// detail route and pass them in.
const SIZE_ROWS: { size: string; chest: string; length: string }[] = [
  { size: "XS", chest: "32–34", length: "27" },
  { size: "S", chest: "35–37", length: "28" },
  { size: "M", chest: "38–41", length: "29" },
  { size: "L", chest: "42–45", length: "30" },
  { size: "XL", chest: "46–49", length: "31" },
  { size: "2XL", chest: "50–53", length: "32" },
  { size: "3XL", chest: "54–57", length: "33" },
];

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/45"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative bg-paper rounded-[20px] shadow-strong border border-border-soft w-full max-w-lg max-h-[88vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
          >
            <div className="sticky top-0 bg-paper border-b border-border-soft flex items-center justify-between px-6 py-4 z-10">
              <h2 id="size-guide-title" className="font-serif text-xl text-ink">
                Size guide
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-ink hover:text-apricot-deep transition-colors"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-ink-muted mb-4">
                Our tees &amp; sweatshirts run true to unisex comfort-fit sizing. Measurements in inches.
              </p>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-soft">
                    <th className="text-left py-2 font-semibold text-ink">Size</th>
                    <th className="text-left py-2 font-semibold text-ink">Chest</th>
                    <th className="text-left py-2 font-semibold text-ink">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map((r) => (
                    <tr key={r.size} className="border-b border-border-soft/50">
                      <td className="py-2.5 font-medium text-ink">{r.size}</td>
                      <td className="py-2.5 text-ink-muted">{r.chest}</td>
                      <td className="py-2.5 text-ink-muted">{r.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="font-serif text-base text-ink mt-6 mb-1.5">How to measure</h3>
              <ul className="text-sm text-ink-muted space-y-1.5 list-disc list-inside">
                <li><strong className="text-ink">Chest:</strong> measure around the fullest part of your chest, under the arms.</li>
                <li><strong className="text-ink">Length:</strong> from the highest point of the shoulder seam to the bottom hem.</li>
                <li>Prefer an oversized fit? Size up for a relaxed silhouette.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
