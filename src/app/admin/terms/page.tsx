import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { acceptTermsUrl, getSiteUrl } from "@/lib/terms";
import TermsOutreach from "@/components/admin/TermsOutreach";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminTermsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const providers = await prisma.provider.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      acceptedTermsAt: true,
      acceptedTermsVersion: true,
      termsToken: true,
    },
  });

  const accepted = providers.filter((p) => p.acceptedTermsAt);
  const pending = providers.filter((p) => !p.acceptedTermsAt);

  const pendingWithLinks = pending.map((p) => ({
    id: p.id,
    name: p.name,
    email: p.email,
    status: p.status,
    link: p.termsToken ? acceptTermsUrl(p.termsToken) : null,
  }));

  const missingLinks = pendingWithLinks.filter((p) => !p.link).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-2">Terms Agreement</h1>
      <p className="text-lg text-gray-400 mb-6">
        Who has confirmed the listing terms, and how to reach the ones who
        haven&apos;t.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-3xl font-bold text-success">{accepted.length}</p>
          <p className="text-base text-gray-400 mt-1">Confirmed</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-3xl font-bold text-gray-600">{pending.length}</p>
          <p className="text-base text-gray-400 mt-1">Not yet confirmed</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-3xl font-bold text-gray-600">{providers.length}</p>
          <p className="text-base text-gray-400 mt-1">Total listings</p>
        </div>
      </div>

      <TermsOutreach
        pending={pendingWithLinks}
        missingLinks={missingLinks}
        siteUrl={getSiteUrl()}
      />

      {accepted.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Confirmed ({accepted.length})
          </h2>
          <div className="space-y-3">
            {accepted.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="text-lg font-bold text-gray-600">{p.name}</p>
                  <p className="text-base text-gray-400">{p.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-success">
                    Agreed {formatDate(p.acceptedTermsAt!)}
                  </p>
                  {p.acceptedTermsVersion && (
                    <p className="text-sm text-gray-400">
                      Terms of {p.acceptedTermsVersion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
