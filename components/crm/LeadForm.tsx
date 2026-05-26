"use client";

import { useState } from "react";
import type { LeadPriority, LeadStatus } from "@prisma/client";
import { LEAD_PRIORITIES, LEAD_STATUSES, PRIORITY_LABELS, STATUS_LABELS } from "@/lib/crm/constants";

export type LeadFormValues = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: LeadStatus;
  value: string;
  priority: LeadPriority;
  tags: string;
  owner: string;
  lastContactedAt: string;
  nextFollowUpAt: string;
};

type LeadFormProps = {
  initialValues?: Partial<LeadFormValues>;
  submitLabel: string;
  onSubmit: (values: LeadFormValues) => Promise<void>;
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-[#F4C542]/80 focus:outline-none";

export default function LeadForm({ initialValues, submitLabel, onSubmit }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>({
    fullName: initialValues?.fullName ?? "",
    email: initialValues?.email ?? "",
    phone: initialValues?.phone ?? "",
    company: initialValues?.company ?? "",
    source: initialValues?.source ?? "",
    status: initialValues?.status ?? "new",
    value: initialValues?.value ?? "",
    priority: initialValues?.priority ?? "medium",
    tags: initialValues?.tags ?? "",
    owner: initialValues?.owner ?? "",
    lastContactedAt: initialValues?.lastContactedAt ?? "",
    nextFollowUpAt: initialValues?.nextFollowUpAt ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);

        if (!values.fullName.trim()) {
          setError("Name is required.");
          return;
        }

        setLoading(true);
        try {
          await onSubmit(values);
        } catch {
          setError("Could not save lead. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Full name *</span>
          <input className={inputClass} value={values.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Company</span>
          <input className={inputClass} value={values.company} onChange={(e) => handleChange("company", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Email</span>
          <input className={inputClass} value={values.email} onChange={(e) => handleChange("email", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Phone</span>
          <input className={inputClass} value={values.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Source</span>
          <input className={inputClass} value={values.source} onChange={(e) => handleChange("source", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Owner</span>
          <input className={inputClass} value={values.owner} onChange={(e) => handleChange("owner", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Status</span>
          <select
            className={inputClass}
            value={values.status}
            onChange={(e) => handleChange("status", e.target.value as LeadStatus)}
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Priority</span>
          <select
            className={inputClass}
            value={values.priority}
            onChange={(e) => handleChange("priority", e.target.value as LeadPriority)}
          >
            {LEAD_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Value</span>
          <input className={inputClass} type="number" value={values.value} onChange={(e) => handleChange("value", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Tags (comma-separated)</span>
          <input className={inputClass} value={values.tags} onChange={(e) => handleChange("tags", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Last contacted</span>
          <input
            className={inputClass}
            type="date"
            value={values.lastContactedAt}
            onChange={(e) => handleChange("lastContactedAt", e.target.value)}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-300">Next follow-up</span>
          <input
            className={inputClass}
            type="date"
            value={values.nextFollowUpAt}
            onChange={(e) => handleChange("nextFollowUpAt", e.target.value)}
          />
        </label>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0E1A24] disabled:opacity-70"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
