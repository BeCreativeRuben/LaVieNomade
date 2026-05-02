# ERPA / La Vie Nomade — design tokens

Authoritative styling inputs for Phase A1 UI implementation. **Refine hex values against existing brand collateral** (“ZAS Vegas” / ERPA stationary) — defaults below enforce the briefing: black base, gold accent, cinematic luxury, organic rhythm.

---

## 1. Colour

| Token | Hex / value | Usage |
|-------|----------------|-------|
| `color.bg.base` | `#050505` | Primary page background |
| `color.bg.elevated` | `#0C0C0C` | Cards, overlays, footer |
| `color.bg.surface` | `#141414` | Hover states, inset panels |
| `color.border.subtle` | `rgba(255,255,255,0.08)` | Hairline dividers |
| `color.text.primary` | `#F5F2EB` | Body & headings |
| `color.text.muted` | `rgba(245,242,235,0.62)` | Secondary copy |
| `color.accent.gold` | `#C6A659` | CTAs, key lines, underline emphasis |
| `color.accent.goldSoft` | `rgba(198,166,89,0.35)` | Glows / focus rings |

**Contrast:** maintain WCAG AA for large text (`The Field is You.` hero scale); decorative gold-on-black small labels may intentionally sit below AA if labelled decorative.

---

## 2. Typography

| Role | Suggestion | Weight | Tracking |
|------|------------|--------|----------|
| Display / Hero | `"Cormorant Garamond"` or `"Playfair Display"` (fallback `Georgia`) | 400–500 | `-0.02em` |
| UI / Supporting | `"DM Sans"` or `"Inter"` | 400–600 | `"0"` to `0.02em` on uppercase labels |
| Monospace accents (optional rarity labels) | `"IBM Plex Mono"` | 400 | `0.08em` |

Scale (clamp for fluid rhythm):

```
--text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
--text-sm: clamp(0.875rem, 0.82rem + 0.24vw, 0.9375rem);
--text-base: clamp(1rem, 0.94rem + 0.35vw, 1.0625rem);
--text-lg: clamp(1.125rem, 1rem + 0.55vw, 1.25rem);
--text-xl: clamp(1.375rem, 1.12rem + 1vw, 1.625rem);
--text-display: clamp(2.75rem, 1.75rem + 4.5vw, 5rem);
```

**Principle:** Few words, oversized display lines; paragraphs **max-width ~36rem**, generous line-height `1.6` on editorial body.

---

## 3. Spacing & layout

| Token | Value | Notes |
|-------|-------|-------|
| `space.section-y` | `clamp(5rem, 12vw, 11rem)` | Vertical rhythm image ↔ text ↔ image |
| `space.gutter-x` | `clamp(1.25rem, 4vw, 3.5rem)` | Full-bleed sections still respect horizontal padding |
| `radius.sm` | `2px` | Minimal; luxury = tight corners |
| `radius.none` videos | — | Prefer sharp full-bleed |

Grid: asymmetric editorial — e.g. 5/12 text + 7/12 image on desktop; stack on mobile (`flow-root` clears).

---

## 4. Motion

| Behaviour | Guidance |
|-----------|----------|
| Scroll reveals | Prefer `opacity + translateY(8px)`, **max 420ms**, `ease-out`; respect `prefers-reduced-motion: reduce` → instant settle |
| Hover (links/buttons) | Gold underline draws L→R (`transform: scaleX`) under 240ms |
| Video | Fade-in poster → play; avoid parallax competing with typography |

Ambient audio toggle (optional later): muted by default; icon state persisted in `localStorage`.

---

## 5. CSS custom properties (starter)

```css
:root {
  --lvn-bg-base: #050505;
  --lvn-bg-elevated: #0c0c0c;
  --lvn-fg-primary: #f5f2eb;
  --lvn-fg-muted: rgba(245, 242, 235, 0.62);
  --lvn-accent: #c6a659;
  --lvn-accent-soft: rgba(198, 166, 89, 0.35);
  --lvn-font-display: "Cormorant Garamond", Georgia, serif;
  --lvn-font-sans: "DM Sans", system-ui, sans-serif;
}
```

Tailwind (`tailwind.config`): map `colors.lvn.bg`, `colors.lvn.accent`, `fontFamily.display`, `fontFamily.sans`.

---

## 6. Imagery & video

- **Aspect ratios:** cinematic `2.39:1` or `16:9` hero; portraits `3:4` for Maison “place” intimacy.
- **Treatment:** Minimal overlays; vignette subtler than 20%; keep grain intentional if graded footage provides.
- **Performance:** Mandatory `poster` image; MIME split `webm + h264`; `preload="none"` unless above-the-fold negotiated with Lighthouse budget.
