import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { createLeadNote, getLeadById, listLeadNotes } from "@/lib/crm/repository";
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

  const notes = await listLeadNotes(id);
  return NextResponse.json({ data: notes });
}

export async function POST(request: NextRequest, context: Context) {
  const unauthorized = await requireCrmApiAccess(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;

  try {
    const payload = await request.json();
    const note = await createLeadNote(id, payload);
    return NextResponse.json({ data: note }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}
