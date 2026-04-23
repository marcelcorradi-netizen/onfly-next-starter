# Token Conversion Reference

Full rules for converting Figma token JSON files into CSS Custom Properties.

---

## Input Formats

**Plugin format** (preferred — more complete):
- Has a `manifest.json` describing all files and their collections/modes
- `foundations/` contains: `Brand.Value`, `Foundation.Value`, `Typography.Value`, `Layout.Desktop/Mobile`, `Grid.Desktop/Mobile`, `Theme.Light`, `Effects.Mode 1`
- `foundations/` also contains style files: `text.styles.tokens.json`, `effect.styles.tokens.json`, `grid.styles.tokens.json`
- Token values use cross-references like `{color.gray.950}` — resolve these to `var(--color-gray-950)`

**Figma native format** (fallback — variables only, no styles):
- ZIP files per collection; extract them first
- W3C format: each token has `$type`, `$value`, `$extensions`
- Ignore the `$extensions.com.figma.variableId` — it's internal Figma metadata

---

## Naming Convention

Convert the JSON key path to a CSS custom property by joining keys with hyphens:

| JSON path | CSS variable |
|---|---|
| `color.gray.950` | `--color-gray-950` |
| `typography.font.size.14` | `--typography-font-size-14` |
| `background.primary` | `--background-primary` |
| `display.large.font-size` | `--display-large-font-size` |
| `shadow-xs` | `--shadow-xs` |

- No prefix (no `--ds-` or `--ia-`)
- Keep the full semantic path exactly as-is
- Replace dots and spaces with hyphens; remove any leading/trailing hyphens

---

## Value Resolution

- **References** like `{color.gray.950}` → `var(--color-gray-950)`
- **Numbers without units**: add `px` unless it's a font-weight, opacity, z-index, or unitless line-height
- **Percentages**: keep as-is (`-1%` for letter-spacing stays `-1%`)
- **Negative values**: keep the sign (`-12px`)
- **Colors**: use as-is (hex, rgba, hsla)
- **Circular references**: log a warning and use the raw value

---

## Text Styles (`text.styles.tokens.json`)

Each text style becomes both a set of custom properties and a CSS class:

```css
/* Variables for programmatic use */
:root {
  --display-large-font-family: var(--typography-font-family-poppins);
  --display-large-font-size: var(--typography-font-size-104);
  --display-large-font-weight: var(--typography-font-weight-600);
  --display-large-line-height: var(--display-large-line-height);
  --display-large-letter-spacing: -1%;
}

/* Utility class for direct application */
.text-display-large {
  font-family: var(--display-large-font-family);
  font-size: var(--display-large-font-size);
  font-weight: var(--display-large-font-weight);
  line-height: var(--display-large-line-height);
  letter-spacing: var(--display-large-letter-spacing);
  text-transform: none;
  text-decoration: none;
}
```

---

## Effect / Shadow Styles (`effect.styles.tokens.json`)

Compose multi-layer shadows from the token parts (position-x, position-y, blur, spread, color):

```css
:root {
  --shadow-xs: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  --shadow-sm: 0px 1px 3px 0px rgba(10, 13, 18, 0.10),
               0px 1px 2px -1px rgba(10, 13, 18, 0.10);
  --focus-ring: 0px 0px 0px 2px var(--effect-focus-ring-overlay),
                0px 0px 0px 4px var(--effect-focus-ring-stroke);
}

/* Utility classes */
.shadow-xs  { box-shadow: var(--shadow-xs); }
.shadow-sm  { box-shadow: var(--shadow-sm); }
.shadow-md  { box-shadow: var(--shadow-md); }
.shadow-lg  { box-shadow: var(--shadow-lg); }
.shadow-xl  { box-shadow: var(--shadow-xl); }
.shadow-2xl { box-shadow: var(--shadow-2xl); }
.focus-ring { box-shadow: var(--focus-ring); }
```

---

## Theme (Light only)

```css
/* theme.light.css */
:root {
  --background-primary: #ffffff;
  --content-primary: var(--color-gray-950);
  /* ... all Theme.Light tokens ... */
}
```
