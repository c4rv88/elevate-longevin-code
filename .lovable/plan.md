## Objetivo

A foto da equipe deve ocupar toda a largura da seção "Áreas que se conversam" (não só o card do diagrama). As pessoas conversando aparecem à esquerda (atrás do título/texto) e o diagrama de especialidades se posiciona sobre a área mais "limpa" da fotografia, à direita.

## Mudanças em `src/routes/index.tsx` (seção ESPECIALIDADES)

1. **Desfazer o recorte dentro do card do diagrama**: remover o wrapper `relative rounded-2xl overflow-hidden p-6 md:p-10` em volta de `<SpecialtiesNetwork />` e as duas camadas (foto + gradiente) que adicionei nele. A coluna volta a ser apenas `<SpecialtiesNetwork />` dentro de `lg:col-span-3`.

2. **Reintroduzir a foto como background da seção inteira**, dentro do `<section id="especialidades">`:
   - `<div aria-hidden className="pointer-events-none absolute inset-0 z-0">` com:
     - `backgroundImage: url(areasEquipeImg)`
     - `backgroundSize: cover`
     - `backgroundPosition: left center` (mantém as pessoas visíveis à esquerda; a área mais "livre" da foto fica à direita, onde o diagrama será sobreposto)
     - `opacity: ~0.55`, leve dessaturação para tom institucional
   - Gradiente por cima para garantir legibilidade:
     - À esquerda: véu suave do `--background` (~25–35%) para o texto ficar legível sobre as pessoas
     - À direita: véu um pouco mais forte do `--background` (~40–55%) na área onde o diagrama será desenhado, para dar respiro ao SVG
     - Tonalização verde-oliva sutil global

3. **Manter** `relative z-10` no grid de conteúdo e nas duas colunas, para que título, texto e diagrama fiquem sempre acima da foto.

4. **Não alterar** textos, eyebrow, título "Áreas que se conversam" nem o componente `SpecialtiesNetwork`.

## Resultado

Uma única fotografia da equipe atravessa toda a largura da seção. As pessoas ficam ancoradas à esquerda, dialogando visualmente com o título "Áreas que se conversam", e o diagrama de especialidades pousa sobre a porção direita mais limpa da foto — mantendo o minimalismo Longevin.