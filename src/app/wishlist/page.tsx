import type { Metadata } from "next";
import WishlistContent from "@/components/wishlist/WishlistContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved items from The Small Town Gift Co.",
};

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl lg:text-4xl text-ink mb-8">
        Your Wishlist
      </h1>
      <WishlistContent />
    </div>
  );
}
