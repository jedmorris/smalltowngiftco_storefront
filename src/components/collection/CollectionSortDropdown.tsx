"use client";

interface CollectionSortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Selling", value: "best-selling" },
];

export default function CollectionSortDropdown({ value, onChange }: CollectionSortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-soft rounded-full text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-apricot-deep/30 focus:border-apricot-deep cursor-pointer"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
