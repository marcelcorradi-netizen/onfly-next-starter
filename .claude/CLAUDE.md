# Onfly Next Starter

Template base para criar telas e protótipos com o Onfly Design System.

**Stack:** React 19 · Next.js 15 · shadcn/ui · Tailwind CSS v4 · TypeScript

---

## Skills disponíveis

### `design-system-specialist`
Expert em Design System. Invoke para:
- Converter tokens JSON do Figma em CSS (jogar os JSONs em `tokens-input/`)
- Sincronizar tokens quando o Figma atualizar
- Configurar ou atualizar o tema shadcn com os tokens da Onfly

### `frontend-design`
Cria interfaces frontend com alta qualidade visual usando o Onfly DS. Invoke para:
- Construir componentes, páginas ou seções do zero
- Garantir que o resultado use tokens Onfly (não valores hardcoded)
- Criar UIs que vão além do padrão genérico do shadcn

### `landing-page`
Cria landing pages e páginas de marketing com o Onfly DS. Invoke para:
- Hero sections, feature grids, CTAs, testimonials, pricing
- Páginas completas de campanha ou produto
- Composições visuais expressivas sem depender do shadcn

### `prd`
Gera Product Requirements Documents completos. Invoke para:
- Documentar requisitos de um novo produto ou feature
- Gerar user stories, critérios de aceite e especificações técnicas
- Planejar rollout e riscos

### `skill-creator`
Cria e melhora skills. Invoke para:
- Criar novas skills específicas para o seu projeto
- Melhorar e iterar em skills existentes
- Rodar evals para medir qualidade de uma skill

---

## Estrutura de tokens

```
tokens-input/       ← cole aqui os JSONs exportados do Figma
src/
├── app/
│   └── globals.css ← tokens importados + tema shadcn
└── styles/
    └── tokens/     ← CSS gerado pela skill design-system-specialist
        ├── index.css
        ├── foundations/
        │   ├── brand.css
        │   ├── foundation.css
        │   ├── typography.css
        │   ├── effects.css
        │   ├── layout.desktop.css
        │   ├── layout.mobile.css
        │   ├── grid.desktop.css
        │   └── grid.mobile.css
        └── themes/
            └── theme.light.css
```

## Componentes shadcn

Todos os 70 componentes shadcn/ui estão instalados em `src/components/ui/` e já tematizados com os tokens Onfly.

Para adicionar novos componentes:
```bash
npx shadcn@latest add <component-name>
```

## Importações

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## Tokens como classes Tailwind

```tsx
// Backgrounds
<div className="bg-background bg-primary bg-muted bg-accent" />

// Texto
<p className="text-foreground text-muted-foreground" />

// Radius
<div className="rounded-sm rounded-md rounded-lg rounded-xl" />
```

## Tokens como CSS vars

```tsx
<div style={{ color: "var(--content-primary)", background: "var(--background-brand-subtle-1)" }} />
```
