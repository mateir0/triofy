import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { createLead, listLeads } from "@/lib/crm/repository";
import { requireCrmApiAccess } from "@/lib/crm/api-auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireCrmApiAccess(request);
  if (unauthorized) return unauthorized;

  try {
    const searchParams = request.nextUrl.searchParams;
    const leads = await listLeads({
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      priority: searchParams.get("priority") ?? undefined,
      owner: searchParams.get("owner") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortOrder: searchParams.get("sortOrder") ?? undefined,
    });

    return NextResponse.json({ data: leads });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireCrmApiAccess(request);
  if (unauthorized) return unauthorized;

  try {
    const payload = await request.json();
    const lead = await createLead(payload);
    return NextResponse.json({ data: lead }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
