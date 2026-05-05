import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/templates/ContentPage";
import { Link } from "@/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("maisonTitle"),
    description: t("maisonLead"),
  };
}

export default async function MaisonPage() {
  const t = await getTranslations("pages");
  const m = await getTranslations("maison");

  return (
    <ContentPage title={t("maisonTitle")} lead={t("maisonLead")}>
      <p>{m("entryRule")}</p>
      <ul className="mt-6 list-disc space-y-2 pl-6">
        <li>{m("journeys")}</li>
        <li>{m("privateSessions")}</li>
        <li>{m("freqwave")}</li>
      </ul>
      <Link
        href="/request-access"
        className="mt-8 inline-block rounded-sm border border-lvn-accent bg-lvn-accent/10 px-5 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20"
      >
        {m("cta")}
      </Link>
    </ContentPage>
  );
}
