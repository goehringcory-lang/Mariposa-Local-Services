import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendApprovalEmail } from "@/lib/email";

// Bust the ISR cache for every public page a provider appears on, so status
// changes are visible immediately instead of after the 60s revalidate window.
function revalidateProviderPages(providerId: string, categorySlug: string) {
  revalidatePath("/");
  revalidatePath(`/category/${categorySlug}`);
  revalidatePath(`/provider/${providerId}`);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!provider) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(provider);
}

const STATUS_FOR_ACTION: Record<string, string> = {
  approve: "APPROVED",
  reject: "REJECTED",
  suspend: "SUSPENDED",
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let action: unknown;
  try {
    ({ action } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Object.hasOwn, not `in`: "toString" and friends are on the prototype.
  const isStatusAction =
    typeof action === "string" && Object.hasOwn(STATUS_FOR_ACTION, action);
  if (action !== "delete" && !isStatusAction) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    const existing = await prisma.provider.findUnique({
      where: { id },
      select: { status: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (action === "delete") {
      const provider = await prisma.provider.delete({
        where: { id },
        include: { category: true },
      });
      revalidateProviderPages(provider.id, provider.category.slug);
      return NextResponse.json({ message: "Deleted" });
    }

    const status = STATUS_FOR_ACTION[action as string];
    const provider = await prisma.provider.update({
      where: { id },
      data: { status },
      include: { category: true },
    });

    // Only welcome a provider when the listing first goes live — re-clicking
    // Approve, or reinstating a suspended listing, shouldn't send another
    // "Welcome!" email. (Suspended listings were approved before.)
    const wasLiveBefore =
      existing.status === "APPROVED" || existing.status === "SUSPENDED";
    if (status === "APPROVED" && !wasLiveBefore) {
      try {
        await sendApprovalEmail({
          providerName: provider.name,
          providerEmail: provider.email,
          categoryName: provider.category.name,
        });
      } catch (emailError) {
        console.error("Approval email failed:", emailError);
      }
    }

    revalidateProviderPages(provider.id, provider.category.slug);
    return NextResponse.json(provider);
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
