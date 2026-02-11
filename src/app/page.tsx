import { getFeaturedProducts, getAllCollections } from "@/lib/shopify";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BestSellers from "@/components/home/BestSellers";
import GuaranteeBanner from "@/components/home/GuaranteeBanner";

export const revalidate = 3600;

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getFeaturedProducts(8),
    getAllCollections(),
  ]);

  // Filter out the default "frontpage" collection for display
  const displayCollections = collections.filter(
    (c) => c.handle !== "frontpage"
  ).slice(0, 4);

  return (
    <>
      <HeroBanner />
      <FeaturedCollections collections={displayCollections} />
      <BestSellers products={products} />
      <GuaranteeBanner />
    </>
  );
}
