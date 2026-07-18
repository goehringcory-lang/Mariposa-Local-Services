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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { action } = body;

  try {
    if (action === "approve") {
      const provider = await prisma.provider.update({
        where: { id },
        data: { status: "APPROVED" },
        include: { category: true },
      });

      // Send approval email to the provider
      try {
        await sendApprovalEmail({
          providerName: provider.name,
          providerEmail: provider.email,
          categoryName: provider.category.name,
        });
      } catch (emailError) {
        console.error("Approval email failed:", emailError);
      }

      revalidateProviderPages(provider.id, provider.category.slug);
      return NextResponse.json(provider);
    }

    if (action === "reject") {
      const provider = await prisma.provider.update({
        where: { id },
        data: { status: "REJECTED" },
        include: { category: true },
      });
      revalidateProviderPages(provider.id, provider.category.slug);
      return NextResponse.json(provider);
    }

    if (action === "suspend") {
      const provider = await prisma.provider.update({
        where: { id },
        data: { status: "SUSPENDED" },
        include: { category: true },
      });
      revalidateProviderPages(provider.id, provider.category.slug);
      return NextResponse.json(provider);
    }

    if (action === "delete") {
      const provider = await prisma.provider.delete({
        where: { id },
        include: { category: true },
      });
      revalidateProviderPages(provider.id, provider.category.slug);
      return NextResponse.json({ message: "Deleted" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
