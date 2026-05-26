import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { leadCreateSchema, leadNoteSchema, leadQuerySchema, leadUpdateSchema } from "@/lib/crm/validation";

export async function listLeads(rawQuery: unknown) {
  const query = leadQuerySchema.parse(rawQuery);

  const where: Prisma.LeadWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.priority ? { priority: query.priority } : {}),
    ...(query.owner ? { owner: query.owner } : {}),
    ...(query.search
      ? {
          OR: [
            { fullName: { contains: query.search, mode: "insensitive" } },
            { email: { contains: query.search, mode: "insensitive" } },
            { company: { contains: query.search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sortOrder ?? "desc";

  return prisma.lead.findMany({
    where,
    orderBy: [{ [sortBy]: sortOrder }, { createdAt: "desc" }],
    include: {
      _count: {
        select: { notes: true },
      },
    },
  });
}

export async function createLead(rawInput: unknown) {
  const input = leadCreateSchema.parse(rawInput);

  return prisma.lead.create({
    data: {
      ...input,
      tags: input.tags ?? [],
    },
  });
}

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function updateLead(id: string, rawInput: unknown) {
  const input = leadUpdateSchema.parse(rawInput);

  return prisma.lead.update({
    where: { id },
    data: {
      ...input,
      ...(input.tags ? { tags: input.tags } : {}),
    },
  });
}

export async function deleteLead(id: string) {
  return prisma.lead.delete({ where: { id } });
}

export async function listLeadNotes(leadId: string) {
  return prisma.leadNote.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createLeadNote(leadId: string, rawInput: unknown) {
  const input = leadNoteSchema.parse(rawInput);

  return prisma.leadNote.create({
    data: {
      leadId,
      body: input.body,
    },
  });
}

export async function getDashboardData() {
  const [counts, followUps] = await Promise.all([
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.lead.findMany({
      where: {
        nextFollowUpAt: {
          not: null,
          lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        },
      },
      orderBy: { nextFollowUpAt: "asc" },
      take: 8,
    }),
  ]);

  const statusCounts = {
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal_sent: 0,
    won: 0,
    lost: 0,
  };

  for (const item of counts) {
    statusCounts[item.status] = item._count.status;
    statusCounts.total += item._count.status;
  }

  return { statusCounts, followUps };
}

export async function listOwners() {
  const owners = await prisma.lead.findMany({
    where: {
      owner: {
        not: null,
      },
    },
    distinct: ["owner"],
    select: {
      owner: true,
    },
    orderBy: {
      owner: "asc",
    },
  });

  return owners.map((entry) => entry.owner).filter((owner): owner is string => Boolean(owner));
}
