
## Refinamento da seção "Áreas que se conversam"

Reescrever `src/components/SpecialtiesNetwork.tsx` em duas experiências distintas — desktop sofisticado e mobile orbital nativo — invertendo a hierarquia visual: especialidades em primeiro plano, linhas como suporte.

---

### Princípio guia
- **Antes:** 70% linhas / 30% especialidades.
- **Depois:** 20% linhas / 80% especialidades.
- Linhas apenas sugerem conexão; especialidades dominam a atenção.

---

### Desktop (≥ 768px)

**Estrutura visual**
- Mantém layout radial atual (11 nós em círculo + núcleo central).
- Núcleo central ganha leve respiração (pulse muito sutil em loop, ~4s).

**Linhas — redução de 30% e hierarquia**
- Remover conexões "todos → centro" como camada visível default. Centro continua existindo, mas sem 11 raios partindo dele no estado idle.
- Manter apenas pares semânticos (Nutrição↔Endocrino, Cardio↔Geriatria, Psiq↔Psico, etc.).
- Opacidade idle: `0.06–0.08` (quase imperceptível, sugere malha).
- Largura idle: `0.5px`.
- Cor: `--primary` (verde sálvia).

**Hover / focus em uma especialidade**
- Linhas das relações daquela especialidade → `opacity 0.55`, `1.1px`, com cor `--gold` suave.
- Linha daquela especialidade → centro aparece (mesmo destaque) — só nesse momento.
- Demais linhas: `opacity 0.03`.
- Nó ativo: scale `1.08`, borda `--primary` sólida, sombra premium.
- Nós relacionados: borda `--primary` 60%, opacidade 1.
- Nós não-relacionados: `opacity 0.3`.
- Núcleo central: reforça borda em `--gold`.

**Tooltip elegante (substitui painel inferior)**
- Tooltip flutuante ancorado ao nó ativo (posicionado para fora do círculo, com `inset` calculado por quadrante para nunca sair do container).
- Conteúdo: nome (serif, 18px), 1 linha descritiva curta, lista compacta de "Integra com: X · Y · Z" em caps espaçado dourado.
- Card off-white com sombra suave, borda hairline, radius 16px, animação `fade-in + translate-y-1` em 200ms.
- Remover o painel inferior grande atual (deixa o diagrama respirar).

**Estado idle (sem hover)**
- Substituir o painel por uma legenda discreta abaixo do diagrama: "Passe o mouse em uma especialidade para ver suas conexões."

---

### Mobile (< 768px) — experiência nativa

Inspiração: Apple Health, Apple Vision Pro, Calm, Headspace.

**Bloco 1 — Cabeçalho (já existe na coluna esquerda)**
- Mantém kicker ESPECIALIDADES, título, parágrafo, CTA Agendar Consulta.
- No mobile esses elementos já empilham acima do componente.

**Bloco 2 — Núcleo central fixo**
```text
        ╭───────────╮
        │   LOGO    │
        │ MEDICINA  │
        │ INTEGRADA │
        ╰───────────╯
   "Toque em uma especialidade
    para entender como ela se
    conecta ao seu cuidado."
```
- Círculo ~140px com logo + caps "MEDICINA INTEGRADA".
- Microcopy abaixo (foreground/70, sm).

**Bloco 3 — Orbital horizontal**
- Linha de "órbita" sutil (arco SVG ou borda inferior tracejada) atravessando a tela.
- 4 nós-especialidade visíveis por vez, posicionados ao longo da órbita (centro mais alto, laterais mais baixos — sensação de profundidade).
- Container scroll horizontal nativo (`overflow-x-auto snap-x snap-mandatory`).
- Ao arrastar, os nós "giram" — efeito conseguido via translateY proporcional à posição relativa ao centro do viewport (cálculo em `onScroll`, sem libs).
- Cada nó: círculo 84px com ícone + nome serif curto abaixo.
- Snap centraliza um nó por vez; nó central recebe scale 1.1 e borda `--primary`.

**Ao tocar em uma especialidade**
- Abre `Drawer` (componente shadcn `drawer.tsx` já disponível) deslizando de baixo.
- Conteúdo do drawer:
  - Ícone grande + nome serif 24px.
  - Linha "Na Longevin, [Especialidade] atua de forma integrada com:"
  - Lista vertical das relacionadas com bullet `·` dourado.
  - Bloco "Objetivo:" com 1–2 linhas finais.
  - Botão `Conhecer especialidade →` (btn-ghost, âncora `#equipe`).
- Drawer com handle visível, fundo `--card`, radius topo 24px.

**Por que Drawer e não expandir inline:** preserva o "orbital" sempre visível ao fechar, mantém fluidez tipo app nativo, evita reflows verticais.

---

### Dados — ajustes em `SPECIALTIES`

Cada item ganha:
- `short` (1 frase ~10 palavras, para tooltip desktop e card mobile).
- `description` atual permanece (drawer mobile).
- `related` já existe.

Exemplo:
```ts
{
  id: "cardiologia",
  name: "Cardiologia",
  Icon: HeartPulse,
  short: "Prevenção e acompanhamento cardiovascular.",
  description: "Na Longevin, a Cardiologia atua de forma integrada para promover uma visão completa da saúde cardiovascular.",
  related: ["endocrinologia", "geriatria", "nutricao", "clinica"],
}
```

Revisar `related` para garantir reciprocidade (se A lista B, B lista A) — hoje há assimetrias (ex: Nutrição não lista Cardiologia de volta consistentemente). Padronizar.

---

### Implementação técnica

**Arquivo único reescrito:** `src/components/SpecialtiesNetwork.tsx`

Estrutura:
```tsx
export function SpecialtiesNetwork() {
  const isMobile = useIsMobile(); // hook existente, breakpoint 768
  return isMobile ? <MobileOrbital /> : <DesktopDiagram />;
}
```

**DesktopDiagram**
- Reusa lógica de posicionamento atual.
- Remove rendering das 11 linhas centrais no estado idle (renderiza só quando `active`).
- Tooltip: novo subcomponente `<NodeTooltip spec quadrant />` posicionado absolutamente em relação ao container do diagrama; quadrante calculado a partir do ângulo (`tl|tr|bl|br`) para ancorar lados opostos.
- Animação de entrada (IntersectionObserver) mantida.

**MobileOrbital**
- Layout: núcleo fixo no topo (sticky dentro do bloco), microcopy.
- Container horizontal com items distribuídos; cálculo de `translateY` via `useRef` + `onScroll` (rAF throttled) lendo `boundingClientRect` de cada nó vs centro do viewport — sem libs.
- Estado `selected: Specialty | null` controla abertura do `Drawer` (`@/components/ui/drawer`).
- Drawer já está disponível (vide `src/components/ui/drawer.tsx`).

**Tokens / CSS**
- Nenhum token novo obrigatório. Reusa `--primary`, `--gold`, `--card`, `--border`, `--background`.
- Pode adicionar utility `.orbit-arc` em `styles.css` se SVG inline não bastar.

**Acessibilidade**
- Desktop: nós permanecem `<button aria-pressed>`; tooltip com `role="tooltip"` e `aria-describedby` ligado ao nó ativo.
- Mobile: drawer já trata foco/escape; cards no carrossel são `<button>` com `aria-label`.
- Carrossel mobile navegável por teclado (foco move scroll via `scrollIntoView`).

**Sem mudanças em**
- `src/routes/index.tsx` (estrutura de 2 colunas mantida).
- Outras seções.
- Tokens de cor / tipografia globais.

---

### Fora de escopo
- Não criar página individual de especialidade (botão "Conhecer" continua apontando para `#equipe`).
- Não adicionar libs (sem framer-motion, sem GSAP) — animações via CSS transitions + rAF.
- Não alterar cabeçalho/CTA da coluna esquerda.
