import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email";
import { hashVisitor } from "@/lib/visitor";
import { minutesAgo } from "@/lib/time";

// A lead triggers an email to a real provider, so the abuse ceiling is lower
// and stricter than the phone-tap tracker's.
const RATE_LIMIT_WINDOW_MINUTES = 60;
const MAX_LEADS_PER_VISITOR = 5;
const MAX_ANONYMOUS_LEADS = 10;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();

    // Honeypot: a hidden field no human ever fills in. Bots complete every
    // input they find. Return success so the bot doesn't learn it was caught.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ message: "Request received" }, { status: 201 });
    }

    const customerName =
      typeof body.customerName === "string" ? body.customerName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!customerName || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill out your name, phone number, and what you need." },
        { status: 400 }
      );
    }

    if (customerName.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: "That message is too long. Please shorten it." },
        { status: 400 }
      );
    }

    // A provider can't call back a number that isn't one.
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    // Email is optional here — plenty of people only want a phone call back.
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address, or leave it blank." },
        { status: 400 }
      );
    }

    const provider = await prisma.provider.findUnique({
      where: { id },
      include: { category: { select: { name: true } } },
    });

    if (!provider || provider.status !== "APPROVED") {
      return NextResponse.json({ error: "Provider not found." }, { status: 404 });
    }

    const ipHash = hashVisitor(request);
    const since = minutesAgo(RATE_LIMIT_WINDOW_MINUTES);

    const recentCount = await prisma.lead.count({
      where: ipHash
        ? { ipHash, createdAt: { gte: since } }
        : { ipHash: null, createdAt: { gte: since } },
    });

    const limit = ipHash ? MAX_LEADS_PER_VISITOR : MAX_ANONYMOUS_LEADS;
    if (recentCount >= limit) {
      return NextResponse.json(
        {
          error:
            "You've sent several requests recently. Please try again a little later.",
        },
        { status: 429 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        providerId: id,
        customerName,
        phone,
        email: email ? email.toLowerCase() : null,
        message,
        ipHash,
      },
    });

    // The lead is already saved; a mail failure must not cost us the record or
    // show the visitor an error. It'll still be in the admin inbox.
    try {
      await sendLeadNotification({
        lead: {
          customerName,
          phone,
          email: email || null,
          message,
        },
        providerName: provider.name,
        providerEmail: provider.email,
        categoryName: provider.category.name,
      });
    } catch {
      // Swallowed intentionally — see above.
    }

    return NextResponse.json(
      { message: "Request received", id: lead.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to send your request. Please try again." },
      { status: 500 }
    );
  }
}
