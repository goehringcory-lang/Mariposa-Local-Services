import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [pendingCount, approvedCount, totalReviews, recentProviders] =
    await Promise.all([
      prisma.provider.count({ where: { status: "PENDING" } }),
      prisma.provider.count({
        where: { status: "APPROVED" },
      }),
      prisma.review.count(),
      prisma.provider.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { category: true },
      }),
    ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-base text-gray-400 mb-1">Pending Submissions</p>
          <p className="text-4xl font-bold text-warning">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-base text-gray-400 mb-1">Active Listings</p>
          <p className="text-4xl font-bold text-success">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-base text-gray-400 mb-1">Total Reviews</p>
          <p className="text-4xl font-bold text-primary">{totalReviews}</p>
        </div>
      </div>

      {/* Pending Submissions */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-700">
            Pending Submissions
          </h2>
          <Link
            href="/admin/providers"
            className="text-primary hover:text-primary-dark font-medium min-h-[48px] flex items-center"
          >
            View All &rarr;
          </Link>
        </div>

        {recentProviders.length === 0 ? (
          <p className="text-lg text-gray-400">No pending submissions.</p>
        ) : (
          <div className="space-y-4">
            {recentProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
              >
                <div>
                  <p className="text-lg font-bold text-gray-600">
                    {provider.name}
                  </p>
                  <p className="text-base text-gray-400">
                    {provider.category.name} &middot; {provider.phone}
                  </p>
                </div>
                <Link
                  href={`/admin/providers/${provider.id}`}
                  className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-lg text-base min-h-[48px] flex items-center"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
