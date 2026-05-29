## Objetivo

1. Deslocar o diagrama de especialidades ainda mais para a direita da seção.
2. Recortar a foto para focar nas duas pessoas conversando na lateral esquerda.

## Mudanças em `src/routes/index.tsx` (seção ESPECIALIDADES)

1. **Reposicionar o diagrama mais à direita**: no grid `lg:grid-cols-5`, mudar o `<div className="lg:col-span-3">` que envolve `<SpecialtiesNetwork />` para `lg:col-span-2 lg:col-start-4` (ou `lg:justify-self-end`), encolhendo o card e empurrando-o para a borda direita. Manter `min-w-0 w-full max-w-md lg:max-w-none` para responsivo.
2. **Recortar a foto nas duas pessoas à esquerda**:
   - Trocar `backgroundPosition: "left center"` por algo como `"15% 35%"` para enquadrar nos rostos das duas pessoas.
   - Aumentar levemente o zoom: usar `backgroundSize: "cover"` em um container mais estreito (`md:w-[42%] lg:w-[36%]`) para o crop ficar mais íntimo.
   - Manter máscara de fade na borda direita.
3. **Não alterar** texto, eyebrow, título ou componente `SpecialtiesNetwork`.

## Detalhe técnico

Como a coluna de texto à esquerda (`lg:col-span-2 lg:sticky`) já ocupa 2/5, e o diagrama vai para `lg:col-span-2 lg:col-start-4`, a coluna central (col 3) vira respiro vazio entre texto e diagrama, criando a sensação de empurrar o diagrama para a lateral direita.