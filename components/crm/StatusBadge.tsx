import { STATUS_LABELS } from "@/lib/crm/constants";
import type { LeadStatus } from "@prisma/client";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-sky-400/15 text-sky-300 border-sky-400/30",
  contacted: "bg-blue-400/15 text-blue-300 border-blue-400/30",
  qualified: "bg-purple-400/15 text-purple-300 border-purple-400/30",
  proposal_sent: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  won: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  lost: "bg-rose-400/15 text-rose-300 border-rose-400/30",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusColors[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
