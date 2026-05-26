import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { deleteLead, getLeadById, updateLead } from "@/lib/crm/repository";
import { requireCrmApiAccess } from "@/lib/crm/api-auth";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  const unauthorized = await requireCrmApiAccess(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const lead = await getLeadById(id);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ data: lead });
}

export async function PATCH(request: NextRequest, context: Context) {
  const unauthorized = await requireCrmApiAccess(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;

  try {
    const payload = await request.json();
    const lead = await updateLead(id, payload);
    return NextResponse.json({ data: lead });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  const unauthorized = await requireCrmApiAccess(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;

  try {
    await deleteLead(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
