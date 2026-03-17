import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const ad = await prisma.ad.findUnique({ where: { id } });

    if (!ad) {
      return NextResponse.redirect(new URL("/", _request.url));
    }

    // Increment click count
    await prisma.ad.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    });

    // Redirect to the ad's link
    if (ad.linkUrl) {
      return NextResponse.redirect(ad.linkUrl);
    }

    return NextResponse.redirect(new URL("/", _request.url));
  } catch {
    return NextResponse.redirect(new URL("/", _request.url));
  }
}
