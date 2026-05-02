import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/templates/ContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("livingTitle"),
    description: t("livingLead"),
  };
}

export default async function LivingJourneyPage() {
  const t = await getTranslations("pages");
  const c = await getTranslations("common");

  return (
    <ContentPage title={t("livingTitle")} lead={t("livingLead")}>
      <p>{c("comingSoonNote")}</p>
    </ContentPage>
  );
}
