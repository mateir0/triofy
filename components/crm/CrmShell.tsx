"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type ShellProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/crm", label: "Dashboard" },
  { href: "/crm/leads", label: "Leads" },
];

function isActive(pathname: string, href: string) {
  if (href === "/crm") return pathname === "/crm";
  return pathname.startsWith(href);
}

export default function CrmShell({ children }: ShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const title = useMemo(() => {
    if (pathname.startsWith("/crm/leads/new")) return "New Lead";
    if (pathname.startsWith("/crm/leads/")) return "Lead Details";
    if (pathname.startsWith("/crm/leads")) return "Leads";
    return "Dashboard";
  }, [pathname]);

  return (
    <section className="min-h-screen bg-[#0B1620] text-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="fixed left-4 top-20 z-30 rounded-lg border border-white/15 bg-[#10202C] px-3 py-2 text-sm text-slate-200 md:hidden"
        >
          Menu
        </button>

        <aside
          className={`fixed left-0 top-0 z-20 h-full w-64 border-r border-white/10 bg-[#10202C] p-5 transition-transform md:static md:h-auto md:translate-x-0 md:rounded-2xl md:border ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between md:justify-start">
            <h2 className="text-lg font-bold tracking-tight text-white">Triofy CRM</h2>
            <button
              type="button"
              className="rounded px-2 py-1 text-xs text-slate-300 md:hidden"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-[#F4C542] text-[#0E1A24] font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="w-full">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#10202C] px-5 py-4">
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <Link
              href="/crm/leads/new"
              className="inline-flex items-center rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0E1A24] hover:bg-[#e5b73f]"
            >
              New Lead
            </Link>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
