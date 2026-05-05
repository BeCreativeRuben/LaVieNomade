import Image from "next/image";

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100svh-73px)] items-center border-t border-lvn-border-subtle">
      <div className="mx-auto max-w-4xl px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(1.5rem,4vh,3rem)] text-center">
        <Image
          src="/logo-gold-black.png"
          alt="La Vie Nomade logo"
          width={1024}
          height={396}
          priority
          className="mx-auto mb-5 h-auto w-full max-w-[460px]"
        />
        <h1 className="font-[family-name:var(--font-display)] text-[length:clamp(2rem,4.2vw,4rem)] font-medium tracking-[-0.02em] text-lvn-accent">
          Tuning in to Higher Frequencies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[length:clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-lvn-fg-muted">
          Our website is currently under maintenance and will open to the public
          soon. Follow our socials to stay updated.
        </p>
        <a
          href="https://www.instagram.com/erpa.lavienomade/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-sm border border-lvn-accent bg-lvn-accent/10 px-6 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-lvn-accent transition-colors hover:bg-lvn-accent/20"
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
