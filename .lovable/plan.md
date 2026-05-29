## Alterações em `src/routes/index.tsx`

### 1. Remover 3 médicos do array `doctors` (linhas 40–50)
- Dra. Emanuelle Albuquerque (Psicologia)
- Dr. Gerber Caraciolo (Oftalmologia)
- Dra. Tayná Milfont (Endocrinologia)

Restarão 6 médicos: Karlos Jennysson, Thayane Furtado, Itaquê Figueiredo, Igor Brito, Mayanne Lucy, Alexia Carneiro.

### 2. Diminuir tamanho dos cards do carrossel (linha 295)
Aumentar a quantidade de cards visíveis por viewport, deixando cada card menor:
- Antes: `basis-[82%] sm:basis-1/2 lg:basis-1/3` (1 / 2 / 3 cards)
- Depois: `basis-[70%] sm:basis-1/3 lg:basis-1/4 xl:basis-1/5` (1 / 3 / 4 / 5 cards)

Também reduzir tipografia do nome (linha 309) de `text-2xl` para `text-xl` para acompanhar o card menor.

Nenhuma outra mudança.