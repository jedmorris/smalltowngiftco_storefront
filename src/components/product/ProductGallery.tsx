"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const selectedImage = images[selectedIndex];

  const goTo = useCallback((index: number) => {
    setSelectedIndex(((index % images.length) + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      goTo(selectedIndex + (diff > 0 ? 1 : -1));
    }
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-brand-cream rounded-2xl flex items-center justify-center text-gray-300">
        No image available
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div
          className="relative aspect-square bg-brand-cream rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Zoom hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
          </div>
          {/* Image counter */}
          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {selectedIndex + 1} / {images.length}
            </span>
          )}
          {/* Mobile nav arrows */}
          {images.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none lg:hidden">
              <button
                onClick={(e) => { e.stopPropagation(); goTo(selectedIndex - 1); }}
                className="pointer-events-auto p-1.5 bg-white/80 rounded-full shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(selectedIndex + 1); }}
                className="pointer-events-auto p-1.5 bg-white/80 rounded-full shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.url}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  index === selectedIndex
                    ? "border-brand-gold ring-2 ring-brand-gold/20"
                    : "border-transparent hover:border-brand-pink"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo(selectedIndex - 1); }}
                  className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo(selectedIndex + 1); }}
                  className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-[90vw] h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.altText || title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
