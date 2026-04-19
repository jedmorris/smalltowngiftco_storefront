import { NextResponse } from "next/server";
import { predictiveSearch } from "@/lib/shopify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const products = await predictiveSearch(query, 5);
  return NextResponse.json({ products });
}
