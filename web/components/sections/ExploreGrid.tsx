import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

const tilePaths = ["/origin", "/maison", "/field-applications", "/art-movement"] as const;

export async function ExploreGrid() {
  const th = await getTranslations("home");
  const nav = await getTranslations("nav");
  const labels = [
    nav("origin"),
    nav("maison"),
    nav("applications"),
    nav("artMovement"),
  ] as const;

  return (
    <section className="border-t border-lvn-border-subtle bg-lvn-bg-elevated py-[clamp(5rem,12vw,11rem)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-[clamp(1.25rem,4vw,3.5rem)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-lvn-fg-primary">
            {th("exploreTitle")}
          </p>
          <p className="mt-4 text-[length:var(--text-sm)] text-lvn-fg-muted">{th("exploreSubtitle")}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {tilePaths.map((href, i) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full min-h-[8.5rem] flex-col justify-between border border-lvn-border-subtle bg-lvn-bg-base p-6 transition-colors hover:border-lvn-accent/40 hover:bg-lvn-bg-surface"
              >
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-lvn-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-lvn-fg-primary transition-colors group-hover:text-lvn-accent">
                  {labels[i]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
