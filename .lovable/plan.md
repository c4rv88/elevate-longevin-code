## Objetivo

Adicionar favicons em todos os formatos comuns (browser, iOS, Android, Windows) usando o ícone oficial da Longevin, e remover/garantir que não há referências visíveis ao "Lovable" no conteúdo do site.

## O que será feito

### 1. Favicons (todos os dispositivos)

A imagem enviada (16×16) é pequena demais para gerar ícones em alta resolução. Vou baixar o favicon oficial em alta resolução do site `longevin.com.br` (`longevin-favicon2-300x300.png`) e usá-lo como fonte. A partir dele, gerarei todos os tamanhos necessários em `public/`:

- `public/favicon.ico` (multi-resolução: 16, 32, 48)
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon-96x96.png`
- `public/apple-touch-icon.png` (180×180, iOS)
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/site.webmanifest` (nome, ícones, theme color)

Ferramenta usada: ImageMagick (via `nix run nixpkgs#imagemagick`) para redimensionar e gerar o `.ico` multi-size.

### 2. Registrar no `<head>`

Em `src/routes/__root.tsx`, adicionar no array `links` do `head()`:

```ts
{ rel: "icon", href: "/favicon.ico", sizes: "any" },
{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
{ rel: "manifest", href: "/site.webmanifest" },
```

E em `meta`: `{ name: "theme-color", content: "#<verde-longevin>" }`.

### 3. Referências ao "Lovable"

Pesquisei o projeto. As únicas ocorrências de "Lovable" são:

- `package.json` → dependência `@lovable.dev/vite-tanstack-config` (ferramenta de build, invisível ao usuário)
- `vite.config.ts` → import da mesma dependência

Nenhuma referência aparece em conteúdo, títulos, meta tags, manifest ou UI — já estão definidos como "Longevin". As referências de build não podem ser removidas (o projeto deixa de compilar), mas não são visíveis ao usuário final nem aparecem no HTML publicado.

### Não incluso

- Não vou reescrever o site para ficar visualmente idêntico ao `longevin.com.br` (WordPress/Elementor). Apenas a identidade visual (favicon, nome, metadados) será alinhada. Se você quiser replicar layout/cores/seções específicas da WordPress, me avise quais.