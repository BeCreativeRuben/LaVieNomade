import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/templates/ContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("magazineTitle"),
    description: t("magazineLead"),
  };
}

export default async function MagazinePage() {
  const t = await getTranslations("pages");
  const c = await getTranslations("common");

  return (
    <ContentPage title={t("magazineTitle")} lead={t("magazineLead")}>
      <p>{c("comingSoonNote")}</p>
    </ContentPage>
  );
}
