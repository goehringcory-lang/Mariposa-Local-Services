"use client";

import { useRouter } from "next/navigation";

export default function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this review?")) return;

    const res = await fetch(`/api/admin/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-100 hover:bg-red-200 text-danger font-bold px-4 py-2 rounded-lg text-base min-h-[48px]"
    >
      Delete Review
    </button>
  );
}
