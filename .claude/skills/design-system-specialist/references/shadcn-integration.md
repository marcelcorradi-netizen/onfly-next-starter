# shadcn/ui Integration Guide (Tailwind v4)

## How shadcn v4 Theming Works

shadcn v4 uses **Tailwind CSS v4**, which has a fundamentally different theming model from v3:

- **No `tailwind.config.ts` color configuration** — colors are mapped in CSS with `@theme inline`
- **`@import "tailwindcss"`** instead of `@tailwind base/components/utilities` directives
- **`@import "shadcn/tailwind.css"`** loads shadcn's base layer
- Variables are standard CSS custom properties in `:root` — any valid CSS color format (hex, rgb, oklch) works

The flow for DS token integration:

```
DS token JSON
  → CSS vars in src/styles/tokens/  (--color-blue-600: #2563eb)
  → shadcn semantic vars in :root   (--primary: var(--color-blue-600))
  → @theme inline registers them    (--color-primary: var(--primary))
  → Tailwind utility bg-primary works
```

Light mode only — no `.dark` selectors anywhere.

---

## globals.css Full Template

This is the authoritative structure. `globals.css` has three responsibilities: import tokens, register colors with Tailwind, map DS tokens to shadcn variables.

```css
/* ── 1. Token files ── */
@import '../styles/tokens/index.css';

/* ── 2. Tailwind & shadcn base ── */
@import "tailwindcss";
@import "shadcn/tailwind.css";

/* ── 3. Register shadcn vars as Tailwind color utilities via @theme inline ── */
@theme inline {
  --color-background:              var(--background);
  --color-foreground:              var(--foreground);
  --color-card:                    var(--card);
  --color-card-foreground:         var(--card-foreground);
  --color-popover:                 var(--popover);
  --color-popover-foreground:      var(--popover-foreground);
  --color-primary:                 var(--primary);
  --color-primary-foreground:      var(--primary-foreground);
  --color-secondary:               var(--secondary);
  --color-secondary-foreground:    var(--secondary-foreground);
  --color-muted:                   var(--muted);
  --color-muted-foreground:        var(--muted-foreground);
  --color-accent:                  var(--accent);
  --color-accent-foreground:       var(--accent-foreground);
  --color-destructive:             var(--destructive);
  --color-destructive-foreground:  var(--destructive-foreground);
  --color-border:                  var(--border);
  --color-input:                   var(--input);
  --color-ring:                    var(--ring);

  /* Radius scale derived from a single DS token */
  --radius-sm:  calc(var(--radius) * 0.6);
  --radius-md:  calc(var(--radius) * 0.8);
  --radius-lg:  var(--radius);
  --radius-xl:  calc(var(--radius) * 1.4);
}

/* ── 4. Map DS tokens → shadcn semantic variables ── */
:root {
  /* Page */
  --background:             var(--background-primary);
  --foreground:             var(--content-primary);

  /* Card / Popover */
  --card:                   var(--background-primary);
  --card-foreground:        var(--content-primary);
  --popover:                var(--background-primary);
  --popover-foreground:     var(--content-primary);

  /* Brand / CTA */
  --primary:                var(--background-brand-solid);
  --primary-foreground:     var(--content-on-brand);

  /* Secondary */
  --secondary:              var(--background-secondary);
  --secondary-foreground:   var(--content-secondary);

  /* Muted */
  --muted:                  var(--background-tertiary);
  --muted-foreground:       var(--content-tertiary);

  /* Accent */
  --accent:                 var(--background-brand-subtle-1);
  --accent-foreground:      var(--content-brand-primary);

  /* Destructive */
  --destructive:            var(--background-error-solid);
  --destructive-foreground: var(--content-on-error);

  /* Borders & inputs */
  --border:                 var(--border-primary);
  --input:                  var(--border-primary);
  --ring:                   var(--effect-focus-ring-stroke);

  /* Base radius — shadcn derives all radius scales from this */
  --radius:                 var(--border-radius-md);
}

/* ── 5. Base styles ── */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--typography-font-family-poppins); /* adjust to your DS font token */
  }
}
```

If a DS token listed in step 4 doesn't exist in your token files, stop and tell the user which mapping is missing. Do not substitute raw values.

---

## shadcn Variable Reference

| shadcn variable | DS token to map | Used for |
|---|---|---|
| `--background` | `--background-primary` | Page background |
| `--foreground` | `--content-primary` | Default text |
| `--primary` | `--background-brand-solid` | CTA buttons, active states |
| `--primary-foreground` | `--content-on-brand` | Text on primary |
| `--secondary` | `--background-secondary` | Secondary buttons, surfaces |
| `--secondary-foreground` | `--content-secondary` | Text on secondary |
| `--muted` | `--background-tertiary` | Disabled, subtle backgrounds |
| `--muted-foreground` | `--content-tertiary` | Placeholder, helper text |
| `--accent` | `--background-brand-subtle-1` | Hover highlights |
| `--accent-foreground` | `--content-brand-primary` | Text on accent |
| `--destructive` | `--background-error-solid` | Error, delete actions |
| `--destructive-foreground` | `--content-on-error` | Text on destructive |
| `--border` | `--border-primary` | Default borders |
| `--input` | `--border-primary` | Input borders |
| `--ring` | `--effect-focus-ring-stroke` | Focus rings |
| `--radius` | `--border-radius-md` | Base border radius |

---

## Project Setup

If the Next.js + shadcn project doesn't exist yet:

```bash
npx create-next-app@latest . --typescript --tailwind --app
npx shadcn@latest init
```

When shadcn asks for the base color, choose **Neutral** — the actual colors will come from the DS tokens. After init, replace the generated `globals.css` content with the template above.

---

## Typography

Apply DS text style tokens to base HTML elements in `@layer base`:

```css
@layer base {
  h1 { font-size: var(--display-large-font-size); font-weight: var(--display-large-font-weight); line-height: var(--display-large-line-height); }
  h2 { font-size: var(--heading-h2-font-size);    font-weight: var(--heading-h2-font-weight);    line-height: var(--heading-h2-line-height); }
  h3 { font-size: var(--heading-h3-font-size);    font-weight: var(--heading-h3-font-weight);    line-height: var(--heading-h3-line-height); }
}
```

The `.text-*` utility classes (e.g., `.text-display-large`) are generated automatically from `text.styles.tokens.json` — use them directly in JSX.

---

## Tips

- **No `tailwind.config.ts` edits needed** — `@theme inline` in `globals.css` handles everything.
- **Hex tokens work fine** — Tailwind v4 with `@theme inline` accepts any valid CSS color via `var()` references. No hex→oklch conversion needed.
- **Inspect before assuming** — if a shadcn component looks wrong, open DevTools and check which CSS variable it consumes. The table above covers the main cases; less-common components may use additional variables.
- **shadcn component files** live in `src/components/ui/` and are yours to edit. You can swap Tailwind classes for DS token classes directly when the standard mapping isn't enough.
