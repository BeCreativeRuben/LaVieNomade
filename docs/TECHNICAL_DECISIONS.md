# ERPA / La Vie Nomade — technical decisions

Formal choices that implement the approved project overview. Aligns with Next.js + TypeScript + Node for the eventual application.

---

## 1. Booking & agenda (`decide-booking`)

### Decision

**Phase A2 (operations): integrate an external scheduler — Cal.com (managed or self-hosted) — exposed only after Request Access.**

- Map **Maison / Field Journeys** (Ether, Water, Dual), **individual sessions**, and **Freqwave Yoga** as separate **Event types** (or Teams) in Cal.com so capacity and buffers stay in one place ops already understands.
- The public site links to booking **only inside the gated zone** (valid access session). Options:
  - **Embed** gated route that renders Cal inline, or
  - **Signed / obfuscated booking URL** generated server-side after access check (avoids leaking bookable links).

### Alternatives considered


| Approach                                     | Pros                                             | Cons                                                                       |
| -------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| **Native slot engine** (Postgres + admin UI) | Full control over group slots, bundles, Room A/B | Highest build & maintenance cost; reinventing calendars                    |
| **Calendly / Acuity**                        | Familiar vendors                                 | Similar to Cal.com; Cal.com aligns well with OSS/self-host if needed later |


### Evolution path

- **A3+**: If group sessions need shared inventory across multiple hosts, overlapping resources, or package pricing tied to SKUs inside one checkout, revisit a **thin custom layer** on Postgres that still syncs outbound to Google Calendar — or deepen Cal.com (round-robin / managed events) first.

---

## 2. Payments (`decide-payments`)

### Decision

**Primary provider: Mollie** (Belgium-first: Bancontact, cards, iDEAL, SEPA). **Stripe** remains an alternative if legal entity or payout setup favours Stripe only, or if non-European cards become the majority.

Payments **only post–Request Access** (same cookie/session tier as booking).

### Day-one SKU catalogue (minimal)


| SKU                | Purpose                                    | Notes                                                           |
| ------------------ | ------------------------------------------ | --------------------------------------------------------------- |
| `session_deposit`  | Hold slot / commitment                     | Partial amount; refundable per policy → document in CMS/legal   |
| `session_full`     | Full Maison / journey payment              | Matches Cal event or manual reconciliation                      |
| `event_ticket`     | Dated Field / club / Stef Bos-style events | Fixed price; optional QR in A3                                  |
| `product_waitlist` | Oils / objects (€0 or symbolic)            | Ffern-style narrative + waitlist; charge only when stock allows |


Checkout flows use **hosted checkout** (Mollie payment link or API-created payment) keyed to `accessProfileId` in metadata for audit.

---

## 3. Headless CMS & content model (`decide-cms`)

### Decision

**Sanity** for all **marketing & editorial content** (text, visuals, layouts, multilingual fields, Magazine metadata, Events listings for “Living Journey”).

**Do not store access codes or payment secrets in Sanity.**  
**Access requests, approvals, and code redemption** live in **Postgres** (e.g. Neon) via Next.js server actions / API routes, with optional internal admin routes or a minimal admin UI.

### Rationale

- Editors get a polished studio, drafts, scheduling, Portable Text for longform (Origin / The Field copy).
- Strong **localized fields** pattern for NL + EN rollout, then ES/FR/etc. without redeploy.

### Sanity content model (v1 skeleton)


| Document                  | Key fields                                                                     |
| ------------------------- | ------------------------------------------------------------------------------ |
| `siteSettings`            | Brand strings, OG defaults, social links, ambient audio toggle default         |
| `page`                    | `slug`, locale, modular **sections** (hero, splitText, visualLoop, ctaBand, …) |
| `originStory`             | Same block pattern or singleton per locale                                     |
| `maisonOffering`          | Journey type slug, teaser, CMS-driven imagery, CTA → Request Access            |
| `eventArticle`            | Date, locale, flipbook/embed ref, excerpt, hero media                          |
| `testimonial`             | Quote, attribution, locale, featured flag                                      |
| `shopProduct`             | Title, imagery, narrative, contact CTA (“mail / formulier”), waitlist flag     |
| `magazineIssue`           | Title, flipbook URL or asset id, languages available                           |
| `fieldApplicationLanding` | B2B bullets, form schema version pointer                                       |


Alternative for teams wanting **CMS + relational DB + admin in one repo**: **Payload 3 + Postgres** can replace Sanity + separate DB setup at the cost of more self-hosted ops complexity.

---

## 4. Phasing & MVP scope (`phase-mvp`)

### Phase A1 — Presence & soul

**Goal:** Immediate impact site; establishes black/gold, video-led rhythm; no booking/pay yet.

Deliverables:

- Routes: Home, Origin, The Field, Maison overview, legal minimum (privacy), NL + EN route prefix or EN as secondary slug strategy.
- Design system wired from `docs/DESIGN_TOKENS.md` into Tailwind/theme.
- CMS wired for Homepage + Maison teasers + Origin content.
- Performance: optimised hero video (poster, lazy, bitrate ladder), Lighthouse budget agreed with client.

Exit criteria: client can swap copy/images in Sanity; Lighthouse “good” on mobile hero route.

### Phase A2 — Access & operational

**Goal:** Monetisable funnel.

Deliverables:

- Request Access: intake form → Postgres row → notify owner → approve → generate **opaque access token** + optional magic link email.
- Gated `/field` area: booking (Cal.com) + Mollie checkout for SKUs above.
- Basic audit log who paid / who booked.

Exit criteria: one full happy-path test user from intake → code → booking → payment in staging.

### Phase A3 — Growth

Deliverables:

- Field Applications B2B form + CRM email handoff.
- Living Journey CMS-driven rail + testimonials.
- Shop-light pages + Magazine embed.
- Expanded locales (batch per language when copy exists).
- Instagram: **preferred** curator-only block from Sanity (better performance/CWV than heavy widget).

Exit criteria: content team publishes event + flipbook issue without developer.

Optional **Phase C flavour** (“Ffern-first”): if timelines slip, defer Cal+Mollie to A2 sprint 2 — ship **A1 + wachtlijst + oliën storytelling** using `product_waitlist` and mail-only flows first.

---

## 5. Cross-cutting

- **i18n:** `next-intl` or `@formatjs` with `[locale]` segment; fallback NL.
- **SEO:** `generateMetadata`, `sitemap.xml`, sane hierarchy; no growth-hack SEO.
- **Hosting:** Next on Vercel (or equiv), Sanity hosted, Postgres on Neon — media via Sanity CDN / Vercel Blob for oversized video once approved workflows exist.