import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/templates/ContentPage";

type Props = { params: Promise<{ locale: string }> };

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
  const c = await getTranslations("common");

  return (
    <ContentPage title={t("applicationsTitle")} lead={t("applicationsLead")}>
      <p>{c("comingSoonNote")}</p>
    </ContentPage>
  );
}
