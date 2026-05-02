import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <div className="grow border-t border-lvn-border-subtle px-[clamp(1.25rem,4vw,3.5rem)] py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] text-lvn-fg-muted">
          404
        </p>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-lvn-fg-primary">
          {t("title")}
        </h1>
        <p className="mt-4 text-[length:var(--text-base)] text-lvn-fg-muted">{t("body")}</p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-sm border border-lvn-accent px-6 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.16em] text-lvn-accent hover:bg-lvn-accent/10"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
