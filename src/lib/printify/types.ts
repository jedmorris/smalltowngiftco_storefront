import "server-only";

export interface PrintifyShop {
  id: number;
  title: string;
  sales_channel: string;
}

export interface PrintifyVariant {
  id: number;
  sku?: string;
  price: number;
  cost?: number;
  title?: string;
  grams?: number;
  is_enabled: boolean;
  is_default?: boolean;
  is_available?: boolean;
  options?: number[];
  quantity?: number;
}

export interface PrintifyImage {
  src: string;
  variant_ids: number[];
  position: string;
  is_default?: boolean;
  is_selected_for_publishing?: boolean;
}

export interface PrintifyPrintArea {
  variant_ids: number[];
  placeholders: Array<{
    position: string;
    images: Array<{
      id: string;
      name?: string;
      type?: string;
      height?: number;
      width?: number;
      x?: number;
      y?: number;
      scale?: number;
      angle?: number;
    }>;
  }>;
  background?: string;
}

export interface PrintifyExternal {
  id: string;
  handle?: string;
  shipping_template_id?: string | number | null;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options?: unknown[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
  created_at?: string;
  updated_at?: string;
  visible?: boolean;
  is_locked?: boolean;
  blueprint_id: number;
  user_id?: number;
  shop_id?: number;
  print_provider_id: number;
  print_areas: PrintifyPrintArea[];
  print_details?: unknown;
  sales_channel_properties?: Record<string, unknown> | null;
  external?: PrintifyExternal | null;
}

export interface PrintifyPaginated<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
