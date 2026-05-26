import type { ReactNode } from "react";
import CrmShell from "@/components/crm/CrmShell";

export default function CrmLayout({ children }: { children: ReactNode }) {
  // Root layout renders the marketing <Navbar /> + <Footer />.
  // The CRM has its own shell, so we suppress the root navbar/footer spacing
  // by offsetting content to the top of the viewport.
  return (
    <div className="-mt-24">
      <CrmShell>{children}</CrmShell>
    </div>
  );
}
