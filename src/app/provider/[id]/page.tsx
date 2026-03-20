import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PhoneButton from "@/components/ui/PhoneButton";
import StarRating from "@/components/ui/StarRating";
import ReviewForm from "@/components/reviews/ReviewForm";

export const revalidate = 60;

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const provider = await prisma.provider.findUnique({
    where: { id, status: "APPROVED" },
    include: {
      category: true,
      reviews: {
        where: { approved: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!provider) notFound();

  const avgRating =
    provider.reviews.length > 0
      ? provider.reviews.reduce((sum, r) => sum + r.rating, 0) /
        provider.reviews.length
      : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap gap-2 text-lg">
        <Link
          href="/"
          className="text-primary hover:text-primary-dark font-medium min-h-[48px] inline-flex items-center"
        >
          Home
        </Link>
        <span className="text-gray-300 flex items-center">/</span>
        <Link
          href={`/category/${provider.category.slug}`}
          className="text-primary hover:text-primary-dark font-medium min-h-[48px] inline-flex items-center"
        >
          {provider.category.name}
        </Link>
        <span className="text-gray-300 flex items-center">/</span>
        <span className="text-gray-500 flex items-center">{provider.name}</span>
      </nav>

      {/* Provider Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-3">
          {provider.name}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={Math.round(avgRating)} size="md" />
          <span className="text-lg text-gray-400">
            {avgRating.toFixed(1)} ({provider.reviews.length}{" "}
            {provider.reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>

        <div className="mb-6">
          <PhoneButton phone={provider.phone} size="lg" />
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-gray-600">About</h2>
            <p className="text-lg text-gray-500 whitespace-pre-line">
              {provider.description}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-600">Service Area</h2>
            <p className="text-lg text-gray-500">{provider.areaServed}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-600">Category</h2>
            <Link
              href={`/category/${provider.category.slug}`}
              className="text-lg text-primary hover:text-primary-dark font-medium"
            >
              {provider.category.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Reviews ({provider.reviews.length})
        </h2>

        {provider.reviews.length === 0 ? (
          <p className="text-lg text-gray-400">
            No reviews yet. Be the first to leave a review!
          </p>
        ) : (
          <div className="space-y-6">
            {provider.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-5 last:border-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-gray-600">
                    {review.authorName}
                  </span>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                {review.comment && (
                  <p className="text-lg text-gray-500">{review.comment}</p>
                )}
                <p className="text-base text-gray-300 mt-1">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Leave a Review
        </h2>
        <ReviewForm providerId={provider.id} />
      </div>
    </div>
  );
}
