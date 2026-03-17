import { NextRequest, NextResponse } from "next/server";
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
    const { authorName, rating, comment } = body;

    if (!authorName || !rating) {
      return NextResponse.json(
        { error: "Name and rating are required." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    // Verify provider exists and is active
    const provider = await prisma.provider.findUnique({
      where: { id },
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
        authorName: authorName.trim(),
        rating: Math.round(rating),
        comment: comment?.trim() || null,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 }
    );
  }
}
