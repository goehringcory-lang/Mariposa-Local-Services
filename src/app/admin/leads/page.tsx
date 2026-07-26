import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LeadStatusControl from "@/components/admin/LeadStatusControl";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  CLOSED: "bg-gray-100 text-gray-500",
};

export default async function AdminLeadsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      provider: { select: { name: true, email: true } },
    },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-2">Job Requests</h1>
      <p className="text-lg text-gray-400 mb-6">
        Quote requests sent through the site. Each one was emailed to the
        provider — mark them off as you follow up.
      </p>

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-lg text-gray-400">
            No job requests yet. They&apos;ll show up here as visitors submit
            them.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="text-lg font-bold text-gray-600">
                      {lead.customerName}
                    </span>
                    <span
                      className={`text-sm font-bold px-2 py-1 rounded ${
                        STATUS_STYLES[lead.status] ?? STATUS_STYLES.CLOSED
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-base text-gray-400 mb-2">
                    for <strong>{lead.provider.name}</strong> &middot;{" "}
                    {new Date(lead.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <p className="text-lg text-gray-500 whitespace-pre-line mb-3">
                    {lead.message}
                  </p>

                  <div className="flex gap-4 flex-wrap text-base">
                    <a
                      href={`tel:${lead.phone.replace(/\D/g, "")}`}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      {lead.phone}
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        {lead.email}
                      </a>
                    )}
                  </div>
                </div>

                <LeadStatusControl leadId={lead.id} status={lead.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
