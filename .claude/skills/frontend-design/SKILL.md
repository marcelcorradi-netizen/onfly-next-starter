---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Project Stack

This is a **Next.js 15 + React 19 + TypeScript** project using **shadcn/ui** with **Tailwind CSS v4** and a fully customized Onfly design system.

Always produce `.tsx` files following **Next.js App Router** conventions (`src/app/`). Components live in `src/components/` (shared) or colocated in `src/app/` (page-specific). Use `"use client"` only when genuinely needed (interactivity, hooks).

## Component-First Approach

Before writing custom markup, check what's already available:

**Installed shadcn/ui components** (`src/components/ui/`):
`button` · `card` · `dialog` · `label` · `select` · `sheet` · `tabs` · `badge` · `input` · `textarea`

When you need a component that isn't installed yet, install it first:
```bash
npx shadcn@latest add <component-name>
```
Then import it from `@/components/ui/<component-name>`. Don't rebuild something shadcn already provides — install it.

Use lucide-react for icons (already installed).

## Design System Tokens

The Onfly design system tokens are available as CSS variables and mapped to Tailwind utilities. Always use these — never hardcode colors, spacing radii, or fonts.

**Tailwind semantic classes (preferred):**
- Backgrounds: `bg-background` `bg-primary` `bg-secondary` `bg-muted` `bg-accent` `bg-destructive`
- Text: `text-foreground` `text-primary-foreground` `text-secondary-foreground` `text-muted-foreground` `text-accent-foreground`
- Borders: `border-border` `border-input`
- Focus: `ring-ring`
- Radius: `rounded-sm` `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl`

**Direct CSS variables for fine-grained control:**
- Brand: `--background-brand-solid` (500), `--background-brand-subtle-1` (50), `--background-brand-subtle-2` (100)
- Semantic states: `--background-success-*`, `--background-error-*`, `--background-warning-*`
- Content: `--content-primary`, `--content-secondary`, `--content-tertiary`, `--content-brand-primary`
- Borders: `--border-primary`, `--border-secondary`, `--border-brand-primary`

**Border usage rule**: `--border-secondary` is the default for almost all UI surfaces — cards, table rows, dividers, inputs, wrappers. `--border-primary` is strong and should be reserved for rare cases where a border needs to carry structural weight (e.g. a prominent modal edge, a selected state outline). When in doubt, use secondary. The shadcn `border-border` utility maps to `--border` (primary) — always override it with `[border-color:var(--border-secondary)]` or inline `style` for component-level borders.
- Typography: `--typography-font-family-primary` (the Onfly brand font, already applied to body)
- Spacing: `--scale-4` through `--scale-999` (4px increments)
- Headings: `--heading-h1-font-size`, `--heading-h2-font-size`, `--heading-h3-font-size` (with matching weight/line-height vars)

Use Tailwind utilities where they map cleanly. Use CSS variables directly in `style={{}}` or custom CSS for values that don't have a Tailwind equivalent.

**Never redefine the shadcn semantic variables** (`--primary`, `--background`, `--foreground`, `--border`, etc.) in a local scope (inline style, CSS class, or component-level `:root` override) — this would break all shadcn components rendered inside that scope, since they resolve their colors through those same variables.

**Don't introduce custom fonts** — the Onfly brand font is already set on `body` via `--typography-font-family-primary`. If you need typographic variety, use font-weight and letter-spacing variations, not new font families.

## Pre-Build Check (required before writing any code)

Before implementing anything, do a quick audit and **report to the user**. This is a mandatory communication step — don't skip it even for small components.

**1. New shadcn/ui components needed**

Compare what the screen requires against the already-installed list above. For each component not yet installed, list it clearly:

```
📦 New shadcn/ui components to install:
- <component-name> — <why it's needed>
```

If nothing new is needed, say so briefly.

**2. Custom elements using design tokens**

Identify any UI elements that can't be satisfied by shadcn components and will need to be built from scratch using Onfly tokens (CSS variables, spacing scale, typography, etc.). For each one, explain why an existing shadcn component isn't sufficient:

```
🎨 Custom elements (built with Onfly tokens):
- <element name> — <reason shadcn doesn't cover this>
```

Examples of when custom elements are justified: a status indicator with brand-specific color logic, a data visualization cell, a layout pattern with grid tokens, an animated progress step that doesn't map to any shadcn primitive.

Present this check to the user before writing code. If there's nothing to flag in either category, a single brief line is fine ("No new components needed, no custom elements required — proceeding."). The goal is transparency, not ceremony.

---

## Design Thinking

Before coding, understand the context and commit to a clear aesthetic direction that works within the Onfly design system:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Professional B2B travel product — but there's plenty of room within that. Think: sharp and data-dense, warm and conversational, editorial and airy, bold and status-forward. The design system gives you the palette; you decide the mood.
- **Constraints**: Technical requirements, data shape, interaction complexity.
- **Differentiation**: What makes this component memorable and delightful to use?

Choose a clear direction and execute it with precision. The Onfly design system is your constraint and your canvas — work with it, not around it.

Then implement working code that is:
- Production-grade and functional
- Visually intentional — not just "styled with shadcn defaults"
- Cohesive with the Onfly visual language
- Refined in spacing, hierarchy, and interaction details

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Use the DS heading tokens for hierarchy. Play with size contrast, weight, and letter-spacing to create visual rhythm. The brand font has its own character — let it show. **Minimum body text is 14px (`text-sm`)** — avoid `text-xs` (12px) and anything smaller except in genuinely extreme cases (e.g. a badge count inside an icon, a legal footnote). When tempted to reach for `text-xs`, use `text-sm` instead.
- **Color**: The brand palette (brand-500 as primary, brand-50/100 as tints) is rich. Use state colors (success/warning/error) purposefully. Subtle backgrounds (`bg-muted`, `bg-accent`) create depth without noise.
- **Motion**: CSS-only animations with `tw-animate-css` (already installed). Focus on high-impact moments: page load reveals with `animation-delay`, hover states that communicate interactivity, transitions that feel snappy (150-200ms) not sluggish.
- **Spatial Composition**: Don't default to a single-column card stack. Try: data-dense grids, sidebar + main layouts, hero + detail splits, horizontal scrolling panels. Use the grid tokens (`--grid-desktop-*`) for guidance.
- **Depth & Detail**: Subtle `box-shadow` using the effects tokens, borders that define sections without heaviness, consistent radius via the scale. Elevation should feel intentional.

Avoid cookie-cutter shadcn defaults: don't just stack `<Card>` components with default padding and call it done. Customize spacing, compose components in unexpected ways, add micro-interactions. The goal is a UI that feels genuinely designed, not assembled.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Dense dashboards need careful grid work and information hierarchy. Conversational UIs need generous spacing and warm details. Execute the chosen direction fully — half-committed designs feel unfinished.

Remember: the Onfly design system gives you a strong foundation. Use it as a springboard, not a ceiling.
