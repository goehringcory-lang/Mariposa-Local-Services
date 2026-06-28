import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route-level gate for the /admin area.
//
// The authoritative authorization still lives on the server (each admin page
// calls `auth()` and every admin API route returns 401 without a session).
// This middleware is the front line: it keeps unauthenticated visitors out of
// the admin UI entirely — including the client-rendered pages that would
// otherwise render their shell (or crash) before any data loads — and bounces
// already-signed-in users away from the login screen.
//
// We check for the NextAuth session cookie rather than decoding it here so the
// middleware stays on the edge runtime and never bundles Prisma/bcrypt.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasSession =
    req.cookies.has("authjs.session-token") ||
    req.cookies.has("__Secure-authjs.session-token");

  const isLogin = pathname === "/admin/login";

  if (!isLogin && !hasSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLogin && hasSession) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
