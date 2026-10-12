import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { issues } from "@/lib/magazine/issues";
import { MagazineListing } from "@/components/magazine/MagazineListing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("magazineTitle"),
    description: t("magazineLead"),
  };
}

export default async function MagazinePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("pages");
  const m = await getTranslations("magazine");

  const issueCards = issues.map((issue) => ({
    slug: issue.slug,
    issueNumber: issue.issueNumber,
    totalPages: issue.totalPages,
    coverImage: issue.coverImage,
    readHref: `/${locale}/magazine/${issue.slug}/read`,
  }));

  return (
    <MagazineListing
      title={t("magazineTitle")}
      lead={m("heroSubtitle")}
      freeIssueLine={m("freeIssueLine")}
      openCta={m("openCta")}
      subscribeLine={m("subscribeLine")}
      subscribeButton={m("subscribeButton")}
      issues={issueCards}
      locale={locale}
    />
  );
}
