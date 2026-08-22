import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getIssue, getAllIssueSlugs } from "@/lib/magazine/issues";
import { MagazineReader } from "@/components/magazine/MagazineReader";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getAllIssueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return {};

  const m = await getTranslations({ locale, namespace: "magazine" });
  const issueTitle = m("issue01.title");

  return {
    title: `${issueTitle} · Read`,
    description: m("issue01.subtitle"),
  };
}

export default async function ReaderPage({ params }: Props) {
  const { locale, slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  return (
    <MagazineReader
      slug={issue.slug}
      issueNumber={issue.issueNumber}
      totalPages={issue.totalPages}
      coverImage={issue.coverImage}
      tocEntries={issue.toc}
      closeHref={`/${locale}/magazine`}
      locale={locale}
    />
  );
}
