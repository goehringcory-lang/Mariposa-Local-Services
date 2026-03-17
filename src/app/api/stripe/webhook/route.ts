import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const providerId = session.client_reference_id;

      if (providerId) {
        await prisma.provider.update({
          where: { id: providerId },
          data: {
            paymentStatus: "PAID",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
          },
        });
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = (invoice as unknown as Record<string, unknown>).subscription as string;

      if (subscriptionId) {
        await prisma.provider.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { paymentStatus: "PAID" },
        });
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = (invoice as unknown as Record<string, unknown>).subscription as string;

      if (subscriptionId) {
        await prisma.provider.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { paymentStatus: "PAST_DUE" },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await prisma.provider.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { paymentStatus: "CANCELLED" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
