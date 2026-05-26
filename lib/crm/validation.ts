import { z } from "zod";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "@/lib/crm/constants";

const optionalText = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((value) => (value && value.length ? value : undefined));

const optionalEmail = z
  .string()
  .trim()
  .email()
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : undefined));

const optionalDate = z
  .string()
  .optional()
  .transform((value) => {
    if (!value) return undefined;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  });

const optionalNumber = z
  .union([z.string(), z.number()])
  .optional()
  .transform((value) => {
    if (value === undefined || value === null || value === "") return undefined;
    const numeric = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numeric) ? Math.round(numeric) : undefined;
  });

const optionalTags = z
  .union([z.array(z.string()), z.string()])
  .optional()
  .transform((value) => {
    if (!value) return [];
    const normalized = Array.isArray(value) ? value : value.split(",");
    return normalized.map((tag) => tag.trim()).filter(Boolean);
  });

export const leadCreateSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(120),
  email: optionalEmail,
  phone: optionalText,
  company: optionalText,
  source: optionalText,
  status: z.enum(LEAD_STATUSES).default("new"),
  value: optionalNumber,
  priority: z.enum(LEAD_PRIORITIES).default("medium"),
  tags: optionalTags,
  owner: optionalText,
  lastContactedAt: optionalDate,
  nextFollowUpAt: optionalDate,
});

export const leadUpdateSchema = leadCreateSchema.partial();

export const leadNoteSchema = z.object({
  body: z.string().trim().min(1, "Note is required").max(5000),
});

export const leadQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  priority: z.enum(LEAD_PRIORITIES).optional(),
  owner: z.string().optional(),
  sortBy: z.enum(["createdAt", "nextFollowUpAt", "value"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
