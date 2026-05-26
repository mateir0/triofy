import Link from "next/link";
import { STATUS_LABELS } from "@/lib/crm/constants";
import { getDashboardData } from "@/lib/crm/repository";

function formatDate(value: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

export const dynamic = "force-dynamic";

export default async function CrmDashboardPage() {
  const { statusCounts, followUps } = await getDashboardData();

  const cards = [
    { key: "total", label: "Total Leads", value: statusCounts.total },
    { key: "new", label: "New", value: statusCounts.new },
    { key: "contacted", label: "Contacted", value: statusCounts.contacted },
    { key: "qualified", label: "Qualified", value: statusCounts.qualified },
    { key: "won", label: "Won", value: statusCounts.won },
    { key: "lost", label: "Lost", value: statusCounts.lost },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.key} className="rounded-2xl border border-white/10 bg-[#10202C] p-5">
            <p className="text-sm text-slate-300">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#10202C] p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Pipeline by Status</h2>
        <div className="space-y-3">
          {Object.entries(STATUS_LABELS).map(([status, label]) => {
            const count = statusCounts[status as keyof typeof statusCounts] ?? 0;
            const total = Math.max(statusCounts.total, 1);
            const width = Math.max((count / total) * 100, count > 0 ? 6 : 0);

            return (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{label}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#F4C542]" style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#10202C] p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-white">Leads needing follow-up soon</h2>
          <Link href="/crm/leads" className="text-sm text-[#F4C542] hover:text-[#ffd86f]">
            View all
          </Link>
        </div>

        {followUps.length ? (
          <ul className="space-y-3">
            {followUps.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0D1A24] px-4 py-3">
                <div>
                  <p className="font-medium text-white">{lead.fullName}</p>
                  <p className="text-sm text-slate-300">{lead.company || "No company"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300">{formatDate(lead.nextFollowUpAt)}</p>
                  <Link href={`/crm/leads/${lead.id}`} className="text-xs text-[#F4C542] hover:text-[#ffd86f]">
                    Open lead
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-white/15 bg-[#0D1A24] p-8 text-center text-sm text-slate-400">
            No follow-ups due soon.
          </div>
        )}
      </section>
    </div>
  );
}
