"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { nl: "NL", en: "EN" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const other = routing.locales.find((l) => l !== locale) ?? "en";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      className="rounded-sm border border-lvn-border-subtle px-2 py-1 text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:border-lvn-accent hover:text-lvn-accent"
      aria-label={`Switch language to ${labels[other]}`}
    >
      {labels[other]}
    </button>
  );
}
