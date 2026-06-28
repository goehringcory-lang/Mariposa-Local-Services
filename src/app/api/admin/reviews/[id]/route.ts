import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    // Prisma throws P2025 when the record doesn't exist.
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
}
