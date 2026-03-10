import StarRating from "./StarRating";

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border-b border-brand-pink/30 last:border-0 py-5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <StarRating rating={review.rating} size="sm" />
          <h4 className="font-medium text-brand-charcoal mt-1">{review.title}</h4>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(review.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-1.5">{review.body}</p>
      <p className="text-xs text-gray-400">— {review.name}</p>
    </div>
  );
}
