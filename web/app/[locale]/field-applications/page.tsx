import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

type Props = { params: Promise<{ locale: string }> };

const markets = ["art", "sport", "hospitality", "wellbeing"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return {
    title: t("applicationsTitle"),
    description: t("applicationsLead"),
  };
}

export default async function FieldApplicationsPage() {
  const t = await getTranslations("pages");
  const m = await getTranslations("markets");

  return (
    <article className="grow border-t border-lvn-border-subtle bg-lvn-bg-base">
      <div className="mx-auto max-w-7xl px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(4rem,10vw,8rem)]">
        <header className="max-w-3xl">
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-medium leading-[1.08] tracking-[-0.02em] text-lvn-fg-primary">
            {t("applicationsTitle")}
          </h1>
          <p className="mt-8 text-[length:var(--text-lg)] leading-relaxed text-lvn-fg-muted">
            {t("applicationsLead")}
          </p>
        </header>

        <nav className="mt-12 flex flex-wrap gap-2" aria-label={m("marketsAnchorNavLabel")}>
          {markets.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="rounded-sm border border-lvn-border-subtle px-4 py-2 text-[length:var(--text-xs)] uppercase tracking-[0.12em] text-lvn-fg-muted transition-colors hover:border-lvn-accent hover:text-lvn-accent"
            >
              {m(`${key}.label`)}
            </a>
          ))}
        </nav>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {markets.map((key) => (
            <section
              key={key}
              id={key}
              className="scroll-mt-28 border border-lvn-border-subtle bg-lvn-bg-elevated p-6"
            >
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-lvn-fg-primary">
                {m(`${key}.label`)}
              </h2>
              <p className="mt-3 text-[length:var(--text-base)] leading-relaxed text-lvn-fg-muted">
                {m(`${key}.body`)}
              </p>
              <Link href="/request-access" className="mt-6 inline-block lvn-link text-[length:var(--text-xs)] uppercase tracking-[0.12em] text-lvn-accent">
                {m("cta")}
              </Link>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
