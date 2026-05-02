import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const legal = await getTranslations("pages");

  return (
    <footer className="border-t border-lvn-border-subtle bg-lvn-bg-elevated">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-[clamp(1.25rem,4vw,3.5rem)] py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[length:var(--text-sm)] text-lvn-fg-muted">{t("rights")}</p>
        <Link href="/legal/privacy" className="lvn-link text-[length:var(--text-sm)] text-lvn-fg-muted">
          {legal("privacyTitle")}
        </Link>
      </div>
    </footer>
  );
}
