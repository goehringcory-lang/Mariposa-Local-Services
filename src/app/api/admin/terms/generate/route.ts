import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateTermsToken } from "@/lib/terms";

/**
 * Mints acceptance-link tokens for listings that predate the terms. Safe to run
 * repeatedly: providers that already have a token keep it, so links already
 * sitting in someone's inbox never stop working.
 */
export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const needsToken = await prisma.provider.findMany({
      where: { termsToken: null, acceptedTermsAt: null },
      select: { id: true },
    });

    // One update per provider because each token is unique — there's no bulk
    // form of this. The directory is small enough that it doesn't matter.
    for (const provider of needsToken) {
      await prisma.provider.update({
        where: { id: provider.id },
        data: { termsToken: generateTermsToken() },
      });
    }

    return NextResponse.json({
      message: "Links generated",
      generated: needsToken.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate links." },
      { status: 500 }
    );
  }
}
