# onfly-next-starter

Template oficial da Onfly para criar telas e protótipos. Vem com **Next.js 15 + shadcn/ui já tematizado com os tokens do Onfly Design System** — você começa com tudo configurado e vai direto pro que importa.

---

## Criar um projeto

```bash
npx create-next-app@latest meu-projeto --example https://github.com/onfly/onfly-next-starter
cd meu-projeto
npm run dev
```

> Substitua `meu-projeto` pelo nome do seu projeto. O comando baixa o template, cria a pasta e instala as dependências automaticamente.

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado.

> **Showcase:** acesse [http://localhost:3000/showcase](http://localhost:3000/showcase) para explorar todos os componentes e tokens do Design System em uma página interativa.

---

## O que já vem configurado

### Design System completo
Os tokens do Onfly Design System estão em `src/styles/tokens/` como CSS Custom Properties e integrados ao shadcn/ui em `src/app/globals.css`. Você usa direto, sem configurar nada.

**Como usar os tokens:**

```tsx
// Via classes Tailwind (preferível para casos simples)
<div className="bg-primary text-primary-foreground rounded-lg" />

// Via CSS variables (para controle fino)
<div style={{ color: "var(--content-primary)", background: "var(--background-brand-subtle-1)" }} />
```

### 44 componentes shadcn/ui instalados e tematizados
Todos em `src/components/ui/` e já com a cara do Onfly DS. Importe e use:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
```

Para adicionar mais componentes do catálogo shadcn:

```bash
npx shadcn@latest add <nome-do-componente>
```

### Skills do Claude Code incluídas
O template já tem 5 skills configuradas em `.claude/skills/` para usar com o [Claude Code](https://claude.ai/code):

| Skill | O que faz |
|---|---|
| `design-system-specialist` | Converte tokens do Figma → CSS, sincroniza o tema shadcn |
| `frontend-design` | Cria componentes e páginas com alta qualidade visual usando os tokens Onfly |
| `landing-page` | Cria landing pages e páginas de marketing com o Onfly DS |
| `prd` | Gera Product Requirements Documents completos |
| `skill-creator` | Cria e melhora novas skills para o seu projeto |

---

## Atualizar os tokens do Figma

Quando os tokens mudarem no Figma, você sincroniza assim:

1. Exporte os tokens do Figma como JSON (plugin **Tokens Studio** ou **Figma Variables**)
2. Cole os arquivos em `tokens-input/`
3. No Claude Code, escreva: *"sincroniza os tokens"* — a skill `design-system-specialist` cuida do resto

---

## Estrutura do projeto

```
onfly-next-starter/
├── .claude/
│   ├── CLAUDE.md               ← contexto do projeto para o Claude Code
│   └── skills/                 ← skills pré-configuradas
├── src/
│   ├── app/
│   │   ├── globals.css         ← tokens do DS integrados ao shadcn
│   │   ├── layout.tsx          ← layout base da aplicação
│   │   └── page.tsx            ← página inicial de exemplo
│   ├── components/
│   │   └── ui/                 ← componentes shadcn tematizados
│   ├── lib/
│   │   └── utils.ts            ← helper cn() para classes condicionais
│   └── styles/
│       └── tokens/             ← sistema de tokens CSS (gerado do Figma)
├── tokens-input/               ← JSONs exportados do Figma
├── components.json             ← configuração do shadcn
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Stack

- [Next.js 15](https://nextjs.org) · App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Onfly Design System](https://design.onfly.com.br) — tokens de cor, tipografia, espaçamento, sombras e grid
