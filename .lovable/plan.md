## Objetivo

Refinar visualmente o `DesktopDiagram` em `src/components/SpecialtiesNetwork.tsx` para que o núcleo Longevin se torne o protagonista óbvio, com órbita perfeitamente equilibrada, conexões discretas e animações elegantes. Escopo: apenas o diagrama desktop — mobile/timeline e demais seções ficam intocados.

## Núcleo central

- Aumentar o círculo central de 88px para 200px (≈+125%, dentro do espírito "40–60% maior" considerando que o limite atual estava subdimensionado relativo aos nós).
- Reforçar protagonismo:
  - Borda dupla refinada usando `var(--primary)` (verde institucional) a ~55% opacidade.
  - Glow externo suave em camadas (dois `box-shadow` empilhados: difusão larga em `--primary` 18% + halo dourado interno sutil).
  - Animação `corepulse` ajustada para respirar o glow externo, não a borda.
- Conteúdo interno reorganizado verticalmente com respiro:
  - Logo árvore ocupando ~46% da área interna (≈92px).
  - Abaixo: bloco "MEDICINA / INTEGRADA" em duas linhas, font-serif, tracking amplo (`0.32em`), `text-foreground/70`, com micro-divisor dourado de 16px entre logo e texto.
- z-index do núcleo acima das linhas, mas abaixo dos tooltips.

## Órbita e nós

- Manter as 10 especialidades distribuídas em ângulos exatamente iguais (já é o caso). Aumentar o raio de 240 para 250 para dar mais respiro ao núcleo maior e evitar sobreposição visual.
- Padronizar 100% os nós:
  - Tamanho fixo 92×92 (era 88), todos iguais.
  - Borda 1px `color-mix(--primary 28%, transparent)` uniforme em estado neutro.
  - Ícone `h-7 w-7` com `strokeWidth={1.25}` (já está) — manter.
  - Label `font-serif text-[11px]` (já está) — manter.
- Garantir mesmo `box-shadow` base em todos no estado neutro.

## Linhas de conexão

Reestruturar para reduzir ruído cruzado:

- Remover renderização do conjunto completo de `PAIRS` por padrão.
- Estado neutro: desenhar apenas as 10 raios do centro → cada especialidade, com `stroke="var(--primary)"`, opacidade 0.10, `strokeWidth=0.6`.
- Conexões entre especialidades relacionadas (`PAIRS`) só aparecem quando há `activeSpec` e somente as que tocam o nó ativo, com opacidade 0.45 e cor `var(--gold)`.
- Resultado: composição limpa em repouso (parece uma órbita radial), e contexto revelado no hover.

## Interação (hover)

- Ao entrar no nó:
  - Nó: scale 1.08, borda `var(--primary)` 100%, shadow reforçada.
  - Raio centro→nó: opacidade 0.7, `--gold`, `strokeWidth=1.2`.
  - Conexões relacionadas: visíveis (ver acima).
  - Núcleo central: borda passa para `var(--gold)` 70% e ganha um anel externo sutil (pulse mais intenso) para reforçar a relação centro↔especialidade.
  - Demais nós: opacidade 0.35 (já existe lógica `dimmed`) — manter.
- Saída: tudo retorna suavemente via transições já presentes (300–500ms ease).

## Animações de entrada (mantendo o gatilho `IntersectionObserver`)

Sequência orquestrada por `transitionDelay`:

1. 0ms — núcleo central faz fade+scale (de 0.9 → 1) em 700ms.
2. 350ms — raios centro→nós são "desenhados" via `stroke-dashoffset` indo de comprimento total a 0 em 700ms, escalonados 40ms entre si.
3. 600ms — nós aparecem em sequência (delay `600 + i*70ms`), fade+scale como hoje.

Usar `pathLength` ou cálculo de comprimento por `Math.hypot(dx,dy)` em cada linha para o efeito de desenho.

## Tipografia auxiliar

- Substituir o texto cinza inferior "Passe o mouse em uma especialidade para ver suas conexões" mantendo estilo atual (não pedido para mudar).

## Arquivos

Editado: `src/components/SpecialtiesNetwork.tsx` (apenas `DesktopDiagram` + keyframes locais). Nenhum outro arquivo afetado.
