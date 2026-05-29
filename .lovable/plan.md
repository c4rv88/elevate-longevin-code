## Objetivo

A foto da equipe deve ficar contida apenas no lado esquerdo da seção (atrás/ao redor do título e texto). O diagrama de especialidades à direita fica sobre o fundo claro padrão da seção, sem nenhuma foto atrás dele.

## Mudanças em `src/routes/index.tsx` (seção ESPECIALIDADES, linhas ~248–296)

1. **Restringir a camada da foto à metade esquerda da seção**:
   - Trocar `<div className="absolute inset-0">` (foto) por `<div className="absolute inset-y-0 left-0 w-full md:w-[48%] lg:w-[42%]">` para que a foto ocupe apenas a faixa esquerda.
   - Manter `backgroundPosition: "left center"`, `backgroundSize: "cover"`, opacidade ~0.55, dessaturação leve.
   - Aplicar máscara de fade na borda direita para a foto desaparecer suavemente antes de chegar no diagrama:
     `WebkitMaskImage / maskImage: "linear-gradient(90deg, #000 0%, #000 65%, transparent 100%)"`.

2. **Simplificar o véu de legibilidade**:
   - Substituir o gradiente de 4 stops por um gradiente mais simples confinado à esquerda, só para garantir contraste do texto sobre as pessoas: `linear-gradient(90deg, color-mix(in oklab, var(--background) 28%, transparent) 0%, transparent 60%)`.
   - Remover a tonalização verde-oliva global (não precisa mais cobrir o lado direito).

3. **Não alterar** estrutura do grid, textos, título, eyebrow, nem o `<SpecialtiesNetwork />` — ele renderiza normalmente sobre o fundo da seção.

## Resultado

A foto da equipe fica delicadamente recortada à esquerda, dialogando com o título "Áreas que se conversam". O diagrama de especialidades à direita ganha protagonismo total sobre o fundo claro, sem competição visual.