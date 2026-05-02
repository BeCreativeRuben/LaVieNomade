import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const routePaths = [
  "",
  "/origin",
  "/the-field",
  "/maison",
  "/request-access",
  "/field-applications",
  "/art-movement",
  "/living-journey",
  "/community",
  "/shop",
  "/magazine",
  "/legal/privacy",
] as const;

function baseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return (vercel.startsWith("http") ? vercel : `https://${vercel}`).replace(
      /\/$/,
      "",
    );
  }

  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of routePaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl()}/${locale}${path}`,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
