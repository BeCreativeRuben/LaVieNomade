export default function HomePage() {
  return (
    <section className="flex min-h-[70vh] items-center border-t border-lvn-border-subtle">
      <div className="mx-auto max-w-4xl px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(4rem,10vw,8rem)] text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-medium tracking-[-0.02em] text-lvn-accent">
          Tuning In to High Frequencies
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-[length:var(--text-lg)] leading-relaxed text-lvn-fg-muted">
          Onze website is in onderhoud en zal binnenkort opengaan voor het publiek.
          Hou onze socials in de gaten om op de hoogte te blijven!
        </p>
        <a
          href="https://www.instagram.com/erpa.lavienomade/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-sm border border-lvn-accent bg-lvn-accent/10 px-6 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20"
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
