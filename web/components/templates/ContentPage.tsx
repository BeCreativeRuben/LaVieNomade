import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/interactions/ScrollReveal";

type Props = {
  title: string;
  lead: string;
  children?: ReactNode;
};

export function ContentPage({ title, lead, children }: Props) {
  return (
    <article className="grow border-t border-lvn-border-subtle bg-lvn-bg-base">
      <div className="mx-auto max-w-7xl px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(4rem,10vw,8rem)]">
        <ScrollReveal>
          <header className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-medium leading-[1.08] tracking-[-0.02em] text-lvn-fg-primary">
              {title}
            </h1>
            <p className="mt-8 text-[length:var(--text-lg)] text-lvn-fg-muted leading-relaxed">{lead}</p>
          </header>
        </ScrollReveal>
        {children ? (
          <ScrollReveal>
            <div className="mt-16 max-w-prose text-[length:var(--text-base)] text-lvn-fg-muted leading-relaxed">
              {children}
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </article>
  );
}
