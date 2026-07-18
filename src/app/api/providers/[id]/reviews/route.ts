import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const reviews = await prisma.review.findMany({
    where: { providerId: id, approved: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { rating } = body;
    const authorName =
      typeof body.authorName === "string" ? body.authorName.trim() : "";
    const comment =
      typeof body.comment === "string" ? body.comment.trim() : "";

    if (!authorName || !rating) {
      return NextResponse.json(
        { error: "Name and rating are required." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    // Verify provider exists and is active
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: { category: { select: { slug: true } } },
    });
    if (!provider || provider.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Provider not found." },
        { status: 404 }
      );
    }

    const review = await prisma.review.create({
      data: {
        providerId: id,
        authorName,
        rating: Math.round(numericRating),
        comment: comment || null,
      },
    });

    // Bust the ISR cache so the new review (and updated avg rating) shows up
    // immediately instead of after the 60s revalidate window.
    revalidatePath(`/provider/${id}`);
    revalidatePath(`/category/${provider.category.slug}`);

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 }
    );
  }
}
