
## Refinar experiência mobile de "Áreas que se conversam"

Reescrever apenas o subcomponente `MobileOrbital` de `src/components/SpecialtiesNetwork.tsx` (renomeado para `MobileTimeline`). Desktop, dados (`SPECIALTIES`, `PAIRS`) e `src/routes/index.tsx` permanecem intactos. O `Drawer` (bottom sheet) existente é preservado, apenas refinado visualmente.

---

### 1. Núcleo central (compacto)

- Reduzir altura: círculo 96px (era 140px), `LongevinMark` 28px.
- Caps "MEDICINA INTEGRADA" 10px/0.28em, logo abaixo do círculo (não dentro), para economizar vertical.
- Microcopy atualizada (1 linha, foreground/65, text-sm):
  "Deslize pelas especialidades e descubra como nossa equipe atua de forma integrada para cuidar da sua saúde."
- Espaçamento total do bloco ~180px (era ~280px).

---

### 2. Timeline horizontal interativa (substitui o orbital)

**Estrutura visual**
```text
                    [ ATIVA ]
   ○────○────○────●────○────○────○
   Clínica  Cardio  Nutri  Neuro
```

- Linha horizontal contínua (`1px`, `var(--primary)` com opacidade `0.18`) atravessando o container, alinhada ao centro vertical dos nós.
- Sobre a linha, um segmento "preenchido" curto (`var(--gold)`, `2px`, ~80px) centralizado no item ativo — sensação de "progresso" / jornada.
- Cada nó é um `<button>` posicionado num scroller horizontal.

**Comportamento de scroll**
- Container: `overflow-x-auto snap-x snap-mandatory scroll-smooth`, padding lateral = `50vw - itemWidth/2` (primeiro e último item alcançam o centro).
- Cada item: `snap-center`.
- Detecção do item central via `requestAnimationFrame` no `onScroll` (já existe o padrão no código atual), atualiza `centerId` em estado.

**Item ativo (centralizado)**
- Círculo 72px, ícone 22px verde institucional (`var(--primary)`), borda sólida `var(--primary)`.
- Sombra: `0 18px 40px -16px color-mix(in oklab, var(--primary) 65%, transparent)`.
- `scale(1)`, `translateY(-6px)` (leve elevação magnética).
- Label nome serif 13px abaixo, foreground/90.

**Itens inativos**
- Círculo 48px, ícone 16px, borda `color-mix(in oklab, var(--primary) 25%, transparent)`.
- `scale(0.85)`, opacidade interpolada entre `0.4` (extremos) e `0.9` (próximos ao centro).
- Label nome 11px, foreground/55.
- Transição: `transform 320ms cubic-bezier(0.2,0.7,0.2,1)`, `opacity 280ms`.

**Preview ao vivo (sem abrir o card)**
Logo abaixo da timeline, um bloco discreto que reflete o item central em tempo real:
- Ícone pequeno + nome serif 18px (linha 1).
- `short` (frase curta já existente em `SPECIALTIES`) em foreground/65, text-sm (linha 2).
- Hint "Toque para ver detalhes →" em caps 10px dourado.
- Bloco com `key={centerId}` para reanimar com `animate-[fade-in_220ms_ease-out]` a cada troca.

---

### 3. Bottom sheet — manter, refinar

Continua usando `Drawer` de `@/components/ui/drawer.tsx` (vaul). Refinamentos:

- Altura: `h-[75vh]` (era auto).
- Overlay: `bg-black/40 backdrop-blur-sm` (sobrescrever `DrawerOverlay` className via prop — vaul aceita).
- `DrawerContent`: `rounded-t-[28px]`, borda hairline `color-mix(in oklab, var(--primary) 18%, transparent)`, sombra superior premium.
- Handle (já renderizado pelo componente) mantido.
- Botão `X` no canto superior direito (absolute, `DrawerClose` com ícone `lucide-react X`, `h-9 w-9 rounded-full border`).
- Swipe-down para fechar já é nativo do vaul — manter.
- Animação: vaul fornece spring por padrão; não adicionar lib.

**Conteúdo do drawer**
```text
[Ícone 40px verde, círculo com glow]

Cardiologia                     (serif 26px)
Prevenção e acompanhamento...   (foreground/70, sm)

INTEGRA COM                     (caps 10px dourado)
[Geriatria] [Nutrição] [Clínica Médica] [Endocrinologia]
                                (tags pill)

OBJETIVO                        (caps 10px dourado)
Cuidar da saúde cardiovascular de forma preventiva,
em diálogo com outras áreas para uma visão integral.

[ Conhecer especialidade → ]    (btn outline full-width, âncora #equipe)
```

**Tags de especialidades conectadas (novo)**
- Substituir lista textual atual por tags:
- `inline-flex items-center rounded-full px-3 py-1.5 text-xs`
- `bg-[color-mix(in_oklab,var(--primary)_8%,transparent)]`
- `border border-[color-mix(in_oklab,var(--primary)_22%,transparent)]`
- `text-foreground/80 font-serif`
- Container `flex flex-wrap gap-2`.

**Bloco "Objetivo"**
- Reaproveita `description` existente. Nenhum novo campo necessário.

---

### 4. Interação timeline ↔ card

- Swipe na timeline: atualiza apenas o preview ao vivo (sem abrir drawer).
- Tap em qualquer nó (ativo ou não): primeiro centraliza com `scrollIntoView({ behavior: "smooth", inline: "center" })`, depois (`setTimeout 200ms`) abre o drawer com aquele item.
- Tap no preview ao vivo (área inteira clicável): abre drawer do item central.

---

### 5. Implementação técnica

**Arquivo:** `src/components/SpecialtiesNetwork.tsx`

Mudanças cirúrgicas:
1. Renomear `MobileOrbital` → `MobileTimeline`; atualizar referência em `SpecialtiesNetwork()`.
2. Substituir todo o corpo da função pelo layout descrito (núcleo compacto + timeline + preview).
3. Reusar `Drawer/DrawerContent/DrawerClose` já importados. Passar `className` no `DrawerOverlay` via prop spread em uma versão local OU adicionar uma instância customizada — solução escolhida: criar `<Drawer>` com `<DrawerContent className="h-[75vh] rounded-t-[28px] ...">` e aceitar overlay padrão (preto/80 atual). Se quiser blur, sobrescrever via custom inline `<DrawerOverlay className="bg-black/40 backdrop-blur-sm" />` importado de vaul — mais simples: aceitar overlay padrão; o efeito premium vem do conteúdo. **Decisão:** manter overlay padrão para não alterar `ui/drawer.tsx`.
4. Sem novos imports além de `useEffect, useMemo, useRef, useState` (já presentes).

**Sem mudanças em**
- Desktop (`DesktopDiagram`, `NodeTooltip`).
- Array `SPECIALTIES` (`short`, `description`, `related` já cobrem o conteúdo).
- `src/routes/index.tsx`.
- Tokens globais (`styles.css`).
- `ui/drawer.tsx`.

**Acessibilidade**
- Nós da timeline: `<button aria-label={name} aria-current={isCenter}>`.
- Preview: `<button>` com `aria-label="Ver detalhes de {nome}"`.
- Drawer: foco/escape nativos do vaul.

---

### Fora de escopo
- Página individual de especialidade (botão segue âncora `#equipe`).
- Bibliotecas externas (motion, gsap).
- Alterações no desktop ou na coluna esquerda.
- Alteração do overlay global do drawer (`ui/drawer.tsx`).
