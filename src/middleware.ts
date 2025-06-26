import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionTokenDevelop = request.cookies.get("auth-token");
  const sessionTokenProduction = request.cookies.get(
    "__Secure-authjs.session-token"
  );

  console.log({
    log: "Middleware executed",
    tokens: request.cookies,
  });

  const pathname = request.nextUrl.pathname;
  const publicRoute = ["/", "/login", "/register"].includes(pathname);
  const tokens = sessionTokenDevelop || sessionTokenProduction;

  if (!tokens && publicRoute) {
    return NextResponse.next();
  }

  if (!tokens && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (tokens && pathname === "/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto aqueles que começam com:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
