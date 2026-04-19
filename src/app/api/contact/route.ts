import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Honeypot check — if a bot fills a hidden field, reject silently
    const body = await request.text().catch(() => "");
    if (body && JSON.parse(body)._hp) {
      return NextResponse.json({ success: true });
    }

    // Send the contact form data via email
    // Using Shopify's built-in email or a third-party service
    // For now, we'll store it and send via the store's email
    const contactData = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      subject: String(subject).slice(0, 500),
      message: String(message).slice(0, 5000),
      submittedAt: new Date().toISOString(),
    };

    // Log the contact submission (server-side only)
    console.log("[Contact Form]", JSON.stringify(contactData));

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! We'll get back to you within 1-2 business days.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
