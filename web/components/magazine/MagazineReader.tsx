"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface TocEntry {
  number: string;
  translationKey: string;
  page: number;
}

interface Props {
  slug: string;
  issueNumber: string;
  totalPages: number;
  coverImage: string;
  tocEntries: TocEntry[];
  closeHref: string;
  locale: string;
}

const STORAGE_KEY_PREFIX = "lvn-reader-page-";

function useStoredPage(key: string, maxPage: number): number | null {
  return useSyncExternalStore(
    (onChange) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) onChange();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    () => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const p = parseInt(raw, 10);
        return p > 1 && p <= maxPage ? p : null;
      } catch {
        return null;
      }
    },
    () => null,
  );
}

export function MagazineReader({
  slug,
  issueNumber,
  totalPages,
  coverImage,
  tocEntries,
  closeHref,
  locale,
}: Props) {
  const t = useTranslations("magazine.reader");
  const issue = useTranslations("magazine.issue01");

  const storageKey = `${STORAGE_KEY_PREFIX}${slug}`;
  const savedPage = useStoredPage(storageKey, totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [showContents, setShowContents] = useState(false);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const showResume =
    savedPage !== null && savedPage !== currentPage && !resumeDismissed;

  useEffect(() => {
    if (currentPage > 1) {
      try {
        localStorage.setItem(storageKey, String(currentPage));
      } catch {
        /* localStorage unavailable */
      }
    }
  }, [currentPage, storageKey]);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || isTransitioning) return;
      setIsTransitioning(true);
      setCurrentPage(page);
      setShowContents(false);
      setTimeout(() => setIsTransitioning(false), 200);
    },
    [totalPages, isTransitioning],
  );

  const handleResume = useCallback(() => {
    if (savedPage) goToPage(savedPage);
    setResumeDismissed(true);
  }, [savedPage, goToPage]);

  const handleDismissResume = useCallback(() => {
    setResumeDismissed(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToPage(currentPage + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPage(currentPage - 1);
      } else if (e.key === "Escape") {
        if (showContents) setShowContents(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, goToPage, showContents]);

  const issueLabel = t("issueLabel");
  const issueTitle = issue("title");

  const tocItems = useMemo(
    () =>
      tocEntries.map((entry) => ({
        ...entry,
        title: issue(entry.translationKey),
      })),
    [tocEntries, issue],
  );

  return (
    <div className="reader-root fixed inset-0 z-[100] flex flex-col bg-black text-lvn-fg-primary">
      {/* Header */}
      <header className="reader-header relative z-30 flex shrink-0 items-center justify-between border-b border-white/10 bg-black/95 px-3 py-2 backdrop-blur-md sm:px-5 sm:py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={closeHref}
            className="hidden text-[length:var(--text-xs)] text-lvn-fg-muted transition-colors hover:text-lvn-accent sm:inline"
          >
            ERPA — La Vie Nomade
          </Link>
          <span className="hidden text-lvn-fg-muted/30 sm:inline">·</span>
          <span className="truncate font-[family-name:var(--font-display)] text-[length:var(--text-sm)] text-lvn-fg-primary sm:text-[length:var(--text-base)]">
            {issueTitle}
          </span>
          <span className="text-lvn-fg-muted/50">·</span>
          <span className="shrink-0 text-[length:var(--text-xs)] text-lvn-fg-muted">
            Nº {issueNumber}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setShowContents(!showContents)}
            className="rounded-sm px-2 py-1 text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:text-lvn-accent"
          >
            {t("contents")}
          </button>
          <span className="text-[length:var(--text-xs)] tabular-nums text-lvn-fg-muted">
            {currentPage}/{totalPages}
          </span>
          <Link
            href={closeHref}
            className="rounded-sm px-2 py-1 text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:text-lvn-accent"
          >
            {t("close")}
          </Link>
        </div>
      </header>

      {/* Viewport */}
      <div
        ref={viewportRef}
        className="reader-viewport relative flex grow items-center justify-center overflow-hidden"
      >
        {/* Page content */}
        <div
          className={`reader-page-container flex h-full w-full items-center justify-center transition-opacity duration-200 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentPage === 1 ? (
            <CoverPage
              issueTitle={issueTitle}
              issueNumber={issueNumber}
              subtitle={issue("subtitle")}
              season={issue("season")}
              coverImage={coverImage}
            />
          ) : currentPage <= 3 ? (
            <ContentsPage
              issueTitle={issueTitle}
              issueNumber={issueNumber}
              issueLabel={issueLabel}
              season={issue("season")}
              pageNum={currentPage}
              tocItems={tocItems}
              label={t("inThisIssue")}
              onGoToPage={goToPage}
            />
          ) : currentPage === 4 ? (
            <ForewordPage
              title={issue("forewordTitle")}
              quote={issue("forewordQuote")}
              body={issue("forewordBody")}
              issueTitle={issueTitle}
              season={issue("season")}
              pageNum={currentPage}
            />
          ) : (
            <ContentPlaceholder
              pageNum={currentPage}
              totalPages={totalPages}
              issueTitle={issueTitle}
              season={issue("season")}
              locale={locale}
            />
          )}
        </div>

        {/* Navigation arrows */}
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            className="reader-nav-arrow reader-nav-prev absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white sm:left-4 sm:p-3"
            aria-label={t("previous")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            className="reader-nav-arrow reader-nav-next absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white sm:right-4 sm:p-3"
            aria-label={t("next")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div className="reader-bottom-bar relative z-30 flex shrink-0 items-center justify-between border-t border-white/10 bg-black/95 px-3 py-2 backdrop-blur-md sm:px-5">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:text-lvn-accent disabled:opacity-30 disabled:hover:text-lvn-fg-muted"
        >
          ← {t("previous")}
        </button>
        <span className="text-[length:var(--text-xs)] tabular-nums text-lvn-fg-muted">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:text-lvn-accent disabled:opacity-30 disabled:hover:text-lvn-fg-muted"
        >
          {t("next")} →
        </button>
      </div>

      {/* Contents overlay */}
      {showContents && (
        <div className="fixed inset-0 z-40 flex">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowContents(false)}
            aria-label={t("close")}
          />
          <div className="relative ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-lvn-bg-elevated/98 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-lvn-border-subtle px-6 py-5">
              <div>
                <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-lvn-fg-primary">
                  {t("inThisIssue")}
                </p>
                <p className="mt-1 text-[length:var(--text-xs)] text-lvn-fg-muted">
                  {issueTitle} · Nº {issueNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowContents(false)}
                className="rounded-sm px-3 py-1 text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:text-lvn-accent"
              >
                {t("close")}
              </button>
            </div>
            <nav className="grow px-6 py-6" aria-label={t("contents")}>
              <ol className="flex flex-col gap-1">
                {tocItems.map((item) => (
                  <li key={item.number}>
                    <button
                      type="button"
                      onClick={() => goToPage(item.page)}
                      className="flex w-full items-baseline gap-3 rounded-sm px-2 py-3 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="w-6 shrink-0 text-right font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-lvn-fg-muted">
                        {item.number}
                      </span>
                      <span className="grow text-[length:var(--text-sm)] text-lvn-fg-primary">
                        {item.title}
                      </span>
                      <span className="shrink-0 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tabular-nums text-lvn-fg-muted">
                        {String(item.page).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}

      {/* Resume toast */}
      {showResume && savedPage && (
        <div className="fixed inset-x-0 bottom-16 z-50 flex justify-center px-4 sm:bottom-20">
          <div className="flex items-center gap-4 rounded-sm border border-lvn-border-subtle bg-lvn-bg-elevated/95 px-5 py-3 shadow-2xl backdrop-blur-md">
            <p className="text-[length:var(--text-sm)] text-lvn-fg-muted">
              {t("resumeMessage", { page: savedPage })}
            </p>
            <button
              type="button"
              onClick={handleResume}
              className="shrink-0 rounded-sm border border-lvn-accent bg-lvn-accent/10 px-3 py-1 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20"
            >
              {t("resumeAction")}
            </button>
            <button
              type="button"
              onClick={handleDismissResume}
              className="shrink-0 text-[length:var(--text-xs)] text-lvn-fg-muted transition-colors hover:text-lvn-fg-primary"
            >
              {t("dismissAction")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Page components ---------- */

function CoverPage({
  issueTitle,
  issueNumber,
  subtitle,
  season,
  coverImage,
}: {
  issueTitle: string;
  issueNumber: string;
  subtitle: string;
  season: string;
  coverImage: string;
}) {
  return (
    <div className="reader-page relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-full w-full max-w-[min(100%,calc((100vh-6rem)*0.75))] flex-col items-center justify-end overflow-hidden bg-lvn-bg-surface">
        <Image
          src={coverImage}
          alt={issueTitle}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-[center_25%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-10 text-center sm:px-10 sm:pb-14">
          <p
            className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            style={{ color: "var(--lvn-accent)" }}
          >
            {season} · N° {issueNumber}
          </p>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Nº {issueNumber} · La Vie Nomade & ERPA
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[length:clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {issueTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[length:var(--text-sm)] leading-relaxed text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function ContentsPage({
  issueTitle,
  issueNumber,
  issueLabel,
  season,
  pageNum,
  tocItems,
  label,
  onGoToPage,
}: {
  issueTitle: string;
  issueNumber: string;
  issueLabel: string;
  season: string;
  pageNum: number;
  tocItems: Array<{ number: string; title: string; page: number }>;
  label: string;
  onGoToPage: (page: number) => void;
}) {
  const halfIndex = Math.ceil(tocItems.length / 2);
  const itemsForPage =
    pageNum === 2
      ? tocItems.slice(0, halfIndex)
      : tocItems.slice(halfIndex);
  const pageLabel =
    pageNum === 2 ? `${label} 1/2` : `${label} 2/2`;

  return (
    <div className="reader-page relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-full w-full max-w-[min(100%,calc((100vh-6rem)*0.75))] flex-col bg-lvn-bg-surface">
        {/* Page header */}
        <div className="flex items-baseline justify-between border-b border-white/8 px-6 py-4 sm:px-8">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] text-lvn-fg-primary">
              {issueTitle}
            </span>
            <span className="text-[length:var(--text-xs)] text-lvn-fg-muted">
              {issueLabel} {issueNumber}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[length:var(--text-xs)] text-lvn-fg-muted">
              {pageLabel}
            </span>
            <span className="text-[length:var(--text-xs)] text-lvn-fg-muted/50">
              {season}
            </span>
          </div>
        </div>

        {/* Contents list */}
        <div className="flex grow flex-col justify-center px-6 py-8 sm:px-10">
          <h3 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-medium text-lvn-fg-primary">
            {label}
          </h3>
          <ol className="flex flex-col gap-0">
            {itemsForPage.map((item) => (
              <li key={item.number}>
                <button
                  type="button"
                  onClick={() => onGoToPage(item.page)}
                  className="flex w-full items-baseline gap-4 border-b border-white/5 py-3 text-left transition-colors hover:bg-white/3"
                >
                  <span className="w-5 shrink-0 text-right font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-lvn-accent">
                    {item.number}
                  </span>
                  <span className="grow text-[length:var(--text-sm)] text-lvn-fg-primary sm:text-[length:var(--text-base)]">
                    {item.title}
                  </span>
                  <span className="shrink-0 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tabular-nums text-lvn-fg-muted">
                    {String(item.page).padStart(2, "0")}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function ForewordPage({
  title,
  quote,
  body,
  issueTitle,
  season,
  pageNum,
}: {
  title: string;
  quote: string;
  body: string;
  issueTitle: string;
  season: string;
  pageNum: number;
}) {
  const paragraphs = body.split("\n\n");

  return (
    <div className="reader-page relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-full w-full max-w-[min(100%,calc((100vh-6rem)*0.75))] flex-col overflow-y-auto bg-lvn-bg-surface">
        {/* Page header */}
        <div className="flex items-baseline justify-between border-b border-white/8 px-6 py-4 sm:px-8">
          <span className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] text-lvn-fg-primary">
            {issueTitle}
          </span>
          <span className="text-[length:var(--text-xs)] text-lvn-fg-muted/50">
            {season} · N° {String(pageNum).padStart(2, "0")}
          </span>
        </div>

        <div className="flex grow flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
          <blockquote className="mb-8 border-l-2 border-lvn-accent pl-5">
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] italic leading-relaxed text-lvn-fg-primary">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>

          <h3 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-medium text-lvn-fg-primary">
            {title}
          </h3>

          <div className="max-w-prose space-y-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[length:var(--text-base)] leading-relaxed text-lvn-fg-muted"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentPlaceholder({
  pageNum,
  totalPages,
  issueTitle,
  season,
  locale,
}: {
  pageNum: number;
  totalPages: number;
  issueTitle: string;
  season: string;
  locale: string;
}) {
  return (
    <div className="reader-page relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-full w-full max-w-[min(100%,calc((100vh-6rem)*0.75))] flex-col bg-lvn-bg-surface">
        {/* Page header */}
        <div className="flex items-baseline justify-between border-b border-white/8 px-6 py-4 sm:px-8">
          <span className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] text-lvn-fg-primary">
            {issueTitle}
          </span>
          <span className="text-[length:var(--text-xs)] text-lvn-fg-muted/50">
            {season} · N° {String(pageNum).padStart(2, "0")}
          </span>
        </div>

        <div className="flex grow flex-col items-center justify-center px-6 py-8 text-center">
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] text-lvn-fg-muted/40">
            {pageNum} / {totalPages}
          </p>
          <p className="mt-4 max-w-xs text-[length:var(--text-sm)] text-lvn-fg-muted/50">
            {locale === "nl"
              ? "Pagina-inhoud wordt geladen vanuit het CMS."
              : "Page content is loaded from the CMS."}
          </p>
        </div>
      </div>
    </div>
  );
}
