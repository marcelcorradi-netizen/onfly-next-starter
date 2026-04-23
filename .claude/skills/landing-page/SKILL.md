---
name: landing-page
description: Build high-quality landing pages and marketing pages for the Onfly design system — hero sections, feature grids, CTAs, testimonials, pricing, and full page layouts. Use this skill whenever the user wants to create a landing page, marketing page, promotional section, campaign page, splash page, or any page whose primary job is persuasion rather than app interaction. Also use for full-page compositions that need creative freedom beyond what app UI components allow. Prioritizes expressive layouts and visual impact using Onfly DS tokens — no shadcn dependency.
---

This skill guides building polished, expressive landing pages that feel distinctly Onfly — not generic templates. The goal is persuasive, visually memorable pages that use the design system as a creative tool, not a cage.

## Stack

**Next.js 15 · React 19 · TypeScript · Tailwind CSS v4**

Produce `.tsx` files following Next.js App Router conventions (`src/app/`). Page files go in `src/app/<route>/page.tsx`; reusable section components in `src/components/landing/`. Add `"use client"` only where genuinely needed (scroll listeners, carousels, form state).

## No shadcn dependency

Landing pages are hand-crafted. Don't reach for shadcn components — they're designed for app UI consistency, not marketing expressiveness. Build everything from semantic HTML + Tailwind + the Onfly token system. The one exception: if the page needs a functional form, `input` and `button` from shadcn/ui are fine.

## Design System Tokens — The Only Source of Truth

Never hardcode colors, spacing, radii, or fonts. Everything comes from the Onfly token system.

### Colors

**Tailwind semantic classes (preferred for simple cases):**
- `bg-background` `bg-primary` `bg-secondary` `bg-muted` `bg-accent`
- `text-foreground` `text-muted-foreground` `text-primary-foreground`
- `border-border`

**CSS variables for full control:**
```
Backgrounds:
  --background-primary          white
  --background-secondary        gray-50
  --background-tertiary         gray-100
  --background-primary-inverse  gray-950 (dark sections)
  --background-brand-subtle-1   brand-50
  --background-brand-subtle-2   brand-100
  --background-brand-solid      brand-500 (primary CTA bg)
  --background-brand-solid-hovered  brand-600

Content (text):
  --content-primary             gray-950
  --content-secondary           gray-700
  --content-tertiary            gray-500
  --content-primary-inverse     white (on dark bg)
  --content-secondary-inverse   gray-50
  --content-brand-primary       brand-950
  --content-brand-secondary     brand-700
  --content-brand-accent        brand-500
  --content-on-brand            white (text on brand-500 bg)
  --content-white               white

Borders:
  --border-primary              gray-300
  --border-secondary            gray-200
  --border-brand-primary        brand-500
  --border-brand-subtle-2       brand-100
```

### Typography

Use the composite text style classes — they apply font-size, weight, line-height, and letter-spacing in one shot:

```
Display: .text-display-large (48px) · .text-display-medium (44px) · .text-display-small (40px)
Headings: .text-heading-h1 (38px) · h2 (32px) · h3 (28px) · h4 (24px) · h5 (20px) · h6 (18px)
Body: .text-body-medium-regular · .text-body-medium-medium · .text-body-medium-semi-bold (16px)
      .text-body-small-regular · .text-body-small-medium · .text-body-small-semi-bold (14px)
Labels: .text-label-large-* · .text-label-medium-* · .text-label-small-* (semi-bold/medium/regular)
Caption: .text-caption-small (10px)
```

For hero headlines, prefer display tokens. Don't introduce custom font families — the brand font is already set on `body`.

### Spacing & Radius

```
Spacing scale: --scale-4 (4px) · --scale-8 · --scale-12 · --scale-16 · --scale-24 · --scale-32 · --scale-40 · --scale-48 · --scale-56 · --scale-64 · --scale-80 · --scale-96 · --scale-120

Context tokens:
  --spacing-context-screen-horizontal-padding: 32px  (outer page gutters)
  --spacing-context-section-vertical-padding: 40px   (vertical rhythm between sections)

Border radius:
  --border-radius-xs: 4px · --border-radius-sm: 8px · --border-radius-md: 12px
  --border-radius-lg: 16px · --border-radius-xl: 24px · --border-radius-full: 9999px

Shadows:
  --shadow-sm · --shadow-md · --shadow-lg · --shadow-xl · --shadow-2xl
  --shadow-card  (for cards/tiles)
```

### Never do this

Don't redefine the shadcn semantic variables (`--primary`, `--background`, `--foreground`, etc.) in any local scope — it silently breaks components that share the same DOM scope.

---

## Landing Page Anatomy

Landing pages are built from sections. Each section has a single persuasive job. Design each section with that job in mind and make it do exactly that — nothing more, nothing less.

### Common section patterns

**Hero** — the page's opening argument. Leads with the biggest claim. CTA must be visible immediately. Typical composition: eyebrow label → headline (display size) → sub-headline → CTA(s) → social proof or visual. Variations: centered, left-text/right-visual, full-bleed image with overlay.

**Feature grid** — communicates "here's what you get". Cards or icon+text blocks in a 3- or 4-col grid. Each item is a headline + short description. Avoid lists of features masquerading as benefits — write copy that explains the value, not just the capability.

**Social proof / testimonials** — builds trust. Quote → attribution → logo. Can be a carousel, horizontal scroll, or static grid. Keep it scannable.

**CTA banner** — mid-page or bottom call to action. High contrast, focused. One action only.

**Stats / numbers** — builds credibility fast. Large numerals, short labels. Use brand-accent color for the numbers.

**Pricing** — if needed. Cards with clear tier names, price, feature list, CTA. Highlight the recommended tier visually.

**FAQ** — reduces friction. Accordion-style. Write questions the user actually has.

**Footer** — links + legal + logo. Keep it clean.

---

## Thinking Before Coding

Before writing any code, commit to a direction and share it briefly with the user (1–2 sentences is fine). Consider:

- **Tone**: The Onfly brand is professional B2B, but landing pages have room to be bold. Choose a mood: editorial and airy? dense and data-forward? warm and conversational? dramatic with high-contrast sections?
- **Section order**: What's the user's conversion path? Lead with the strongest argument, remove doubt progressively, close with a clear action.
- **Visual motif**: Repeating geometric shapes? Diagonal dividers? Layered card depth? Consistent use of the brand tint (`--background-brand-subtle-1`) as a section background? Pick one and commit.

---

## Implementation Principles

**Make the layout do work.** Don't default to a single centered column of text. Try: full-bleed hero with overlapping content, alternating text/visual splits, asymmetric grids, sticky nav, parallax-lite (CSS transform on scroll via simple JS). Landing pages justify more layout ambition than app screens.

**Typography creates hierarchy.** On a landing page you have display-sized text available — use it. A `text-display-large` headline at 48px paired with `text-body-medium-regular` body at 16px creates strong visual contrast. Don't compress everything into h3 territory.

**Color sections intentionally.** Dark (`--background-primary-inverse`) and light (`--background-primary`) sections should alternate with purpose — not randomly. A dark CTA banner at the end reads as a natural climax. Brand-tinted sections (`--background-brand-subtle-1`) signal "featured" or "highlight" without going full-brand.

**Motion for impact, not decoration.** Use CSS animations for reveal-on-load (`@keyframes` with `animation-delay`), hover states on CTAs and cards, and subtle entrance animations for above-the-fold content. Keep it under 300ms. Use `tw-animate-css` utilities if available.

**Buttons from scratch.** Don't import shadcn Button. Build inline-styled buttons using tokens:

```tsx
// Primary CTA
<button
  className="inline-flex items-center gap-2 rounded-[var(--border-radius-full)] px-[var(--scale-24)] py-[var(--scale-12)] text-[length:var(--body-medium-600-font-size)] font-[var(--typography-font-weight-600)] transition-colors duration-150"
  style={{
    background: 'var(--background-brand-solid)',
    color: 'var(--content-on-brand)',
  }}
>
  Get started
</button>

// Secondary / ghost
<button
  className="inline-flex items-center gap-2 rounded-[var(--border-radius-full)] border px-[var(--scale-24)] py-[var(--scale-12)] text-[length:var(--body-medium-600-font-size)] font-[var(--typography-font-weight-600)] transition-colors duration-150"
  style={{
    borderColor: 'var(--border-brand-primary)',
    color: 'var(--content-brand-accent)',
  }}
>
  Learn more
</button>
```

**Responsive from the start.** Use `md:` and `lg:` breakpoints. Mobile: single column, stacked CTAs, condensed spacing. Desktop: wider grids, larger display type, more horizontal breathing room. Use `--spacing-context-screen-horizontal-padding` for outer gutters.

---

## Quick Section Templates

These are starting points — adapt them, don't copy blindly.

### Hero (centered)
```tsx
<section className="relative flex flex-col items-center justify-center gap-[var(--scale-24)] px-[var(--spacing-context-screen-horizontal-padding)] py-[var(--scale-96)] text-center">
  <span className="text-label-medium-semi-bold" style={{ color: 'var(--content-brand-accent)' }}>
    Eyebrow label
  </span>
  <h1 className="text-display-large max-w-3xl" style={{ color: 'var(--content-primary)' }}>
    Your biggest headline goes here
  </h1>
  <p className="text-body-medium-regular max-w-xl" style={{ color: 'var(--content-secondary)' }}>
    Supporting copy that elaborates on the promise above. One or two sentences max.
  </p>
  <div className="flex flex-wrap items-center justify-center gap-[var(--scale-12)]">
    {/* CTAs */}
  </div>
</section>
```

### Feature card
```tsx
<div
  className="flex flex-col gap-[var(--scale-16)] rounded-[var(--border-radius-lg)] p-[var(--scale-24)]"
  style={{ background: 'var(--background-secondary)', boxShadow: 'var(--shadow-card)' }}
>
  <div
    className="flex h-10 w-10 items-center justify-center rounded-[var(--border-radius-md)]"
    style={{ background: 'var(--background-brand-subtle-1)' }}
  >
    {/* Icon */}
  </div>
  <h3 className="text-heading-h5" style={{ color: 'var(--content-primary)' }}>
    Feature name
  </h3>
  <p className="text-body-small-regular" style={{ color: 'var(--content-secondary)' }}>
    Description
  </p>
</div>
```

### Stat
```tsx
<div className="flex flex-col gap-[var(--scale-4)]">
  <span className="text-display-medium" style={{ color: 'var(--content-brand-accent)' }}>
    98%
  </span>
  <span className="text-body-small-regular" style={{ color: 'var(--content-secondary)' }}>
    Label for the stat
  </span>
</div>
```
