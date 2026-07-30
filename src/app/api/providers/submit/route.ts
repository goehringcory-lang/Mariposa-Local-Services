import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewSubmissionNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId } = body;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const areaServed =
      typeof body.areaServed === "string" ? body.areaServed.trim() : "";

    if (!name || !phone || !email || !description || !categoryId) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    // Strict equality, not truthiness: a hand-crafted request sending "false"
    // or 1 shouldn't count as agreeing to the listing terms.
    if (body.agreedToTerms !== true) {
      return NextResponse.json(
        {
          error:
            "You must agree to the Business Listing Terms and Terms of Use to submit a listing.",
        },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
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
        name,
        phone,
        email: email.toLowerCase(),
        description,
        categoryId,
        areaServed: areaServed || "Mariposa & Surrounding Areas",
        status: "PENDING",
        // Timestamped here rather than taken from the client so the record of
        // consent can't be spoofed or predated.
        acceptedTermsAt: new Date(),
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
