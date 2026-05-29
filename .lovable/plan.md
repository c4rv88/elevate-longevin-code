Plano:

1. **Centralizar o miolo mobile da seção Especialidades**
   - Em `SpecialtiesNetwork.tsx` (MobileTimeline), envolver a árvore + textos + timeline em um container `max-w-[100vw]` com `mx-auto` e `text-center`, e remover/ajustar regras que estão deixando o conteúdo deslocado (a timeline com `max-w-md w-full` deve ficar `mx-auto`; o núcleo central deve ficar centralizado mesmo dentro do flex coluna). Garantir que `overflow-x: clip` da página continue ativo.

2. **Trocar o CTA da seção Especialidades pelo botão na hero**
   - Em `src/routes/index.tsx`:
     - Remover o bloco `<a href="https://agende.longevin.com.br/" ... className="btn-premium">Agendar consulta</a>` da seção `#especialidades` (junto com o `<div className="mt-10">` que o envolve).
     - Adicionar de volta esse mesmo botão na hero, ao lado do botão "Especialidades", mantendo a classe `btn-premium`, `target="_blank"`, `rel="noopener noreferrer"`, texto "Agendar consulta →" e o mesmo wrapper flex já existente.

3. **Carrossel dos especialistas**
   - Substituir o grid atual de `doctors` em `#equipe` por um carrossel horizontal usando o componente shadcn `Carousel` (já parte do template). Cada slide mostra a foto (mesmo aspect 4/5, rounded-2xl), especialidade (eyebrow gold), nome (font-serif) e RQE. No mobile mostra 1.2 slides, no `sm` 2 slides, no `lg` 3 slides, com botões de prev/next e indicador de dots discretos. Manter a estética atual (sem cores novas, usando tokens do design system).
   - Importar `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious` de `@/components/ui/carousel`. Se o pacote `embla-carousel-react` não estiver instalado, instalar via `bun add`.

4. **Validação**
   - Recarregar o preview no viewport mobile (390×808) e confirmar que (a) a árvore e os textos estão centralizados, (b) o botão "Agendar consulta" aparece na hero e não em Especialidades, (c) o carrossel de especialistas funciona com setas/swipe.