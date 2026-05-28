## Objetivo
Aprimorar o overlay do hero para ganhar **nitidez e legibilidade** sem perder a suavidade premium, e harmonizar os tons com a paleta da marca (sage + creme + dourado) — evitando o cinza/oliva esverdeado opaco atual.

## Diagnóstico
Hoje o hero usa dois gradientes empilhados em `background` (creme):
- vertical `30% → 55% → 100%`
- horizontal `70% → 10% → 0%`

Problemas:
1. O creme puro sobreposto a uma foto noturna gera um tom **acinzentado/oliva sujo** no centro.
2. Falta um "vinheta" lateral/inferior — o texto compete com a copa da árvore iluminada à direita.
3. Subtítulo em `text-foreground/70` fica fraco sobre área média.

## Proposta de ajuste (apenas no bloco de overlay do hero em `src/routes/index.tsx`)

### 1. Tratar a foto na base
- Aplicar `filter` sutil na `<img>`: `brightness-[0.92] saturate-[0.85]` para suavizar pontos quentes da iluminação e neutralizar o azul do céu noturno, mantendo a leitura da fachada.

### 2. Reestruturar os gradientes (3 camadas)
- **Camada 1 — Base de profundidade (sage escuro translúcido):** gradiente vertical usando `primary` (sage) em vez de `background`, para que o overlay se misture organicamente à vegetação:
  - `from-[oklch(0.25_0.04_135)/0.55] via-[oklch(0.35_0.04_135)/0.25] to-[oklch(0.985_0.008_90)/0.95]`
- **Camada 2 — Vinheta lateral esquerda (legibilidade do texto):** gradiente horizontal mais firme à esquerda, dissipando ao centro:
  - `from-background/85 via-background/40 to-transparent` apenas até ~60% da largura
- **Camada 3 — Veil dourado quase imperceptível:** `bg-gold/[0.04]` em toda a área, dando o "warm glow" boutique.

### 3. Reforçar contraste tipográfico sem peso
- Subtítulo: `text-foreground/85` (de 70 → 85).
- Eyebrow: manter, mas adicionar pequeno `drop-shadow` quase invisível para destacar do fundo.

### 4. Fade suave para a próxima seção
- Adicionar uma faixa inferior `h-32 bg-gradient-to-b from-transparent to-background` para emendar com a seção "Proposta" sem corte abrupto.

## Resultado esperado
- Texto **nítido e confortável de ler**, sem peso visual.
- A foto continua presente e identificável (árvore iluminada + fachada à direita).
- Tons se integram à paleta sage/creme/dourado da marca em vez do cinza atual.
- Sensação geral: **suave, arejada, premium boutique** — não pesada nem "fosca".

## Arquivo afetado
- `src/routes/index.tsx` (apenas o bloco `{/* HERO */}`, ~6 linhas de gradientes + 1 ajuste de classe no subtítulo).
