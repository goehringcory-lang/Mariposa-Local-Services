import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const review = await prisma.review.delete({
      where: { id },
      include: {
        provider: { select: { id: true, category: { select: { slug: true } } } },
      },
    });

    // Bust the ISR cache so the provider's rating updates immediately.
    revalidatePath(`/provider/${review.provider.id}`);
    revalidatePath(`/category/${review.provider.category.slug}`);

    return NextResponse.json({ message: "Deleted" });
  } catch {
    // Prisma throws P2025 when the record doesn't exist.
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
}
