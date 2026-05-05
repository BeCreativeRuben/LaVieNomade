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

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const locale = routing.locales.includes(firstSegment as "nl" | "en")
    ? firstSegment
    : routing.defaultLocale;

  const allowedPathnames = new Set(["/", `/${locale}`]);
  if (!allowedPathnames.has(pathname)) {
    const redirectResponse = NextResponse.redirect(
      new URL(`/${locale}`, request.url),
    );
    return applyMaintenanceHeaders(redirectResponse);
  }

  const intlResponse = intlMiddleware(request);
  return applyMaintenanceHeaders(intlResponse);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
