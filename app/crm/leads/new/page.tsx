"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LeadForm, { type LeadFormValues } from "@/components/crm/LeadForm";
import { Toast } from "@/components/crm/Toast";

export default function NewLeadPage() {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const toPayload = (values: LeadFormValues) => ({
    ...values,
    value: values.value ? Number(values.value) : undefined,
    tags: values.tags,
    lastContactedAt: values.lastContactedAt || undefined,
    nextFollowUpAt: values.nextFollowUpAt || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-[#10202C] p-5">
        <LeadForm
          submitLabel="Create Lead"
          onSubmit={async (values) => {
            const response = await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(toPayload(values)),
            });

            if (!response.ok) {
              setToast({ message: "Failed to create lead.", type: "error" });
              throw new Error("create failed");
            }

            const payload = await response.json();
            setToast({ message: "Lead created successfully.", type: "success" });
            router.push(`/crm/leads/${payload.data.id}`);
            router.refresh();
          }}
        />
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
