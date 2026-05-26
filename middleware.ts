import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createCrmAccessToken,
  CRM_ACCESS_COOKIE,
  CRM_COOKIE_MAX_AGE,
  verifyCrmAccessToken,
} from "@/lib/crm/auth";

function crmAccessRedirect(request: NextRequest, error = false) {
  const url = new URL("/crm/access", request.url);
  if (error) {
    url.searchParams.set("error", "1");
  }

  return NextResponse.redirect(url);
}

function cleanUrlWithoutKey(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.searchParams.delete("key");
  return url;
}

export async function middleware(request: NextRequest) {
  const accessKey = process.env.CRM_ACCESS_KEY;
  const { pathname, searchParams } = request.nextUrl;

  if (!accessKey) {
    return pathname === "/crm/access" ? NextResponse.next() : crmAccessRedirect(request);
  }

  const incomingKey = searchParams.get("key");

  if (incomingKey) {
    if (incomingKey === accessKey) {
      const response = NextResponse.redirect(cleanUrlWithoutKey(request));
      const token = await createCrmAccessToken(accessKey);

      response.cookies.set({
        name: CRM_ACCESS_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: CRM_COOKIE_MAX_AGE,
      });

      return response;
    }

    return pathname === "/crm/access" ? NextResponse.next() : crmAccessRedirect(request, true);
  }

  const token = request.cookies.get(CRM_ACCESS_COOKIE)?.value;
  const hasAccess = await verifyCrmAccessToken(token, accessKey);

  if (hasAccess) {
    if (pathname === "/crm/access") {
      return NextResponse.redirect(new URL("/crm", request.url));
    }

    return NextResponse.next();
  }

  return pathname === "/crm/access" ? NextResponse.next() : crmAccessRedirect(request);
}

export const config = {
  matcher: ["/crm/:path*"],
};
