import { getTranslations } from "next-intl/server";

const PLACEHOLDER_STRIP_COUNT = 4;

export async function VisualLoop() {
  const t = await getTranslations("home");

  return (
    <section
      aria-label={t("visualLoopAria")}
      className="border-t border-lvn-border-subtle py-[clamp(4rem,10vw,9rem)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-[clamp(1.25rem,4vw,3.5rem)]">
        <div className="flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]" role="list">
          {Array.from({ length: PLACEHOLDER_STRIP_COUNT }).map((_, i) => (
            <figure
              key={i}
              role="listitem"
              className="relative h-48 min-w-[70vw] shrink-0 overflow-hidden border border-lvn-border-subtle bg-lvn-bg-elevated sm:min-w-[40vw] lg:min-w-[28vw]"
            >
              <figcaption className="sr-only">
                {t("visualLoopAria")} {i + 1}
              </figcaption>
              <div
                className="absolute inset-0 bg-gradient-to-br from-lvn-bg-surface via-transparent to-lvn-accent-soft/20"
                aria-hidden
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
