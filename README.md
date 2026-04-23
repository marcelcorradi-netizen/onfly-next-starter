# onfly-next-starter

Template base para criar telas e protótipos com o **Onfly Design System** — shadcn/ui já tematizado com os tokens Onfly, pronto para usar.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** — 70+ componentes instalados
- **Onfly Design System** — tokens completos de cor, tipografia, espaçamento, sombras e grid

## Início rápido

```bash
# 1. Clone ou use como template no GitHub
git clone https://github.com/onfly/onfly-next-starter.git meu-projeto
cd meu-projeto

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado.

---

## Design Tokens

Os tokens estão em `src/styles/tokens/` como CSS Custom Properties e mapeados para o tema do shadcn em `src/app/globals.css`.

### Usar tokens como classes Tailwind

```tsx
<div className="bg-primary text-primary-foreground rounded-lg p-4" />
```

### Usar tokens como CSS variables

```tsx
<div style={{ color: "var(--content-primary)", background: "var(--background-brand-subtle-1)" }} />
```

### Atualizar tokens do Figma

1. Exporte os tokens do Figma (plugin Tokens Studio ou Figma Variables) como JSON
2. Cole os arquivos em `tokens-input/`
3. No Claude Code, invoque a skill `design-system-specialist`

---

## Componentes shadcn

Todos os componentes estão em `src/components/ui/` e já usam os tokens Onfly.

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
```

Para adicionar novos componentes:

```bash
npx shadcn@latest add <component-name>
```

---

## Skills Claude Code

Este template inclui skills pré-configuradas para o Claude Code (`.claude/skills/`):

| Skill | O que faz |
|---|---|
| `design-system-specialist` | Converte tokens Figma → CSS, sincroniza o tema shadcn |
| `frontend-design` | Cria componentes e páginas com alta qualidade visual |
| `landing-page` | Cria landing pages e páginas de marketing |
| `prd` | Gera Product Requirements Documents |
| `skill-creator` | Cria e melhora novas skills |

---

## Estrutura do projeto

```
onfly-next-starter/
├── .claude/
│   ├── CLAUDE.md               ← instruções para o Claude Code
│   └── skills/                 ← skills pré-configuradas
├── src/
│   ├── app/
│   │   ├── globals.css         ← tokens + tema shadcn
│   │   ├── layout.tsx          ← layout base
│   │   └── page.tsx            ← página inicial de exemplo
│   ├── components/
│   │   └── ui/                 ← 70+ componentes shadcn tematizados
│   ├── lib/
│   │   └── utils.ts            ← helper cn()
│   └── styles/
│       └── tokens/             ← sistema de tokens CSS completo
├── tokens-input/               ← JSONs exportados do Figma
├── components.json             ← configuração shadcn
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## GitHub Template

Para usar este repositório como template ao criar novos projetos no GitHub, clique em **"Use this template"** no topo da página do repositório.
