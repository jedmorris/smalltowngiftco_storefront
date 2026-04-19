import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        message
      }
    }
  }
`;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Create a Shopify customer with acceptsMarketing=true
    // If the customer already exists, Shopify returns an error we can handle gracefully
    const data = await shopifyFetch<{
      customerCreate: {
        customer: { id: string; email: string } | null;
        customerUserErrors: { code: string; message: string }[];
      };
    }>({
      query: CUSTOMER_CREATE_MUTATION,
      variables: {
        input: {
          email,
          acceptsMarketing: true,
        },
      },
    });

    const errors = data.customerCreate.customerUserErrors;

    if (errors.length > 0) {
      // "TAKEN" means they're already subscribed — treat as success
      if (errors[0].code === "TAKEN") {
        return NextResponse.json({ success: true, message: "You're already subscribed!" });
      }
      return NextResponse.json({ error: errors[0].message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
