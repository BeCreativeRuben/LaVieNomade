import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RequestAccessForm } from "@/components/forms/RequestAccessForm";
import { ContentPage } from "@/components/templates/ContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("accessTitle"),
    description: t("accessLead"),
  };
}

export default async function RequestAccessPage() {
  const t = await getTranslations("pages");

  return (
    <ContentPage title={t("accessTitle")} lead={t("accessLead")}>
      <RequestAccessForm />
    </ContentPage>
  );
}
