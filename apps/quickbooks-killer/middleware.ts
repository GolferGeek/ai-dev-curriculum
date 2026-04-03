import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/signin", "/signup"];

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString()
    );
    return payload.exp ? payload.exp < Date.now() / 1000 : false;
  } catch {
    return true; // malformed = treat as expired
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get("qb_token")?.value;
  if (!token || isTokenExpired(token)) {
    const signinUrl = new URL("/signin", request.url);
    const response = NextResponse.redirect(signinUrl);
    if (token) {
      response.cookies.delete("qb_token");
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - api routes that handle their own auth
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
