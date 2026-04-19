"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/shopify";
import type { CustomerOrder } from "@/lib/shopify/types";

interface OrderCardProps {
  order: CustomerOrder;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  FULFILLED: { label: "Fulfilled", color: "text-green-600 bg-green-50" },
  UNFULFILLED: { label: "Processing", color: "text-yellow-600 bg-yellow-50" },
  PARTIALLY_FULFILLED: { label: "Partially Fulfilled", color: "text-blue-600 bg-blue-50" },
};

export default function OrderCard({ order }: OrderCardProps) {
  const status = statusLabels[order.fulfillmentStatus] ?? {
    label: order.fulfillmentStatus,
    color: "text-ink-muted bg-gray-50",
  };

  return (
    <div className="border border-soft rounded-xl p-4 hover:shadow-[var(--shadow-soft)] transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-ink">
            Order #{order.orderNumber}
          </p>
          <p className="text-xs text-ink-muted">
            {new Date(order.processedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
            {status.label}
          </span>
          <span className="font-semibold text-ink">
            {formatPrice(order.totalPrice)}
          </span>
        </div>
      </div>

      {/* Line items preview */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {order.lineItems.slice(0, 4).map((item, i) => (
          <div key={i} className="flex-shrink-0 relative w-14 h-14 bg-stucco rounded-lg overflow-hidden">
            {item.variant?.image ? (
              <Image
                src={item.variant.image.url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-ink-subtle">
                ?
              </div>
            )}
            {item.quantity > 1 && (
              <span className="absolute -top-1 -right-1 bg-apricot-deep text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            )}
          </div>
        ))}
        {order.lineItems.length > 4 && (
          <div className="flex-shrink-0 w-14 h-14 bg-stucco rounded-lg flex items-center justify-center text-xs text-ink-subtle">
            +{order.lineItems.length - 4}
          </div>
        )}
      </div>

      {order.statusUrl && (
        <a
          href={order.statusUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-apricot-deep hover:text-apricot-deep/80 font-medium"
        >
          View order status &rarr;
        </a>
      )}
    </div>
  );
}
