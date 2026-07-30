import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal";

/**
 * Records a business's agreement to the listing terms from the emailed
 * one-click link. Unauthenticated by necessity — the businesses in the
 * directory have no accounts — so possession of the token is the credential.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = typeof body.token === "string" ? body.token : "";

    if (!token) {
      return NextResponse.json(
        { error: "Missing acceptance token." },
        { status: 400 }
      );
    }

    const provider = await prisma.provider.findUnique({
      where: { termsToken: token },
      select: { id: true, acceptedTermsAt: true },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "This acceptance link was not recognized." },
        { status: 404 }
      );
    }

    // Idempotent: a second click (or a forwarded email) shouldn't overwrite the
    // original agreement date, which is the part that has evidentiary value.
    if (provider.acceptedTermsAt) {
      return NextResponse.json({ message: "Already accepted" });
    }

    await prisma.provider.update({
      where: { id: provider.id },
      data: {
        // Server clock, never the request body — a self-reported date is worth
        // nothing as a record of agreement.
        acceptedTermsAt: new Date(),
        acceptedTermsVersion: LEGAL_EFFECTIVE_DATE,
      },
    });

    return NextResponse.json({ message: "Agreement recorded" });
  } catch {
    return NextResponse.json(
      { error: "Failed to record your agreement. Please try again." },
      { status: 500 }
    );
  }
}
