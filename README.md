# Zero Um CT Americana: site oficial

Site multipágina da **Zero Um CT**, academia de musculação 24 horas com 2.500 m² em Americana/SP.

Feito em **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + GSAP + Lenis**. É só frontend: não tem backend, banco de dados nem login, e todas as páginas são geradas estaticamente.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # produção
```

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Home: o que é → estrutura → 24h → planos e valores → avaliações → como começar → onde fica → dúvidas |
| `/sobre` | Sobre nós: quem é a Zero Um, números, o que tem lá dentro, equipe (pelas avaliações), avaliações do Google |
| `/estrutura` | Ambientes com foto + lista do que mais tem |
| `/planos` | Tabela de planos (`components/ui/pricing-table`): plano, diária, Wellhub e TotalPass |
| `/contato` | WhatsApp, Instagram, mapa e FAQ |
| `/aula-experimental` | Formulário que abre o WhatsApp com a mensagem pronta |
| `/politica-de-privacidade` | LGPD |
| `/styleguide` | Logo, cores, tipografia e componentes (fora do índice de busca) |

`/professores`, `/resultados` e `/horarios` redirecionam para `/sobre#equipe`, `/sobre#avaliacoes` e `/#horarios`. Essas páginas voltam quando houver conteúdo real.

## shadcn/ui

O projeto segue a estrutura do shadcn (`components.json`, `@/components/ui`, `@/lib/utils` com `cn()`). Os tokens semânticos (`primary`, `card`, `muted-foreground`…) estão em `src/app/globals.css`, mapeados para as cores da marca. Para adicionar outro componente:

```bash
npx shadcn@latest add <componente>
```

## Como editar o conteúdo (sem mexer em componente)

**Tudo** fica em **`src/content/zeroum.ts`**: endereço, planos e preços, professores, grade de horários, FAQ, eventos, depoimentos e conquistas.

- O que ainda não foi confirmado está marcado como `{ todo: "..." }`, `null` ou lista vazia. **Isso não aparece para o visitante**: o bloco fica escondido. Para revisar as pendências na tela, rode com `NEXT_PUBLIC_SHOW_TODOS=1 npm run dev`.
- Planos e formas de treinar: `formasDeTreinar` em `zeroum.ts`.
- Exemplos:
  - **Preço:** em `planos[i].precos.mensal`, troque `null` por `129.9`.
  - **Endereço:** em `endereco.texto`, coloque `"Rua …, 200 · Bairro · Americana/SP"` e marque `confirmado: true`.
  - **Professor:** preencha nome, CREF e turno e remova `pendente: true`.
  - **Depoimento:** adicione `{ id, nome, texto, nota: 5, desde: "2024" }` em `depoimentos`.

A lista completa do que falta confirmar está no fim do `BUILD_LOG.md`.

## Como trocar as fotos

1. Coloque a foto em `public/photos/` (de preferência com 2048px ou mais de largura).
2. Em `src/content/media.ts`, preencha `src: "/photos/arquivo.jpg"` no slot correspondente e revise o `alt`.
3. Pronto: o `next/image` gera AVIF/WebP e os tamanhos responsivos.

No hero, o `hero-athlete-f` precisa ser um **PNG com fundo transparente** (o recorte da atleta fica na frente do logo gigante). Os prompts e o briefing de cada foto estão em `IMAGE_PROMPTS.md`.

## Logo

Use só os arquivos de `public/brand/` (kit vetorizado). No código, use `<Logo />` e `<Wordmark />` (`src/components/brand/Logo.tsx`). Não recrie a logo com fonte nem troque as cores.

Para regerar o favicon, os ícones e a imagem de Open Graph:

```bash
node scripts/brand-assets.mjs
```

## Publicar

O caminho mais simples é a **Vercel**: importe o repositório e o framework é detectado sozinho. Funciona em qualquer host com Node (`npm run build && npm start`).

Antes de publicar, atualize `zeroum.site` em `src/content/zeroum.ts` com o domínio definitivo. Ele é usado no canonical, no sitemap e no Open Graph.

## Onde está cada coisa

- `src/content/`: dados (`zeroum.ts`) e slots de imagem (`media.ts`)
- `src/components/sections/`: seções das páginas
- `src/components/motion/ScrollFx.tsx`: todas as animações de scroll. As seções só declaram `data-fx="..."`, e o GSAP é carregado sob demanda.
- `src/app/globals.css`: tokens de cor e tipografia, componentes base e a intro do hero em CSS
- `design-system/zero-um-ct-americana/`: design system gerado pela `ui-ux-pro-max` e o override de marca
- `BUILD_LOG.md`: skills usadas, tabela de motion, medições de Lighthouse e TODOs
