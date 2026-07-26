import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashVisitor } from "@/lib/visitor";
import { minutesAgo } from "@/lib/time";

// Records that a visitor tapped a provider's phone number.
//
// Deliberately deduplicated rather than counting raw taps: one person who
// taps, hangs up, and taps again hasn't sent the provider two jobs. Counting
// unique visitors per window keeps the figure defensible when we put it in
// front of a provider.
const DEDUPE_WINDOW_MINUTES = 30;

// A visitor with no resolvable IP can't be deduplicated, so cap how many
// unattributable events we'll accept site-wide in the window instead.
const ANONYMOUS_WINDOW_LIMIT = 20;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // sendBeacon delivers a Blob with no guarantee of valid JSON, and this
    // endpoint must never fail loudly — the visitor is mid-navigation to their
    // phone dialer. Fall back to an unknown source instead of erroring.
    let source = "unknown";
    try {
      const body = await request.json();
      if (body?.source === "category" || body?.source === "provider") {
        source = body.source;
      }
    } catch {
      // Keep the default.
    }

    const provider = await prisma.provider.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!provider || provider.status !== "APPROVED") {
      return NextResponse.json({ error: "Provider not found." }, { status: 404 });
    }

    const ipHash = hashVisitor(request);
    const since = minutesAgo(DEDUPE_WINDOW_MINUTES);

    if (ipHash) {
      const alreadyCounted = await prisma.contactEvent.findFirst({
        where: { providerId: id, ipHash, createdAt: { gte: since } },
        select: { id: true },
      });

      // Already counted this visitor for this provider — acknowledge without
      // double-counting.
      if (alreadyCounted) {
        return NextResponse.json({ recorded: false }, { status: 200 });
      }
    } else {
      const anonymousCount = await prisma.contactEvent.count({
        where: { ipHash: null, createdAt: { gte: since } },
      });

      if (anonymousCount >= ANONYMOUS_WINDOW_LIMIT) {
        return NextResponse.json({ recorded: false }, { status: 200 });
      }
    }

    await prisma.contactEvent.create({
      data: { providerId: id, type: "PHONE_TAP", source, ipHash },
    });

    return NextResponse.json({ recorded: true }, { status: 201 });
  } catch {
    // Tracking is never worth interrupting a phone call over.
    return NextResponse.json({ recorded: false }, { status: 200 });
  }
}
