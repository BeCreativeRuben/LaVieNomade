"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IssueCard {
  slug: string;
  issueNumber: string;
  totalPages: number;
  coverImage: string;
  readHref: string;
}

interface Props {
  title: string;
  lead: string;
  freeIssueLine: string;
  openCta: string;
  subscribeLine: string;
  subscribeButton: string;
  issues: IssueCard[];
  locale: string;
}

export function MagazineListing({
  title,
  lead,
  freeIssueLine,
  openCta,
  subscribeLine,
  subscribeButton,
  issues,
  locale,
}: Props) {
  const m = useTranslations("magazine");
  const [email, setEmail] = useState("");

  return (
    <article className="grow border-t border-lvn-border-subtle bg-lvn-bg-base">
      <div className="mx-auto max-w-7xl px-[var(--gutter-x)] py-[var(--section-y)]">
        <header className="max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] text-lvn-fg-muted">
            · {String(issues.length).padStart(2, "0")}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-medium leading-[1.08] tracking-[-0.02em] text-lvn-fg-primary">
            {title}
          </h1>
          <p className="mt-6 text-[length:var(--text-lg)] leading-relaxed text-lvn-fg-muted">
            {lead}
          </p>
          <p className="mt-3 text-[length:var(--text-base)] text-lvn-fg-muted">
            {freeIssueLine}
          </p>
        </header>

        <div className="mt-16 grid gap-12">
          {issues.map((issue) => (
            <IssueRow
              key={issue.slug}
              issue={issue}
              openCta={openCta}
              locale={locale}
              m={m}
            />
          ))}
        </div>

        <div className="mt-20 max-w-md border-t border-lvn-border-subtle pt-10">
          <p className="text-[length:var(--text-base)] text-lvn-fg-muted">
            {subscribeLine}
          </p>
          <form
            className="mt-4 flex gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "nl" ? "Je e-mailadres" : "Your email"}
              className="min-w-0 grow rounded-sm border border-lvn-border-subtle bg-transparent px-3 py-2 text-[length:var(--text-sm)] text-lvn-fg-primary placeholder:text-lvn-fg-muted/50 focus:border-lvn-accent focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-sm border border-lvn-accent bg-lvn-accent/10 px-4 py-2 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20"
            >
              {subscribeButton}
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

function IssueRow({
  issue,
  openCta,
  locale,
  m,
}: {
  issue: IssueCard;
  openCta: string;
  locale: string;
  m: ReturnType<typeof useTranslations<"magazine">>;
}) {
  const issueTitle = m(`issue01.title`);
  const issueSeason = m(`issue01.season`);
  const issueDescription = m(`issue01.description`);

  return (
    <div className="group relative grid gap-6 sm:grid-cols-[minmax(200px,320px)_1fr] sm:gap-10">
      <Link
        href={issue.readHref}
        className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-lvn-bg-surface"
      >
        <Image
          src={issue.coverImage}
          alt={issueTitle}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p
            className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            style={{ color: "var(--lvn-accent)" }}
          >
            {issueSeason} · N° {issue.issueNumber}
          </p>
        </div>
      </Link>

      <div className="flex flex-col justify-center">
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] text-lvn-fg-muted">
          · Nº {issue.issueNumber} · {issue.totalPages}{" "}
          {locale === "nl" ? "pagina's" : "pages"}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-medium text-lvn-fg-primary">
          {issueTitle}
        </h2>
        <p className="mt-1 text-[length:var(--text-sm)] text-lvn-fg-muted">
          {issueSeason}
        </p>
        <p className="mt-4 max-w-prose text-[length:var(--text-base)] leading-relaxed text-lvn-fg-muted">
          {issueDescription}
        </p>
        <Link
          href={issue.readHref}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm border border-lvn-accent bg-lvn-accent/10 px-5 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20"
        >
          <span>→</span> {openCta}
        </Link>
      </div>
    </div>
  );
}
