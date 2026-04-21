import { getFeaturedProducts, getAllCollections, getCollectionByHandle } from "@/lib/shopify";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryTileGrid from "@/components/home/CategoryTileGrid";
import TrendingNow from "@/components/home/TrendingNow";
import BundleDealBanner from "@/components/home/BundleDealBanner";
import NewsletterHero from "@/components/home/NewsletterHero";
import ShopByRecipient from "@/components/home/ShopByRecipient";
import SocialProofGrid from "@/components/home/SocialProofGrid";

export const revalidate = 3600;

export default async function HomePage() {
  const [newArrivals, bestSellers, teacherCollection, collections] = await Promise.all([
    getFeaturedProducts(8),
    getFeaturedProducts(8),
    getCollectionByHandle("teacher", 8).catch(() => null),
    getAllCollections(),
  ]);

  return (
    <>
      <HeroBanner />
      <CategoryTileGrid collections={collections} />
      <TrendingNow
        products={newArrivals}
        title="New arrivals"
        subtitle="Fresh drops — the latest from our small town"
        ctaHref="/collections/new-arrivals"
        ctaLabel="Shop new arrivals"
      />
      <BundleDealBanner />
      {teacherCollection && teacherCollection.products.length > 0 && (
        <TrendingNow
          products={teacherCollection.products.slice(0, 4)}
          title="Teacher appreciation"
          subtitle="Thoughtful picks for the educators in your life"
          ctaHref="/collections/teacher"
          ctaLabel="Shop teacher gifts"
        />
      )}
      <NewsletterHero />
      <ShopByRecipient />
      <TrendingNow
        products={bestSellers}
        title="Best sellers"
        subtitle="Our most-loved gifts, hand-picked for you"
        ctaHref="/collections/best-sellers"
        ctaLabel="Shop best sellers"
      />
      <SocialProofGrid />
    </>
  );
}
