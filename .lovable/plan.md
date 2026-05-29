## Objetivo

Remover a seção CTA "Fale com nosso staff" (a faixa verde com "Quer conhecer um novo jeito de cuidar da sua saúde?") em `src/routes/index.tsx` e substituí-la por uma nova seção **"Acompanhe no Instagram"**, inspirada no print de referência, com 5 posts reais do perfil `@clinicalongevin` e um botão para o perfil.

## O que será feito

### 1. Remover seção CTA verde
Em `src/routes/index.tsx`, remover o bloco `{/* CTA */}` inteiro (a `<section>` com fundo `bg-primary` que contém "Fale com nosso staff").

### 2. Adicionar seção "Acompanhe no Instagram"
No mesmo lugar (entre Depoimentos e Artigos), adicionar nova seção com:

- **Fundo:** `bg-[oklch(0.96_0.012_100)]` (mesmo tom suave usado em outras seções) para criar respiro visual antes dos Artigos.
- **Topo centralizado:** ícone `Instagram` (lucide-react) em traço fino + título serifado "Acompanhe no Instagram" (mesma tipografia das outras seções, `font-serif text-4xl md:text-5xl`, com "Instagram" em itálico/`text-primary`) + parágrafo curto: *"Dicas de saúde, bastidores da clínica e conteúdos sobre medicina integrada e longevidade."*
- **Grid de 5 posts:** grid responsivo (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`), cada card é um `<a>` para o link do post, abrindo em nova aba (`target="_blank"` `rel="noopener noreferrer"`).
  - Cada card: aspecto quadrado (`aspect-square`), `rounded-2xl overflow-hidden`, thumbnail com `object-cover`, hover sutil com zoom (`group-hover:scale-[1.04]`) e overlay com ícone Instagram no centro ao passar o mouse.
  - Padrão de hover e elevação alinhado ao restante do site (cards de artigos / depoimentos).
- **Botão central abaixo do grid:** botão arredondado no estilo `btn-premium`/pill já usado no site, com ícone Instagram + texto "Acompanhe no Instagram" → link para `https://www.instagram.com/clinicalongevin` em nova aba.

### 3. Thumbnails dos posts
Para cada um dos 5 reels/posts:
1. `https://www.instagram.com/reel/DYkqnizSvve/`
2. `https://www.instagram.com/p/DYhS-x3lSTG/`
3. `https://www.instagram.com/p/DYmkEe6FZL9/`
4. `https://www.instagram.com/p/DY2nSV1mU8k/`
5. `https://www.instagram.com/p/DKSsB7GS-r5/`

Baixar a imagem de preview via endpoint público `https://www.instagram.com/p/<shortcode>/media/?size=l` (ou capturar via screenshot da página pública) e salvar em `src/assets/instagram/post-1.jpg` … `post-5.jpg`. Importar como ES modules no topo do arquivo.

> Observação: o Instagram pode bloquear hotlink direto, por isso os thumbnails serão baixados e servidos localmente pelo próprio site (mais rápido, estável e sem dependência de CDN externa).

### 4. Detalhes técnicos
- Adicionar import: `Instagram` de `lucide-react`.
- Adicionar imports dos 5 assets em `src/assets/instagram/`.
- Sem alterações em `SiteHeader`, `SiteFooter`, tokens de design, rotas ou outras seções.
- Nenhum endpoint, dependência ou variável de ambiente novos.

### 5. Arquivos alterados
- `src/routes/index.tsx` — remove seção CTA, adiciona seção Instagram.
- `src/assets/instagram/post-1.jpg` … `post-5.jpg` — novos (baixados dos posts públicos).

### O que NÃO muda
- Cabeçalho, rodapé, padrão de botões existentes, paleta, tipografia.
- Seções de Hero, Proposta, Excelência, Especialidades, Equipe, Depoimentos, Artigos.
