import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const MAINTENANCE_RETRY_AFTER_SECONDS = "86400";

function applyMaintenanceHeaders(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Retry-After", MAINTENANCE_RETRY_AFTER_SECONDS);
  response.headers.set("X-Maintenance-Mode", "true");
  return response;
}

const OPEN_ROUTE_PATTERNS = [
  /^\/$/,
  /^\/(?:nl|en)$/,
  /^\/(?:nl|en)\/magazine(?:\/.*)?$/,
];

function isOpenRoute(pathname: string): boolean {
  return OPEN_ROUTE_PATTERNS.some((p) => p.test(pathname));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/fr")) {
    const rest = pathname.replace(/^\/fr/, "") || "/";
    const target = new URL(`/en${rest === "/" ? "" : rest}`, request.url);
    return NextResponse.redirect(target, 308);
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const locale = routing.locales.includes(firstSegment as "nl" | "en")
    ? firstSegment
    : routing.defaultLocale;

  if (!isOpenRoute(pathname)) {
    const redirectResponse = NextResponse.redirect(
      new URL(`/${locale}`, request.url),
    );
    return applyMaintenanceHeaders(redirectResponse);
  }

  const intlResponse = intlMiddleware(request);
  return applyMaintenanceHeaders(intlResponse);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
