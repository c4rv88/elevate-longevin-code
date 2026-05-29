## Diagnóstico
As imagens 2–5 estão cortadas em quadrado porque as thumbnails baixadas via microlink vêm da URL do og:image do Instagram, que já é uma versão **pré-recortada em 1:1** (parâmetros `c288.0.864.864a` / `s640x640` na URL do CDN). O `aspect-[4/5]` + `object-contain` do card não consegue restaurar pixels que já foram cortados na origem.

A imagem 1 (reel) aparece inteira porque o reel já é vertical 9:16 e o crop quadrado do og pegou só o miolo, que coincidentemente cobre o card.

## Solução
Re-baixar as 5 thumbnails a partir do **endpoint público de embed do Instagram** (`https://www.instagram.com/p/<shortcode>/embed/captioned`), que serve a imagem do post na proporção original (sem o crop quadrado do og:image). Esse endpoint não exige login nem chave e é o mesmo usado pelo widget oficial de embed.

### Passos
1. Para cada um dos 5 posts (4 `/p/...` + 1 `/reel/...`), buscar `https://www.instagram.com/<path>/embed/captioned/` com `User-Agent` de browser.
2. Extrair do HTML retornado a URL do `<img class="EmbeddedMediaImage">` (ou o `display_url` no JSON embutido), que aponta para a imagem em proporção nativa.
3. Sobrescrever `src/assets/instagram/post-1.jpg` … `post-5.jpg` com essas novas imagens.
4. Caso algum post não retorne imagem nativa (raro), manter o fallback atual.

### Sem mudanças no React
- `src/routes/index.tsx` não muda: já está com `aspect-[4/5]` + `object-contain` + `bg-muted`, que vai exibir cada imagem inteira na sua proporção original assim que o arquivo correto estiver no disco.
- Reels (9:16) ficarão com pequenas faixas laterais do `bg-muted`; posts quadrados (1:1) ficarão com faixas em cima/baixo; posts 4:5 preencherão o card. Nenhuma imagem cortada.

### Fallback se o endpoint /embed/ falhar
Tentar `https://www.instagram.com/p/<shortcode>/?__a=1&__d=dis` e, em último caso, raspar a página pública via Firecrawl (já é o conector padrão do projeto) para extrair `display_url`.
