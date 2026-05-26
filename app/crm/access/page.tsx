"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CrmAccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [key, setKey] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasError = searchParams.get("error") === "1";

  return (
    <section className="min-h-screen bg-[#0B1620] px-4 py-20">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#10202C] p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white">Internal access key required</h1>
        <p className="mt-2 text-sm text-slate-300">
          Paste the shared Triofy CRM access key to continue.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!key.trim()) return;
            setSubmitting(true);
            router.push(`/crm?key=${encodeURIComponent(key.trim())}`);
          }}
        >
          <label className="space-y-1">
            <span className="text-xs text-slate-300">Access key</span>
            <input
              type="password"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#0D1A24] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-[#F4C542]/80 focus:outline-none"
              placeholder="Paste key"
            />
          </label>

          {hasError ? <p className="text-sm text-red-300">Invalid access key. Please try again.</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0E1A24] hover:bg-[#e5b73f] disabled:opacity-70"
          >
            {submitting ? "Checking..." : "Access CRM"}
          </button>
        </form>
      </div>
    </section>
  );
}
