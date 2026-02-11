"use client";

import type { ProductVariant } from "@/lib/shopify/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}: VariantSelectorProps) {
  // Group options by name (e.g., "Size", "Color")
  const optionGroups = new Map<string, { value: string; variant: ProductVariant }[]>();

  for (const variant of variants) {
    for (const option of variant.selectedOptions) {
      if (!optionGroups.has(option.name)) {
        optionGroups.set(option.name, []);
      }
      const group = optionGroups.get(option.name)!;
      if (!group.some((g) => g.value === option.value)) {
        group.push({ value: option.value, variant });
      }
    }
  }

  // Skip if only "Default Title"
  if (variants.length === 1 && variants[0].title === "Default Title") {
    return null;
  }

  const handleOptionChange = (optionName: string, value: string) => {
    // Find variant matching all selected options with the new value
    const currentOptions = new Map(
      selectedVariant.selectedOptions.map((o) => [o.name, o.value])
    );
    currentOptions.set(optionName, value);

    const match = variants.find((v) =>
      v.selectedOptions.every((o) => currentOptions.get(o.name) === o.value)
    );

    if (match) {
      onSelect(match);
    }
  };

  return (
    <div className="space-y-4">
      {Array.from(optionGroups.entries()).map(([name, options]) => {
        const selectedValue = selectedVariant.selectedOptions.find(
          (o) => o.name === name
        )?.value;

        return (
          <div key={name}>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              {name}: <span className="text-gray-500">{selectedValue}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {options.map(({ value }) => {
                const isSelected = selectedValue === value;
                // Check if this option combination is available
                const isAvailable = variants.some(
                  (v) =>
                    v.availableForSale &&
                    v.selectedOptions.some(
                      (o) => o.name === name && o.value === value
                    )
                );

                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(name, value)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      isSelected
                        ? "border-brand-gold bg-brand-gold/10 text-brand-gold font-medium"
                        : isAvailable
                        ? "border-gray-200 text-brand-charcoal hover:border-brand-gold"
                        : "border-gray-100 text-gray-300 cursor-not-allowed line-through"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
