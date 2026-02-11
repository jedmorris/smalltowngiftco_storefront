import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-shopify-hmac-sha256");

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const topic = req.headers.get("x-shopify-topic");

  // Revalidate based on webhook topic
  if (topic?.includes("products")) {
    (revalidateTag as (tag: string) => void)("products");
  }
  if (topic?.includes("collections")) {
    (revalidateTag as (tag: string) => void)("collections");
  }

  return NextResponse.json({
    revalidated: true,
    topic,
    now: Date.now(),
  });
}
