import { PRIORITY_LABELS } from "@/lib/crm/constants";
import type { LeadPriority } from "@prisma/client";

const priorityColors: Record<LeadPriority, string> = {
  low: "bg-slate-400/15 text-slate-300 border-slate-400/30",
  medium: "bg-orange-400/15 text-orange-300 border-orange-400/30",
  high: "bg-red-400/15 text-red-300 border-red-400/30",
};

export function PriorityBadge({ priority }: { priority: LeadPriority }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityColors[priority]}`}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
