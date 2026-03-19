import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PhoneButton from "@/components/ui/PhoneButton";
import StarRating from "@/components/ui/StarRating";
import AdSlot from "@/components/ads/AdSlot";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) notFound();

  const providers = await prisma.provider.findMany({
    where: {
      categoryId: category.id,
      status: "APPROVED",
      paymentStatus: "PAID",
    },
    include: {
      reviews: {
        where: { approved: true },
        select: { rating: true },
      },
    },
    orderBy: { name: "asc" },
  });

  // Sort by average rating (highest first), then alphabetically
  const sortedProviders = providers
    .map((p) => ({
      ...p,
      avgRating:
        p.reviews.length > 0
          ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
          : 0,
      reviewCount: p.reviews.length,
    }))
    .sort((a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/"
          className="text-primary hover:text-primary-dark text-lg font-medium min-h-[48px] inline-flex items-center"
        >
          &larr; Back to All Categories
        </Link>
      </nav>

      <h1 className="text-4xl font-bold text-gray-700 mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-xl text-gray-400 mb-8">{category.description}</p>
      )}

      {sortedProviders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-xl text-gray-500 mb-4">
            No providers listed in this category yet.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-lg font-bold px-6 py-3 rounded-xl transition-colors min-h-[48px]"
          >
            Be the first — List Your Business
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <Link
                    href={`/provider/${provider.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    <h2 className="text-2xl font-bold text-gray-700">
                      {provider.name}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 mt-2">
                    <StarRating
                      rating={Math.round(provider.avgRating)}
                      size="sm"
                    />
                    <span className="text-base text-gray-400">
                      ({provider.reviewCount}{" "}
                      {provider.reviewCount === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                  <p className="text-lg text-gray-500 mt-3 line-clamp-2">
                    {provider.description}
                  </p>
                  <p className="text-base text-gray-400 mt-2">
                    Serves: {provider.areaServed}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3">
                  <PhoneButton phone={provider.phone} size="md" />
                  <Link
                    href={`/provider/${provider.id}`}
                    className="text-primary hover:text-primary-dark text-lg font-medium min-h-[48px] inline-flex items-center"
                  >
                    View Details &amp; Reviews &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sponsored Ads */}
      <div className="mt-8">
        <AdSlot placement="category" />
      </div>
    </div>
  );
}
