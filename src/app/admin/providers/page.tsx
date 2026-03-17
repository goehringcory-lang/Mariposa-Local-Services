import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminProvidersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { status } = await searchParams;
  const statusFilter = status || "ALL";

  const where =
    statusFilter === "ALL" ? {} : { status: statusFilter };

  const providers = await prisma.provider.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    SUSPENDED: "bg-gray-100 text-gray-800",
  };

  const paymentColors: Record<string, string> = {
    UNPAID: "bg-red-100 text-red-800",
    PAID: "bg-green-100 text-green-800",
    PAST_DUE: "bg-yellow-100 text-yellow-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Manage Providers
      </h1>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["ALL", "PENDING", "APPROVED", "REJECTED", "SUSPENDED"].map((s) => (
          <Link
            key={s}
            href={`/admin/providers${s === "ALL" ? "" : `?status=${s}`}`}
            className={`px-4 py-2 rounded-lg font-bold text-base min-h-[48px] flex items-center transition-colors ${
              statusFilter === s
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Provider List */}
      {providers.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-lg text-gray-400">No providers found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-lg font-bold text-gray-600">
                    {provider.name}
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-sm font-bold ${statusColors[provider.status]}`}
                  >
                    {provider.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm font-bold ${paymentColors[provider.paymentStatus]}`}
                  >
                    {provider.paymentStatus}
                  </span>
                </div>
                <p className="text-base text-gray-400 mt-1">
                  {provider.category.name} &middot; {provider.phone} &middot;{" "}
                  {provider.email}
                </p>
              </div>
              <Link
                href={`/admin/providers/${provider.id}`}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-lg text-base min-h-[48px] flex items-center justify-center"
              >
                Manage
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
