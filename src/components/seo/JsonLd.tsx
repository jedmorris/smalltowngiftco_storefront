import type { Product, Collection } from "@/lib/shopify/types";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  product?: Product;
  collection?: Collection;
  breadcrumbs?: BreadcrumbItem[];
}

export default function JsonLd({ product, collection, breadcrumbs }: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smalltowngiftco.com";
  const schemas: object[] = [];

  // Breadcrumb schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: crumb.url.startsWith("http") ? crumb.url : `${siteUrl}${crumb.url}`,
      })),
    });
  }

  if (product) {
    schemas.push({
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
    });
  } else if (collection) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: collection.title,
      description: collection.description,
      url: `${siteUrl}/collections/${collection.handle}`,
    });
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "The Small Town Gift Co.",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      description:
        "Designer shirts, sweaters, and personalized gifts for every occasion.",
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
