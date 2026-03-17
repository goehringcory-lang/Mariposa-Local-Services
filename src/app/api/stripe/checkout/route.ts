import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { providerId, email } = body;

    if (!providerId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      client_reference_id: providerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/submit?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/submit?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
