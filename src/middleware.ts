import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/account"];
const PUBLIC_ACCOUNT_PATHS = ["/account/login", "/account/register", "/account/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect account routes
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Allow public auth pages
  const isPublicAuthPage = PUBLIC_ACCOUNT_PATHS.some((p) => pathname === p);
  if (isPublicAuthPage) return NextResponse.next();

  // Check for auth token in cookies (set by the client-side AuthContext)
  const hasToken = request.cookies.has("shopify_customer_token");

  if (!hasToken) {
    const loginUrl = new URL("/account/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
