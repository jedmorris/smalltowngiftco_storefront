"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import StarRating from "./StarRating";
import ReviewCard, { type Review } from "./ReviewCard";
import Button from "@/components/ui/Button";

function getStorageKey(handle: string) {
  return `reviews_${handle}`;
}

function getStoredReviews(handle: string): Review[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(getStorageKey(handle));
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export default function ReviewSection({ productHandle }: { productHandle: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReviews(getStoredReviews(productHandle));
  }, [productHandle]);

  const avgRating = reviews.length > 0
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim() || "Anonymous",
      rating,
      title: title.trim(),
      body: body.trim(),
      date: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(getStorageKey(productHandle), JSON.stringify(updated));

    setName("");
    setRating(0);
    setTitle("");
    setBody("");
    setShowForm(false);
  };

  const inputClass = "w-full px-4 py-2.5 border border-brand-pink rounded-lg text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold";

  return (
    <div className="mt-16 pt-12 border-t border-brand-pink/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl text-brand-charcoal">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(avgRating)} size="sm" />
              <span className="text-sm text-gray-500">
                {avgRating} out of 5 ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Write a Review
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-brand-cream/30 rounded-2xl p-6 mb-8 space-y-4">
          <h3 className="font-serif text-lg text-brand-charcoal">Write Your Review</h3>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-1">Rating</label>
            <StarRating rating={rating} onRate={setRating} interactive />
          </div>

          <div>
            <label htmlFor="reviewName" className="block text-sm font-medium text-brand-charcoal mb-1">
              Your Name
            </label>
            <input
              id="reviewName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Optional"
            />
          </div>

          <div>
            <label htmlFor="reviewTitle" className="block text-sm font-medium text-brand-charcoal mb-1">
              Review Title
            </label>
            <input
              id="reviewTitle"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Summarize your experience"
            />
          </div>

          <div>
            <label htmlFor="reviewBody" className="block text-sm font-medium text-brand-charcoal mb-1">
              Your Review
            </label>
            <textarea
              id="reviewBody"
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={inputClass}
              placeholder="Tell others about your experience with this product"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit">Submit Review</Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream/30 rounded-xl">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-1">No reviews yet</p>
          <p className="text-sm text-gray-400">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)] px-6 py-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
