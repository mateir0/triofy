"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Lead, LeadNote } from "@prisma/client";
import LeadForm, { type LeadFormValues } from "@/components/crm/LeadForm";
import { PriorityBadge } from "@/components/crm/PriorityBadge";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { Toast } from "@/components/crm/Toast";

type LeadWithNotes = Lead & { notes: LeadNote[] };

function toInputDate(value: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function formatDate(value: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

export default function LeadDetailClient({ lead }: { lead: LeadWithNotes }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [busy, setBusy] = useState(false);

  const initialValues = useMemo<Partial<LeadFormValues>>(
    () => ({
      fullName: lead.fullName,
      email: lead.email ?? "",
      phone: lead.phone ?? "",
      company: lead.company ?? "",
      source: lead.source ?? "",
      status: lead.status,
      value: lead.value?.toString() ?? "",
      priority: lead.priority,
      tags: lead.tags.join(", "),
      owner: lead.owner ?? "",
      lastContactedAt: toInputDate(lead.lastContactedAt),
      nextFollowUpAt: toInputDate(lead.nextFollowUpAt),
    }),
    [lead]
  );

  const toPayload = (values: LeadFormValues) => ({
    ...values,
    value: values.value ? Number(values.value) : undefined,
    tags: values.tags,
    lastContactedAt: values.lastContactedAt || undefined,
    nextFollowUpAt: values.nextFollowUpAt || undefined,
  });

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-[#10202C] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">{lead.fullName}</h2>
            <p className="text-sm text-slate-300">{lead.company || "No company added"}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <PriorityBadge priority={lead.priority} />
          </div>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            <dl className="grid gap-4 text-sm text-slate-300 md:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Email</dt>
                <dd>{lead.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Phone</dt>
                <dd>{lead.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Owner</dt>
                <dd>{lead.owner || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Source</dt>
                <dd>{lead.source || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Value</dt>
                <dd>{lead.value ? `$${lead.value.toLocaleString()}` : "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Next follow-up</dt>
                <dd>{formatDate(lead.nextFollowUpAt)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Last contacted</dt>
                <dd>{formatDate(lead.lastContactedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Tags</dt>
                <dd>{lead.tags.length ? lead.tags.join(", ") : "—"}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-100 hover:bg-white/5"
              >
                Edit Lead
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  const response = await fetch(`/api/leads/${lead.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lastContactedAt: new Date().toISOString() }),
                  });
                  setBusy(false);

                  if (response.ok) {
                    setToast({ message: "Lead marked as contacted today.", type: "success" });
                    router.refresh();
                  } else {
                    setToast({ message: "Failed to update lead.", type: "error" });
                  }
                }}
                className="rounded-lg border border-emerald-300/40 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-300/10 disabled:opacity-60"
              >
                Mark Contacted Today
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={async () => {
                  const confirmed = window.confirm("Delete this lead? This cannot be undone.");
                  if (!confirmed) return;
                  setBusy(true);
                  const response = await fetch(`/api/leads/${lead.id}`, { method: "DELETE" });
                  setBusy(false);

                  if (response.ok) {
                    router.push("/crm/leads");
                    router.refresh();
                  } else {
                    setToast({ message: "Failed to delete lead.", type: "error" });
                  }
                }}
                className="rounded-lg border border-red-300/40 px-3 py-2 text-sm text-red-200 hover:bg-red-300/10 disabled:opacity-60"
              >
                Delete Lead
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <LeadForm
              initialValues={initialValues}
              submitLabel="Save Changes"
              onSubmit={async (values) => {
                const response = await fetch(`/api/leads/${lead.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(toPayload(values)),
                });

                if (!response.ok) {
                  throw new Error("failed");
                }

                setToast({ message: "Lead updated successfully.", type: "success" });
                setIsEditing(false);
                router.refresh();
              }}
            />

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-sm text-slate-300 hover:text-white"
            >
              Cancel editing
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#10202C] p-5">
        <h3 className="mb-3 text-lg font-semibold text-white">Notes</h3>
        <form
          className="mb-4 space-y-2"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!newNote.trim()) return;

            const response = await fetch(`/api/leads/${lead.id}/notes`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ body: newNote }),
            });

            if (!response.ok) {
              setToast({ message: "Failed to add note.", type: "error" });
              return;
            }

            setNewNote("");
            setToast({ message: "Note added.", type: "success" });
            router.refresh();
          }}
        >
          <textarea
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
            rows={4}
            className="w-full rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-[#F4C542]/80 focus:outline-none"
            placeholder="Add a quick update..."
          />
          <button
            type="submit"
            className="rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0E1A24] hover:bg-[#e5b73f]"
          >
            Add Note
          </button>
        </form>

        {lead.notes.length ? (
          <ul className="space-y-3">
            {lead.notes.map((note) => (
              <li key={note.id} className="rounded-lg border border-white/10 bg-[#0D1A24] p-3">
                <p className="text-sm text-slate-200 whitespace-pre-wrap">{note.body}</p>
                <p className="mt-2 text-xs text-slate-400">{new Date(note.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-white/15 bg-[#0D1A24] p-6 text-center text-sm text-slate-400">
            No notes yet. Add context for this lead.
          </div>
        )}
      </div>

      <div className="text-sm text-slate-300">
        <Link href="/crm/leads" className="hover:text-white">
          ← Back to leads
        </Link>
      </div>

      {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
