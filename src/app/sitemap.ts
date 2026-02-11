import type { MetadataRoute } from "next";
import { getProductHandles, getCollectionHandles } from "@/lib/shopify";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smalltowngiftco.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([
    getProductHandles(),
    getCollectionHandles(),
  ]);

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.handle}`,
    lastModified: p.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const collectionUrls: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.handle}`,
    lastModified: c.updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...collectionUrls,
    ...productUrls,
  ];
}
