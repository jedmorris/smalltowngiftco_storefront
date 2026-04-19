import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export interface StoredReview {
  id: string;
  productHandle: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

const REVIEWS_FILE = path.join(process.cwd(), ".tmp", "reviews.json");

async function readReviews(): Promise<StoredReview[]> {
  try {
    const data = await fs.readFile(REVIEWS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeReviews(reviews: StoredReview[]) {
  await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
  await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Product handle is required" }, { status: 400 });
  }

  const allReviews = await readReviews();
  const productReviews = allReviews
    .filter((r) => r.productHandle === handle)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ reviews: productReviews });
}

export async function POST(request: Request) {
  try {
    const { productHandle, name, rating, title, body } = await request.json();

    if (!productHandle || !title || !body || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }

    const review: StoredReview = {
      id: Date.now().toString(),
      productHandle: String(productHandle).slice(0, 200),
      name: String(name || "Anonymous").slice(0, 100),
      rating,
      title: String(title).slice(0, 300),
      body: String(body).slice(0, 5000),
      date: new Date().toISOString(),
    };

    const reviews = await readReviews();
    reviews.push(review);
    await writeReviews(reviews);

    return NextResponse.json({ success: true, review });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
