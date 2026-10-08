import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin/session-token-edge";
import { verifyAdminSessionTokenEdge } from "@/lib/admin/session-token-edge";

const PROTECTED_PAGE_PREFIX = "/admin";
const PROTECTED_API_PREFIXES = ["/api/admin", "/api/upload"];

function nextWithPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage =
    pathname === PROTECTED_PAGE_PREFIX || pathname.startsWith(`${PROTECTED_PAGE_PREFIX}/`);
  const isProtectedApi = PROTECTED_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtectedPage && !isProtectedApi) {
    return nextWithPathname(request);
  }

  if (pathname === "/admin/login" || pathname === "/api/admin/auth/login") {
    return nextWithPathname(request);
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authed = await verifyAdminSessionTokenEdge(token);

  if (!authed) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return nextWithPathname(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|mov)$).*)",
  ],
};
