# ERPA — La Vie Nomade (web programme)

Structured implementation brief and decisions for the experience-led portal (“digitale drempel naar een ervaring”).

## Contents


| Document                                                   | Purpose                                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [docs/TECHNICAL_DECISIONS.md](docs/TECHNICAL_DECISIONS.md) | Booking (Cal.com), payments (Mollie-first), Sanity CMS vs app DB split, phased MVP |
| [docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md)             | Black/gold system, typography, motion, Tailwind/CSS variable seeds                 |


## Application (Phase A1 scaffold)

The Next.js site lives in **[`web/`](web/)** (`nl` / `en` via `next-intl`, design tokens in `web/app/globals.css`).

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:3000` — you are redirected to **`/nl`** (default locale).

- **Sanity / booking / Mollie**: not wired yet (see `docs/TECHNICAL_DECISIONS.md`).