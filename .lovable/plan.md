## Ajustes no topo de `/a-longevin`

### Problemas
- Hero muito branco/lavado, contraste fraco.
- Header sobreposto (texto/logo brancos) fica ilegível sobre fundo claro.
- Título "Um ecossistema em saúde, além da consulta" pequeno demais para um hero.

### Solução em `src/routes/a-longevin.tsx`

1. **Trocar fundo do hero por tom escuro sage** (mesma família do `--primary`), criando contraste com o header branco e dando peso institucional:
   - Substituir o gradiente claro por um fundo escuro (`bg-foreground` ou um sage escuro próximo de `oklch(0.32 0.04 135)`) com um leve gradiente para a cor de fundo cremosa antes da próxima seção.
   - Adicionar uma textura/imagem sutil opcional? Não — manter sólido para ficar elegante.

2. **Inverter cores do conteúdo do hero** para tons claros:
   - Eyebrow "A Longevin" em `text-gold` (mantém).
   - Breadcrumb em `text-background/60` / `text-background/85`.
   - Eyebrow "Nossa proposta" em `text-background/60` com tracking maior.
   - Título em `text-background`, itálico em `text-gold`.
   - Parágrafos em `text-background/75`.
   - Borda da imagem em `border-background/15` (mais suave no escuro).

3. **Aumentar título do hero**:
   - De `text-4xl md:text-6xl` para `text-5xl md:text-7xl lg:text-[5.5rem]` com `leading-[1.0]`.

4. **Padding inferior maior** para o hero "respirar" antes da próxima seção (`pb-32 md:pb-40`).

5. **Remover borda superior** da seção "Mais do que uma clínica" (não precisa mais separar, pois o hero escuro já cria contraste forte).

Nenhuma mudança no `SiteHeader` — ele já tem o estado `onDark` quando não scrollado, que é exatamente o que queremos sobre o novo fundo escuro.
