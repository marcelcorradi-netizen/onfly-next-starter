# Changelog

## [Unreleased] — 2026-04-27

### Corrigido
- **Button `outline` e `ghost`**: hover estava usando `--accent` (brand-50 / brand-950). Substituído por `hover:bg-muted` (gray-100) — cor neutra sem tom de marca.
- **Home — link "Ver componentes"**: botão não navegava para lugar nenhum. Agora aponta para `/showcase` via `<Link>`.
- **Home — contagem de componentes**: indicava "70 componentes" incorretamente. Corrigido para **46** (número real após instalação dos componentes faltantes).
- **globals.css**: shadcn injetou bloco `.dark` com variáveis do Sidebar em HSL. Removido — projeto é light-mode only.

### Adicionado
- **`OnflyHeader`**: componente de header completo (nav com dropdowns, avatar, ajuda, acessos rápidos) portado do projeto hackathon-onfly para `src/components/onfly-header.tsx`.
- **`src/assets/logo.svg`**: logo Onfly copiado do hackathon para suportar o `OnflyHeader`.
- **Showcase — Onfly Header**: story adicionada no grupo "Padrões" com item ativo interativo e dropdowns funcionais.
- **shadcn/ui — `chart`**: componente instalado (`src/components/ui/chart.tsx`), baseado em Recharts.
- **shadcn/ui — `sidebar`**: componente instalado (`src/components/ui/sidebar.tsx` + `src/hooks/use-mobile.ts`).
- **Showcase — Chart**: story com bar chart de voos vs. hotéis usando tokens da marca, com tooltip e legenda.
- **Showcase — Sidebar**: story com nav lateral contida (estrutura com header, grupo de menu e área de conteúdo).

### Removido
- **Home — botão "Começar"**: removido por não ter destino definido em um template.
