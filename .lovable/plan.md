## Objetivo
Elevar o hero para padrão "boutique cinematográfico": foto viva e nítida, hierarquia clara, navbar com presença, CTA dominante e estrutura assimétrica — sem alterar fontes, conteúdos ou identidade Longevin.

---

## 1. Overlay cinematográfico (remover a névoa branca)

**Em `src/routes/index.tsx`, bloco `{/* HERO */}`:**
- Remover as 3 camadas atuais (sage translúcido + vinheta creme + gold).
- Substituir por **2 camadas escuras**:
  - Gradiente lateral: `from-black/55 via-black/25 to-black/10` (esquerda → direita), garantindo leitura do texto sem matar a fachada.
  - Gradiente inferior curto: `from-transparent via-transparent to-background` apenas nos últimos 30% para emendar com a próxima seção.
- Ajustar a `<img>`:
  - Trocar `brightness-[0.92] saturate-[0.85]` por `brightness-[0.95] saturate-[1.05] contrast-[1.08]` — devolve nitidez, contraste local e cor às folhas iluminadas.

**Resultado:** foto viva, profundidade noturna preservada, texto branco com leitura confortável.

---

## 2. Tipografia em fundo escuro

Como o overlay agora é escuro, inverter cor do texto do hero:
- `eyebrow`: `text-white/70` + leve `tracking-[0.3em]`.
- `h1`: `text-white`, `leading-[0.98]`, `max-w-3xl` (em vez de `max-w-5xl`) para criar bloco mais compacto e dominante. Reduzir tamanho mobile para evitar quebra ruim.
- Palavra "saúde" e "longevidade": novo verde mais vivo no escuro — `oklch(0.78 0.07 135)` (equivalente claro de #9DB394) para destacar sobre fundo escuro mantendo a paleta sage.
- Descrição: `text-white/80`, `max-w-md`.

**Apenas no hero** — não mexer em texto das outras seções.

---

## 3. Composição assimétrica

Hoje tudo flui em uma única coluna centralizada vertical. Trocar para **2 colunas em desktop**:

```text
┌────────────────────┬────────────────────┐
│  eyebrow           │                    │
│  HEADLINE          │   (foto respira    │
│  descrição         │    deste lado;     │
│  [CTA] [outline]   │    overlay mais    │
│  micro-confiança   │    leve à direita) │
└────────────────────┴────────────────────┘
```

- Container: `grid md:grid-cols-12`, conteúdo em `md:col-span-7`, lado direito vazio (`md:col-span-5`).
- O gradiente lateral já cria a "respiração" da imagem à direita.
- Mobile mantém empilhado.

---

## 4. CTAs dominantes

- **Botão primário "Agendar consulta":**
  - Atualizar `.btn-premium` em `src/styles.css`:
    - `box-shadow: 0 10px 30px -10px oklch(0.45 0.05 135 / 0.5), 0 2px 6px oklch(0 0 0 / 0.15)`
    - `transform: translateY(0)` → hover `translateY(-2px)` com `transition: 250ms ease`
    - Levíssimo `background: linear-gradient(180deg, var(--primary), oklch(0.52 0.05 135))` para dar densidade.
  - Tamanho ligeiramente maior no hero (`text-sm`, padding maior).
- **Botão secundário "Especialidades":**
  - Ajustar `.btn-ghost` para outline mais clean: `border-white/40 text-white/90`, sem fundo, hover `bg-white/10`.
  - Reduzir tracking de `0.22em` → `0.14em`.

---

## 5. Micro-confiança abaixo dos CTAs

Adicionar uma linha sutil logo abaixo dos botões (apenas no hero):

```text
✓ Atendimento multidisciplinar   ✓ Protocolos personalizados   ✓ Equipe especializada
```

- Ícones lineares (lucide `Check` ou `Sparkles`/`Stethoscope`/`Users`), `size 14`, `text-white/70`, tipografia `text-xs tracking-[0.18em] uppercase`.
- Separados por divisores `·` ou pequenos pontos.

---

## 6. Espaçamento vertical

No bloco do hero:
- `pt-44 md:pt-56` (mais respiro do topo).
- `mt-8` headline → descrição.
- `mt-10` descrição → CTAs.
- `mt-12` CTAs → micro-confiança.
- `mt-16` micro-confiança → assinatura inferior ("Clínica boutique · Fortaleza").

---

## 7. Navbar premium (glass real)

Em `src/components/SiteHeader.tsx`:
- Estado **inicial** (topo da página, sobre hero escuro):
  - `bg-black/20 backdrop-blur-md border-b border-white/10`
  - Logo, links e botão em branco/translúcido.
- Estado **scrolled** (sobre conteúdo claro):
  - `bg-white/75 backdrop-blur-xl border-b border-border/60` (estilo atual, refinado).
- Altura: reduzir `py-5` → `py-4`.
- Espaçamento entre links: manter `gap-10`, mas adicionar leve hover com sublinhado animado já existente.
- Logo: filtro condicional — sobre hero escuro, usar versão clara (CSS `brightness-0 invert opacity-90`) ou versão branca da logo; ao scrollar, voltar ao original.

---

## 8. Refino da paleta em `src/styles.css`

Atualizar tokens para os hexes propostos (mantendo OKLCH):
- `--primary` (sage) → equivalente a `#7B8D74`
- `--primary-deep` (novo, para hover/sombra) → `#5F7059`
- `--background` → `#F6F4EF`
- `--muted` (cinza quente) → `#D9D3CA`
- `--foreground` → `#1E1E1C`

Aplicação restrita a tokens — todas as seções herdam automaticamente, sem alterar componentes.

---

## 9. Mobile

- Hero: `min-h-[88svh]` (svh evita pulo com barra de URL iOS).
- Headline `text-[2.3rem]` no mobile, `leading-[1.05]`.
- Overlay no mobile mais escuro: adicionar classe condicional `from-black/70 md:from-black/55`.
- CTAs: empilhar em `flex-col w-full`, primário ocupa `w-full sm:w-auto`.
- Micro-confiança: empilhar em 1 coluna no mobile.

---

## 10. CTA fixo no mobile (opcional, conversão)

Adicionar barra fixa inferior **apenas em mobile**:
- `fixed bottom-0 inset-x-0 z-40 md:hidden`
- `bg-background/95 backdrop-blur border-t border-border`
- Botão "Agendar consulta" ocupando largura total.
- Aparece após scroll de 200px (mesmo padrão do `useEffect` da navbar).

---

## Arquivos afetados

1. `src/routes/index.tsx` — bloco do hero (overlay, grid, cor do texto, micro-confiança, espaçamento).
2. `src/components/SiteHeader.tsx` — navbar dual-state (escura sobre hero, clara após scroll), logo adaptativa.
3. `src/styles.css` — tokens de cor refinados, `.btn-premium` com sombra/hover, `.btn-ghost` outline branco no hero.
4. (Opcional) novo componente `MobileStickyCTA.tsx` para o CTA fixo.

## Não-mudanças (garantia)
- Fontes (Cormorant Garamond + Inter): inalteradas.
- Conteúdo textual: inalterado.
- Ordem e estrutura das seções: inalteradas.
- Logo da marca: mesma arte; só varia o tratamento de cor entre estados da navbar.
