import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/time";

// The window we quote to providers. Thirty days is short enough to feel
// current and long enough that a quiet week doesn't make the number look bad.
const WINDOW_DAYS = 30;

export default async function AdminStatsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const since = daysAgo(WINDOW_DAYS);

  const [providers, callsWindow, callsAllTime] = await Promise.all([
    prisma.provider.findMany({
      where: { status: "APPROVED" },
      select: {
        id: true,
        name: true,
        email: true,
        category: { select: { name: true } },
      },
    }),
    prisma.contactEvent.groupBy({
      by: ["providerId"],
      where: { createdAt: { gte: since } },
      _count: { _all: true },
    }),
    prisma.contactEvent.groupBy({
      by: ["providerId"],
      _count: { _all: true },
    }),
  ]);

  const toMap = (rows: { providerId: string; _count: { _all: number } }[]) =>
    new Map(rows.map((r) => [r.providerId, r._count._all]));

  const callsIn30 = toMap(callsWindow);
  const callsEver = toMap(callsAllTime);

  const rows = providers
    .map((p) => ({
      ...p,
      calls30: callsIn30.get(p.id) ?? 0,
      callsTotal: callsEver.get(p.id) ?? 0,
    }))
    // Busiest first — these are the providers with a story worth telling, and
    // therefore the ones to approach about paid placement first.
    .sort((a, b) => b.calls30 - a.calls30 || a.name.localeCompare(b.name));

  const totalCalls30 = rows.reduce((sum, r) => sum + r.calls30, 0);
  const totalCallsEver = rows.reduce((sum, r) => sum + r.callsTotal, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-2">
        Provider Activity
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Calls the directory sent each provider in the last {WINDOW_DAYS} days.
        These are the numbers to cite when you talk to them about paid
        placement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-base text-gray-400 mb-1">
            Calls ({WINDOW_DAYS}d)
          </p>
          <p className="text-4xl font-bold text-success">{totalCalls30}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-base text-gray-400 mb-1">Calls All Time</p>
          <p className="text-4xl font-bold text-primary">{totalCallsEver}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-base text-gray-400 mb-1">Active Listings</p>
          <p className="text-4xl font-bold text-accent">{rows.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">By Provider</h2>

        {rows.length === 0 ? (
          <p className="text-lg text-gray-400">No active listings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-3 pr-4 text-base font-bold text-gray-500">
                    Provider
                  </th>
                  <th className="py-3 px-3 text-base font-bold text-gray-500 text-right whitespace-nowrap">
                    Calls ({WINDOW_DAYS}d)
                  </th>
                  <th className="py-3 pl-3 text-base font-bold text-gray-500 text-right whitespace-nowrap">
                    All Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-4 pr-4">
                      <p className="text-lg font-bold text-gray-600">
                        {row.name}
                      </p>
                      <p className="text-base text-gray-400">
                        {row.category.name}
                      </p>
                    </td>
                    <td className="py-4 px-3 text-right text-2xl font-bold text-success">
                      {row.calls30}
                    </td>
                    <td className="py-4 pl-3 text-right text-lg text-gray-400 whitespace-nowrap">
                      {row.callsTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-base text-gray-400 mt-6">
        Calls count unique visitors who tapped a provider&apos;s phone number,
        not raw taps — so the figure holds up if a provider asks how it&apos;s
        measured. It can&apos;t capture whether the call connected or how long
        it lasted.
      </p>
    </div>
  );
}
