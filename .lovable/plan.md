## Objetivo
Exibir os posts do Instagram na **proporção nativa do Instagram** (vertical 4:5), sem cortar imagens, e reduzir o tamanho dos cards no grid para que continuem equilibrados na seção.

## Mudanças em `src/routes/index.tsx` (seção "Acompanhe no Instagram")

1. **Proporção dos cards**: trocar `aspect-square` por `aspect-[4/5]` em cada card — é o formato vertical padrão de feed do Instagram, evita o crop quadrado atual.
2. **Sem corte de imagem**: trocar `object-cover` por `object-contain` e adicionar um fundo neutro (`bg-muted`) para preencher possíveis bordas caso algum post seja quadrado ou em outra proporção. Assim nenhuma imagem é cortada.
3. **Reduzir tamanho no desktop**: trocar o grid de `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` para `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` mantido, mas envolvendo o grid em um container `max-w-5xl mx-auto` para que os cards fiquem proporcionalmente menores e a seção respire mais (alinhado ao restante do site).
4. **Hover overlay**: mantém igual (ícone Instagram aparecendo on hover).

## Sem outras alterações
- Botão "Acompanhe no Instagram", cabeçalho da seção, fundo e tipografia ficam iguais.
- Nenhum outro arquivo é modificado.
- Nenhum thumbnail é re-baixado.
