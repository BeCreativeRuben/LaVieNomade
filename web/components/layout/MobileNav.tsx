"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export type MobileNavLink = {
  href: string;
  label: string;
};

type Props = {
  items: MobileNavLink[];
};

export function MobileNav({ items }: Props) {
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const headingId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded-sm border border-lvn-border-subtle px-3 py-2 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.14em] text-lvn-fg-muted transition-colors hover:border-lvn-accent hover:text-lvn-accent"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? tNav("closeMenu") : tNav("openMenu")}
      </button>

      {open ? (
        <div
          id="mobile-drawer"
          className="fixed inset-0 top-[57px] z-40 bg-lvn-bg-base/98 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          <div className="flex h-full flex-col px-[clamp(1.25rem,4vw,3.5rem)] pb-10 pt-6">
            <h2 id={headingId} className="sr-only">
              {tNav("menu")}
            </h2>
            <nav className="flex flex-col gap-2" aria-label="Mobile primary">
              {items.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="border-b border-lvn-border-subtle py-3 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-lvn-fg-primary transition-colors hover:text-lvn-accent"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/request-access"
                className="mt-6 rounded-sm border border-lvn-accent bg-lvn-accent/10 px-4 py-3 text-center text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.16em] text-lvn-accent"
                onClick={() => setOpen(false)}
              >
                {tNav("requestAccess")}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
