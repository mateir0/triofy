import type { LeadPriority, LeadStatus } from "@prisma/client";

export const CRM_ACCESS_COOKIE = "crm_access";
export const CRM_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
];

export const LEAD_PRIORITIES: LeadPriority[] = ["low", "medium", "high"];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal_sent: "Proposal Sent",
  won: "Won",
  lost: "Lost",
};

export const PRIORITY_LABELS: Record<LeadPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
