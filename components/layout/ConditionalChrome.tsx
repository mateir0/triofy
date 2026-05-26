"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCrmRoute = pathname.startsWith("/crm");

  if (isCrmRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
