import { notFound } from "next/navigation";
import LeadDetailClient from "@/components/crm/LeadDetailClient";
import { getLeadById } from "@/lib/crm/repository";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return <LeadDetailClient lead={lead} />;
}
