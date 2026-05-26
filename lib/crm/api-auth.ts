import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isCrmRequestAuthorized, CRM_ACCESS_COOKIE } from "@/lib/crm/auth";

export async function requireCrmApiAccess(request: NextRequest) {
  const token = request.cookies.get(CRM_ACCESS_COOKIE)?.value;
  const valid = await isCrmRequestAuthorized(token);

  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
