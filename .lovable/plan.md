## Objetivo

Hoje a foto da equipe na seção "Áreas que se conversam" se espalha por toda a seção (full-width, 70–78% da largura), atravessando inclusive a coluna do título e texto à esquerda. O usuário quer que a imagem ocupe exatamente o mesmo enquadramento do bloco do diagrama de especialidades (a coluna `lg:col-span-3` à direita), funcionando como um "fundo" coeso daquele card.

## Mudanças em `src/routes/index.tsx` (seção ESPECIALIDADES, linhas ~247–295)

1. **Remover a camada absoluta full-section** (`<div aria-hidden className="pointer-events-none absolute inset-0 z-0">` com `inset-0` e `md:w-[78%]`).
2. **Mover a foto para dentro da coluna do diagrama** (`<div className="lg:col-span-3 ...">`):
   - Envolver o `<SpecialtiesNetwork />` em um wrapper `relative` com `rounded-2xl overflow-hidden`.
   - Adicionar, atrás do diagrama, um `<div absolute inset-0>` com a `backgroundImage` da foto recortada (`background-size: cover`, `background-position: center`).
   - Manter opacidade (~0.55–0.65) e leve dessaturação para preservar legibilidade do diagrama.
   - Aplicar um gradiente sutil por cima (do `--background` na borda esquerda → transparente à direita) para integrar visualmente com a coluna de texto.
3. **Ajustar paddings** do wrapper para que o diagrama mantenha respiro (`p-6 md:p-10`).
4. **Não alterar** o texto, o eyebrow, o título "Áreas que se conversam" nem o componente `SpecialtiesNetwork` em si.

## Resultado

A fotografia da equipe vira o "tapete" visual do card do diagrama de especialidades, com exatamente as mesmas dimensões e cantos arredondados desse bloco — sem invadir a coluna do título à esquerda e sem se espalhar pela seção inteira.