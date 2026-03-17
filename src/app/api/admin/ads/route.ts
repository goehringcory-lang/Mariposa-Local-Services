import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ads = await prisma.ad.findMany({
    orderBy: [{ placement: "asc" }, { sortOrder: "asc" }],
  });
  return NextResponse.json(ads);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    businessName,
    imageUrl,
    linkUrl,
    description,
    placement,
    startDate,
    endDate,
  } = body;

  if (!title || !businessName) {
    return NextResponse.json(
      { error: "Title and business name are required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.ad.aggregate({
    _max: { sortOrder: true },
  });

  const ad = await prisma.ad.create({
    data: {
      title,
      businessName,
      imageUrl: imageUrl || null,
      linkUrl: linkUrl || null,
      description: description || null,
      placement: placement || "sidebar",
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      sortOrder: (maxOrder._max.sortOrder || 0) + 1,
    },
  });

  return NextResponse.json(ad, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);

  const ad = await prisma.ad.update({
    where: { id },
    data,
  });

  return NextResponse.json(ad);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.ad.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
