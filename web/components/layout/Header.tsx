import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function Header() {
  await getTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-lvn-border-subtle bg-lvn-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-[clamp(1.25rem,4vw,3.5rem)] py-4">
        <Link
          href="/"
          className="truncate font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-lvn-fg-primary transition-colors hover:text-lvn-accent"
        >
          La Vie Nomade
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/"
            className="shrink-0 rounded-sm border border-lvn-accent bg-lvn-accent/10 px-3 py-2 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20 sm:px-4"
          >
            Tuning...
          </Link>
        </div>
      </div>
    </header>
  );
}
