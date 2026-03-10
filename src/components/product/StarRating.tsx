"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md";
  interactive?: boolean;
}

export default function StarRating({ rating, onRate, size = "md", interactive = false }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = interactive ? star <= (hover || rating) : star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              className={`${starSize} ${
                filled ? "fill-brand-gold text-brand-gold" : "fill-none text-gray-300"
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
}
