import ProductCard from "./ProductCard";
import type { Product } from "@/lib/shopify/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const gridCols = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  return (
    <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
