export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  image?: ShopifyImage;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ProductVariant[];
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  seo: {
    title: string | null;
    description: string | null;
  };
  updatedAt: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  seo: {
    title: string | null;
    description: string | null;
  };
  updatedAt: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: {
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
    price: MoneyV2;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
    totalTaxAmount: MoneyV2 | null;
  };
  lines: CartItem[];
}

// Raw Shopify GraphQL response types (edges/nodes)
export interface ShopifyEdge<T> {
  node: T;
}

export interface ShopifyConnection<T> {
  edges: ShopifyEdge<T>[];
}
