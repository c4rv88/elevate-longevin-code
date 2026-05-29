## Reestruturação da seção "Áreas que se conversam"

Transformar a seção atual (grid de cards) em um **diagrama interativo de Medicina Integrada** em layout de duas colunas, mantendo a identidade Longevin (verde sálvia, serif, off-white) e elevando a percepção premium.

---

### Layout

```text
┌─────────────────────────┬────────────────────────────────┐
│  COLUNA ESQUERDA (40%)  │   COLUNA DIREITA (60%)         │
│                         │                                │
│  ESPECIALIDADES         │        ◯ Endocrinologia        │
│                         │   ◯ Derm        Cardiologia ◯  │
│  Áreas que se           │ ◯ Psiq    ╲ | ╱    Neuro ◯     │
│  conversam.             │ ◯ Psico ── [LOGO] ── Reumat ◯  │
│                         │ ◯ Nutri   ╱ | ╲    Oftalmo ◯   │
│  Texto institucional…   │   ◯ Clínica   Geriatria ◯      │
│                         │                                │
│  [Agendar Consulta →]   │  (painel flutuante ao hover)   │
└─────────────────────────┴────────────────────────────────┘
```

---

### Coluna esquerda
- Kicker `ESPECIALIDADES`
- H2 serif `Áreas que se conversam.` (mantém italic em "conversam")
- Parágrafo institucional (texto fornecido)
- CTA `Agendar Consulta` (botão `btn-premium` existente, link `https://agende.longevin.com.br/`)
- Sticky no desktop para acompanhar a leitura do diagrama

### Coluna direita — diagrama
- **Núcleo central**: círculo grande off-white com borda dourada sutil, logo Longevin (reaproveitar do `SiteHeader`) + texto `MEDICINA INTEGRADA` em caps espaçado.
- **11 especialidades** distribuídas em círculo ao redor (ângulos igualmente espaçados, raio ~280px):
  Clínica Médica, Geriatria, Cardiologia, Endocrinologia, Dermatologia, Neurologia, Nutrição, Oftalmologia, Reumatologia, Psiquiatria, Psicologia.
- Cada nó: círculo ~96px, ícone lucide minimalista no topo, nome em serif abaixo, borda `1px` em `rgba(125,140,114,0.25)`, fundo off-white.
- **Conexões SVG** (linhas finas `rgba(125,140,114,0.15)`):
  - Cada especialidade → núcleo
  - Pares relacionados: Nutrição↔Endocrino, Cardio↔Geriatria, Psiq↔Psico, Neuro↔Psiq, Endocrino↔Cardio, Reumato↔Geriatria, Derma↔Reumato, Oftalmo↔Neuro
  - Clínica Médica conecta a todas

### Interações
- Hover em uma especialidade:
  - Nó cresce levemente (`scale-105`) e ganha borda em `--primary`
  - Linhas conectadas a ela ficam opacas (`rgba(125,140,114,0.6)`); demais linhas e nós suavizam para `opacity-30`
  - Núcleo central reforça borda
  - **Painel lateral flutuante** (posicionado à direita do diagrama em desktop, abaixo em tablet) mostra: nome (serif), descrição curta (~2 linhas), botão `Conhecer especialidade →`
- Estado default sem hover: painel exibe uma descrição "introdução" do conceito de Medicina Integrada
- Clique no nó = mesmo efeito que hover (pin), permite acessar em touch

### Animações de entrada (uma vez, ao entrar no viewport via IntersectionObserver)
- Linhas SVG: `stroke-dasharray` animado (desenho progressivo, ~1.2s, stagger)
- Nós: fade-in + scale de 0.92 → 1, stagger ~80ms por especialidade
- Núcleo central: fade-in primeiro
- Transições de hover: 300-500ms ease-out

### Responsivo
- **Desktop ≥1024px**: diagrama completo conforme acima
- **Tablet 640-1024px**: diagrama reduzido (raio ~210px, nós ~80px), painel vira card abaixo do diagrama
- **Mobile <640px**: substitui diagrama por **carrossel horizontal** (snap) — núcleo central no topo como bloco fixo + cards de especialidades em scroll horizontal. Sem SVG de conexões.

### Conteúdo das descrições (curtas, 1-2 linhas cada)
Adicionar para cada especialidade um objeto `{ name, Icon, description }`. Exemplos:
- Cardiologia — "Avaliação cardiovascular, prevenção e acompanhamento contínuo, integrados às demais áreas para uma visão completa da saúde."
- Endocrinologia — "Cuidado dos sistemas hormonal e metabólico em diálogo com nutrição, cardiologia e geriatria."
- (etc. para as 11)

---

### Implementação técnica

**Arquivos:**
- Novo: `src/components/SpecialtiesNetwork.tsx` — componente isolado contendo:
  - Dados das 11 especialidades (nome, ícone, descrição, ângulo, pares relacionados)
  - SVG absoluto com `<line>` para conexões
  - Nós posicionados via `position: absolute` calculados por trigonometria (`Math.cos/sin` do ângulo × raio)
  - Estado `activeIndex` (hover/click) controla classes condicionais nos nós/linhas e o conteúdo do painel
  - IntersectionObserver para disparar animação de entrada uma única vez
  - Hook `useMediaQuery` (ou checagem `window.matchMedia`) para alternar entre diagrama e carrossel mobile

- Editado: `src/routes/index.tsx`
  - Substituir o bloco `<section id="especialidades">` atual (grid `<ul>` de cards) por:
    ```tsx
    <section id="especialidades" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid gap-16 lg:grid-cols-5 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-32">
          {/* kicker + H2 + parágrafo + CTA */}
        </div>
        <div className="lg:col-span-3">
          <SpecialtiesNetwork />
        </div>
      </div>
    </section>
    ```
  - Remover o array `specialties` antigo e o CTA central duplicado (já estará na coluna esquerda)
  - Remover imports de ícones que migrarão para `SpecialtiesNetwork.tsx`

**Tokens CSS** (em `src/styles.css`, se necessário):
- Adicionar `--line-soft: oklch(...)` mapeando para `rgba(125,140,114,0.15)` em equivalente oklch
- Reaproveitar `--primary`, `--gold`, `--background` existentes

**Animação CSS** para o desenho das linhas:
```css
@keyframes draw-line {
  from { stroke-dashoffset: var(--len); }
  to   { stroke-dashoffset: 0; }
}
```

**Acessibilidade:**
- Cada nó é `<button>` com `aria-label`, `aria-pressed` quando ativo
- Painel lateral com `role="status"` e `aria-live="polite"`
- Carrossel mobile com scroll nativo + snap (sem JS de gesture)

---

### Fora de escopo
- Não altera nenhuma outra seção da home
- Não cria página de detalhe da especialidade (botão "Conhecer especialidade" aponta provisoriamente para `#equipe` ou âncora; confirmar destino se houver preferência)
- Mantém paleta, tipografia e botões existentes — nenhum token de cor novo além do `--line-soft` opcional
