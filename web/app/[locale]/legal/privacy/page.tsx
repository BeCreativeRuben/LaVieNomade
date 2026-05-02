import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/templates/ContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("privacyTitle"),
    description: t("privacyLead"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("pages");

  return (
    <ContentPage title={t("privacyTitle")} lead={t("privacyLead")}>
      <p>{t("privacyBody")}</p>
    </ContentPage>
  );
}
