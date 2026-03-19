import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewSubmissionNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, description, categoryId, areaServed } = body;

    if (!name || !phone || !email || !description || !categoryId) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Invalid category selected." },
        { status: 400 }
      );
    }

    const provider = await prisma.provider.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        description: description.trim(),
        categoryId,
        areaServed: areaServed?.trim() || "Mariposa & Surrounding Areas",
        status: "PENDING",
      },
    });

    // Notify admin of new submission
    try {
      await sendNewSubmissionNotification({
        providerName: provider.name,
        providerEmail: provider.email,
        providerPhone: provider.phone,
        categoryName: category.name,
      });
    } catch {
      // Don't block submission if notification fails
    }

    return NextResponse.json(
      { message: "Submission received", id: provider.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
