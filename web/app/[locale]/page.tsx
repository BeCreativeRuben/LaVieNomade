import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/interactions/ScrollReveal";
import { ExploreGrid } from "@/components/sections/ExploreGrid";
import { Hero } from "@/components/sections/Hero";
import { VisualLoop } from "@/components/sections/VisualLoop";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <Hero />

      <section className="border-t border-lvn-border-subtle py-[clamp(5rem,12vw,11rem)]">
        <div className="mx-auto max-w-7xl px-[clamp(1.25rem,4vw,3.5rem)]">
          <ScrollReveal>
            <blockquote className="font-[family-name:var(--font-display)] text-[length:clamp(2rem,2vw+1.75rem,3.25rem)] font-medium tracking-[-0.02em] text-lvn-accent">
              {t("fieldIsYou")}
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-lvn-border-subtle bg-lvn-bg-elevated py-[clamp(5rem,12vw,11rem)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-[clamp(1.25rem,4vw,3.5rem)] lg:grid-cols-12 lg:items-start">
          <ScrollReveal>
            <div className="lg:col-span-5">
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-lvn-fg-primary">
                {t("whatFieldTitle")}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <p className="lvn-prose-narrow lg:col-span-7 text-[length:var(--text-lg)] leading-relaxed text-lvn-fg-muted">
              {t("whatFieldBody")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-lvn-border-subtle py-[clamp(5rem,12vw,11rem)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-[clamp(1.25rem,4vw,3.5rem)] lg:grid-cols-12 lg:items-start">
          <ScrollReveal>
            <div className="lg:col-span-5">
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-lvn-accent">
                {t("erpaTitle")}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <p className="lvn-prose-narrow lg:col-span-7 text-[length:var(--text-lg)] leading-relaxed text-lvn-fg-muted">
              {t("erpaBody")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <VisualLoop />
      <ExploreGrid />
    </>
  );
}
