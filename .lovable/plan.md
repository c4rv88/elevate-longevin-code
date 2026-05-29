## Objetivo

Criar uma página dedicada para cada uma das 7 especialidades fornecidas (Geriatria, Clínica Médica, Neurologia, Reumatologia, Psicologia, Psiquiatria, Cardiologia) e tornar os nós do diagrama clicáveis para navegar até elas.

## Arquitetura de rotas

Uma única rota dinâmica em `src/routes/especialidades.$slug.tsx` que renderiza o conteúdo de acordo com o `slug`. Vantagens: um único arquivo, SEO por rota (`head()` com title/description próprios), fácil expansão futura.

URLs geradas:
- `/especialidades/geriatria`
- `/especialidades/clinica-medica`
- `/especialidades/neurologia`
- `/especialidades/reumatologia`
- `/especialidades/psicologia`
- `/especialidades/psiquiatria`
- `/especialidades/cardiologia`

Se o slug não existir → `notFound()`.

## Conteúdo

Criar `src/data/specialties-content.ts` com um mapa `slug → { name, tagline, paragraphs[], Icon }` usando exatamente os textos fornecidos pelo usuário (título, subtítulo destacado e parágrafos).

## Layout da página

Reutilizar `SiteHeader` e `SiteFooter` (mesmos do site). Estrutura por página:

1. Hero curto: ícone da especialidade (Lucide, mesmo do diagrama) + nome + tagline (a frase em destaque do texto fornecido).
2. Corpo: parágrafos do texto em tipografia editorial (prose), alinhado ao design system (tokens de cor/spacing já existentes em `src/styles.css`).
3. CTA final: botão "Agendar consulta" + link "Ver todas as especialidades" voltando para a âncora do diagrama na home.
4. `head()` com `title`, `description`, `og:title`, `og:description` específicos por especialidade.

## Navegação a partir do diagrama

Em `src/components/SpecialtiesNetwork.tsx`:
- Mapear `specialty.id` → slug de rota (`clinica` → `clinica-medica`, demais ids já batem com o slug).
- Envolver cada nó (desktop + mobile timeline) em `<Link to="/especialidades/$slug" params={{ slug }}>` somente para as 7 especialidades com página. As 3 sem página (Endocrinologia, Dermatologia, Nutrição, Oftalmologia) continuam apenas com tooltip/drawer — sem link.
- Manter hover/tooltip atuais; o clique passa a navegar.

## Detalhes técnicos

- Rota: `createFileRoute('/especialidades/$slug')` com `head()` derivado do conteúdo via `loader` que retorna o specialty (ou `throw notFound()`).
- `errorComponent` e `notFoundComponent` definidos na rota.
- Componente da página fica em `src/components/SpecialtyPage.tsx` para manter a rota enxuta.
- Sem mudanças em backend/dados — puramente frontend.

## Arquivos

Novos:
- `src/data/specialties-content.ts`
- `src/components/SpecialtyPage.tsx`
- `src/routes/especialidades.$slug.tsx`

Editados:
- `src/components/SpecialtiesNetwork.tsx` (tornar nós clicáveis para as 7 especialidades)
