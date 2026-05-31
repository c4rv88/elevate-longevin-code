## Ajustes no hero de `/a-longevin`

### Mudanças

1. **Fundo claro em vez do verde escuro** no hero (seção "Nossa proposta"):
   - Trocar `bg-[oklch(0.28_0.025_135)]` por fundo creme claro (`bg-background` com gradient suave para `oklch(0.96 0.012 100)`).
   - Reverter cores do conteúdo para os tons escuros padrão: eyebrow em `text-primary`, título em `text-foreground`, itálico em `text-primary`, parágrafos em `text-foreground/75`, borda da imagem em `border-border/60`.

2. **Trocar imagem lateral direita** pela foto da fachada da Longevin (`alongevin-fachada.jpg`):
   - Copiar `user-uploads://alongevin-fachada.jpg` para `src/assets/alongevin-fachada.jpg`.
   - Substituir o import `interiorImg` por `fachadaImg` no hero.
   - Manter `interiorImg` se ainda usado em outras seções (verificar — atualmente só no hero).

3. **Remover breadcrumb Home / A Longevin** completamente.

4. **Aumentar título "A Longevin"** (eyebrow no topo):
   - Trocar de `eyebrow` (11px) para algo maior tipo título secundário: `font-serif text-3xl md:text-4xl text-primary` ou similar, para virar um cabeçalho real da página em vez de eyebrow.

5. **Header**: já fica legível em fundo claro (estado scrolled padrão). Sem mudanças.

### Arquivos
- `src/routes/a-longevin.tsx` — alterações de cor, remoção de breadcrumb, aumento de "A Longevin", troca de imagem.
- `src/assets/alongevin-fachada.jpg` — nova imagem copiada do upload.
