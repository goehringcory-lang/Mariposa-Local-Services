import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";

export default async function AdminReviewsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      provider: {
        select: { name: true },
      },
    },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Moderate Reviews
      </h1>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-lg text-gray-400">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg font-bold text-gray-600">
                    {review.authorName}
                  </span>
                  <span className="text-accent font-bold">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                  <span className="text-base text-gray-300">
                    for {review.provider.name}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-base text-gray-500 mt-1">
                    {review.comment}
                  </p>
                )}
                <p className="text-sm text-gray-300 mt-1">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <DeleteReviewButton reviewId={review.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
