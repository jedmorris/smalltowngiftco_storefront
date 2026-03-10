"use client";

import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PriceRangeSlider from "@/components/ui/PriceRangeSlider";

export interface FilterState {
  priceRange: [number, number];
  vendors: string[];
  productTypes: string[];
  availableOnly: boolean;
}

interface FilterSidebarProps {
  availableVendors: string[];
  availableTypes: string[];
  priceBounds: [number, number];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-brand-pink/30 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-medium text-brand-charcoal mb-2"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSidebar({
  availableVendors,
  availableTypes,
  priceBounds,
  filters,
  onChange,
  resultCount,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeFilterCount =
    (filters.priceRange[0] > priceBounds[0] || filters.priceRange[1] < priceBounds[1] ? 1 : 0) +
    filters.vendors.length +
    filters.productTypes.length +
    (filters.availableOnly ? 1 : 0);

  const clearAll = () => {
    onChange({
      priceRange: priceBounds,
      vendors: [],
      productTypes: [],
      availableOnly: false,
    });
  };

  const toggleArrayFilter = (
    key: "vendors" | "productTypes",
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const filterContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-brand-charcoal">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-brand-gold hover:text-brand-gold/80 transition-colors"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Price">
        <PriceRangeSlider
          min={priceBounds[0]}
          max={priceBounds[1]}
          value={filters.priceRange}
          onChange={(priceRange) => onChange({ ...filters, priceRange })}
        />
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) =>
              onChange({ ...filters, availableOnly: e.target.checked })
            }
            className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
          />
          <span className="text-sm text-brand-charcoal">In stock only</span>
        </label>
      </FilterSection>

      {/* Vendors */}
      {availableVendors.length > 1 && (
        <FilterSection title="Brand">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableVendors.map((vendor) => (
              <label key={vendor} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.vendors.includes(vendor)}
                  onChange={() => toggleArrayFilter("vendors", vendor)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-sm text-brand-charcoal">{vendor}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Product Types */}
      {availableTypes.length > 1 && (
        <FilterSection title="Type">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.productTypes.includes(type)}
                  onChange={() => toggleArrayFilter("productTypes", type)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-sm text-brand-charcoal">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Result count */}
      <p className="text-xs text-gray-400 mt-2">
        {resultCount} {resultCount === 1 ? "product" : "products"} found
      </p>
    </>
  );

  return (
    <>
      {/* Mobile filter trigger */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-brand-pink rounded-full text-sm text-brand-charcoal hover:border-brand-gold transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-brand-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-white z-50 shadow-xl p-6 overflow-y-auto lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-brand-pink/50 rounded-full transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-60 flex-shrink-0">
        {filterContent}
      </div>
    </>
  );
}
