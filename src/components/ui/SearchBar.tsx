"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatPrice } from "@/lib/shopify";

interface SearchBarProps {
  onClose?: () => void;
}

interface SearchSuggestion {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setShowSuggestions(false);
        onClose?.();
      }
    },
    [query, router, onClose]
  );

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setSuggestions(data.products || []);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      router.push(`/products/${selected.handle}`);
      setShowSuggestions(false);
      onClose?.();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-full text-sm text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
          autoFocus
          role="combobox"
          aria-expanded={showSuggestions}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute right-3 text-gray-400 hover:text-brand-charcoal"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Autocomplete dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
        >
          {suggestions.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              onClick={() => {
                setShowSuggestions(false);
                onClose?.();
              }}
              role="option"
              aria-selected={index === selectedIndex}
              className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                index === selectedIndex ? "bg-brand-cream" : "hover:bg-gray-50"
              }`}
            >
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={40}
                  height={40}
                  className="rounded-md object-cover w-10 h-10"
                />
              ) : (
                <div className="w-10 h-10 rounded-md bg-brand-cream flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-brand-charcoal truncate">{product.title}</p>
                <p className="text-xs text-brand-gold">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => {
              setShowSuggestions(false);
              onClose?.();
            }}
            className="block px-4 py-2.5 text-center text-sm text-brand-gold hover:bg-gray-50 border-t border-gray-100"
          >
            View all results
          </Link>
        </div>
      )}
    </div>
  );
}
