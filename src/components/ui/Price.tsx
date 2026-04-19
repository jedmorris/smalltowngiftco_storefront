import { formatPrice, isOnSale } from "@/lib/shopify";
import type { MoneyV2 } from "@/lib/shopify/types";

interface PriceProps {
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  className?: string;
}

export default function Price({ price, compareAtPrice, className = "" }: PriceProps) {
  const onSale = isOnSale(price, compareAtPrice ?? null);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={onSale ? "text-red-600 font-semibold" : "text-ink font-semibold"}>
        {formatPrice(price)}
      </span>
      {onSale && compareAtPrice && (
        <span className="text-ink-subtle line-through text-sm">
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
