import type { Product } from "@/lib/shopify/types";

interface JsonLdProps {
  product?: Product;
}

export default function JsonLd({ product }: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smalltowngiftco.com";

  if (product) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.description,
      image: product.images.map((img) => img.url),
      brand: {
        "@type": "Brand",
        name: product.vendor || "The Small Town Gift Co.",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: product.priceRange.minVariantPrice.currencyCode,
        lowPrice: product.priceRange.minVariantPrice.amount,
        highPrice: product.priceRange.maxVariantPrice.amount,
        availability: product.availableForSale
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: `${siteUrl}/products/${product.handle}`,
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }

  // Default: Organization
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Small Town Gift Co.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description:
      "Designer shirts, sweaters, and personalized gifts for every occasion.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
    />
  );
}
