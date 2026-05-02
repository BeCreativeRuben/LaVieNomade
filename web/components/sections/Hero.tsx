import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export async function Hero() {
  const t = await getTranslations("home");

  return (
    <section
      className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden pb-[clamp(5rem,12vw,11rem)] pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lvn-bg-base via-lvn-bg-surface to-black"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 top-0 h-[55vh] w-[90vw] rounded-full bg-lvn-accent-soft blur-3xl opacity-40"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-[clamp(1.25rem,4vw,3.5rem)]">
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.2em] text-lvn-accent">
          {t("heroKicker")}
        </p>
        <h1
          className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-medium leading-[1.05] tracking-[-0.02em] text-lvn-fg-primary"
        >
          {t("heroLine")}
        </h1>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/request-access"
            className="rounded-sm border border-lvn-accent bg-lvn-accent px-6 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.16em] text-lvn-bg-base transition-colors hover:bg-lvn-fg-primary hover:text-lvn-bg-base"
          >
            {t("ctaSecondary")}
          </Link>
          <Link
            href="/the-field"
            className="rounded-sm border border-lvn-border-subtle px-6 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.16em] text-lvn-fg-primary transition-colors hover:border-lvn-accent hover:text-lvn-accent"
          >
            {t("ctaPrimary")}
          </Link>
        </div>
      </div>
      {/* Placeholder voor hero-video: poster + webm/h264 in CMS-fase */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] opacity-[0.35] sm:top-[32%]"
        aria-hidden
      >
        <div className="mx-auto h-full max-w-7xl border-t border-lvn-border-subtle px-[clamp(1.25rem,4vw,3.5rem)] pt-8">
          <div className="aspect-video w-full bg-gradient-to-t from-transparent via-lvn-bg-surface/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
