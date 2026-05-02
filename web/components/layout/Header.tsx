import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { MobileNavLink } from "./MobileNav";
import { MobileNav } from "./MobileNav";

const navKeys = [
  ["origin", "/origin"],
  ["theField", "/the-field"],
  ["maison", "/maison"],
  ["applications", "/field-applications"],
  ["artMovement", "/art-movement"],
  ["living", "/living-journey"],
  ["community", "/community"],
  ["shop", "/shop"],
  ["magazine", "/magazine"],
] as const;

export async function Header() {
  const t = await getTranslations("nav");

  const mobileItems: MobileNavLink[] = navKeys.map(([key, href]) => ({
    href,
    label: t(key),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-lvn-border-subtle bg-lvn-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-[clamp(1.25rem,4vw,3.5rem)] py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none md:flex-initial">
          <MobileNav items={mobileItems} />
          <Link
            href="/"
            className="truncate font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-lvn-fg-primary transition-colors hover:text-lvn-accent"
          >
            La Vie Nomade
          </Link>
        </div>
        <nav
          className="order-3 hidden max-w-none flex-none flex-nowrap justify-end gap-x-5 gap-y-2 overflow-x-auto whitespace-nowrap text-[length:var(--text-xs)] uppercase tracking-[0.12em] text-lvn-fg-muted md:order-none md:flex md:max-w-[54%] md:flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:max-w-none"
          aria-label="Main"
        >
          {navKeys.map(([key, href]) => (
            <Link key={href} href={href} className="lvn-link">
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/request-access"
            className="shrink-0 rounded-sm border border-lvn-accent bg-lvn-accent/10 px-3 py-2 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20 sm:px-4"
          >
            {t("requestAccess")}
          </Link>
        </div>
      </div>
    </header>
  );
}
