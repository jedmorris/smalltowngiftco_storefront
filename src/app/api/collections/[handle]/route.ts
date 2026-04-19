import { NextResponse } from "next/server";
import { getCollectionByHandle } from "@/lib/shopify";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") || undefined;

  const collection = await getCollectionByHandle(handle, 24, after);

  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  return NextResponse.json({
    products: collection.products,
    pageInfo: collection.pageInfo,
  });
}
