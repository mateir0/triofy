import Link from "next/link";
import { PriorityBadge } from "@/components/crm/PriorityBadge";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { LEAD_PRIORITIES, LEAD_STATUSES, PRIORITY_LABELS, STATUS_LABELS } from "@/lib/crm/constants";
import { listLeads, listOwners } from "@/lib/crm/repository";

type SearchParamMap = Record<string, string | string[] | undefined>;

function getValue(searchParams: SearchParamMap, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function buildQueryString(searchParams: SearchParamMap, patch: Record<string, string | undefined>) {
  const query = new URLSearchParams();

  for (const [key, raw] of Object.entries(searchParams)) {
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value) query.set(key, value);
  }

  for (const [key, value] of Object.entries(patch)) {
    if (!value) {
      query.delete(key);
    } else {
      query.set(key, value);
    }
  }

  return query.toString();
}

function formatDate(value: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

export const dynamic = "force-dynamic";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamMap>;
}) {
  const params = await searchParams;

  const query = {
    search: getValue(params, "search"),
    status: getValue(params, "status"),
    priority: getValue(params, "priority"),
    owner: getValue(params, "owner"),
    sortBy: getValue(params, "sortBy"),
    sortOrder: getValue(params, "sortOrder"),
  };

  const [leads, owners] = await Promise.all([listLeads(query), listOwners()]);

  const hasFilters = Boolean(query.search || query.status || query.priority || query.owner);

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-2xl border border-white/10 bg-[#10202C] p-4 md:grid-cols-6">
        <input
          name="search"
          defaultValue={query.search}
          placeholder="Search by name, email, company"
          className="rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 md:col-span-2"
        />

        <select
          name="status"
          defaultValue={query.status ?? ""}
          className="rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>

        <select
          name="priority"
          defaultValue={query.priority ?? ""}
          className="rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100"
        >
          <option value="">All priorities</option>
          {LEAD_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>

        <select
          name="owner"
          defaultValue={query.owner ?? ""}
          className="rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100"
        >
          <option value="">All owners</option>
          {owners.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>

        <select
          name="sortBy"
          defaultValue={query.sortBy ?? "createdAt"}
          className="rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100"
        >
          <option value="createdAt">Newest</option>
          <option value="nextFollowUpAt">Next follow-up</option>
          <option value="value">Value</option>
        </select>

        <div className="flex gap-2 md:col-span-6">
          <button
            type="submit"
            className="rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0E1A24] hover:bg-[#e5b73f]"
          >
            Apply
          </button>
          <Link
            href="/crm/leads"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
          >
            Reset
          </Link>
        </div>
      </form>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#10202C]">
        {leads.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Next follow-up</th>
                    <th className="px-4 py-3 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">
                        <Link href={`/crm/leads/${lead.id}`} className="hover:text-[#F4C542]">
                          {lead.fullName}
                        </Link>
                        <p className="text-xs text-slate-400">{lead.email || "No email"}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{lead.company || "—"}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-4 py-3">
                        <PriorityBadge priority={lead.priority} />
                      </td>
                      <td className="px-4 py-3 text-slate-300">{lead.owner || "—"}</td>
                      <td className="px-4 py-3 text-slate-300">{formatDate(lead.nextFollowUpAt)}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.value ? `$${lead.value.toLocaleString()}` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-10 text-center">
            <h2 className="text-lg font-semibold text-white">{hasFilters ? "No matching leads" : "No leads yet"}</h2>
            <p className="mt-2 text-sm text-slate-300">
              {hasFilters
                ? "Try adjusting search or filters to broaden results."
                : "Create your first lead to start tracking pipeline opportunities."}
            </p>
            {!hasFilters ? (
              <Link
                href="/crm/leads/new"
                className="mt-4 inline-flex rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0E1A24]"
              >
                Create lead
              </Link>
            ) : null}
          </div>
        )}
      </section>

      <div className="text-right">
        <Link href="/crm/leads/new" className="text-sm text-[#F4C542] hover:text-[#ffd86f]">
          + Add new lead
        </Link>
      </div>
    </div>
  );
}
