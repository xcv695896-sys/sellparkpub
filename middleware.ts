import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin/login")) return NextResponse.next();
  if (path.startsWith("/api/admin/login")) return NextResponse.next();

  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    const token = req.cookies.get("admin_session")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!token || !secret || secret.length < 16) {
      if (path.startsWith("/api/admin")) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
    } catch {
      if (path.startsWith("/api/admin")) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
