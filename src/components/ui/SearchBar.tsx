"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        onClose?.();
      }
    },
    [query, router, onClose]
  );

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <Search className="absolute left-3 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-full text-sm text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
        autoFocus
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 text-gray-400 hover:text-brand-charcoal"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
