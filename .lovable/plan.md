## Ajustes mobile — Áreas que se conversam

### 1. Copiar nova logo
- Copiar `user-uploads://logo-longevin.png` → `src/assets/logo-longevin-tree.png`.

### 2. Núcleo central (`MobileTimeline` em `src/components/SpecialtiesNetwork.tsx`, ~linha 530-548)
- Substituir `<LongevinMark className="h-7 w-auto opacity-90" />` por `<img src={treeLogo} alt="Longevin" className="h-14 w-14 object-contain" />` (importar do asset acima).
- Aumentar o círculo de `h-24 w-24` para `h-28 w-28` para acomodar a árvore com folga.
- Garantir centralização: já está `flex flex-col items-center w-full max-w-sm` com `mx-auto`. Adicionar `mx-auto` no wrapper para reforçar.

### 3. Timeline — ícones maiores e sem barra de rolagem visível
- Item ativo: círculo de `64px → 80px`, ícone `22px → 28px`.
- Itens inativos: círculo de `44px → 56px`, ícone `16px → 20px`.
- Recalibrar padding lateral do scroller para o novo tamanho: `px-[max(64px,calc(50%-40px))]`.
- Ajustar `top` da linha base e dos botões prev/next para o novo centro vertical (≈ `top-[50px]`).
- Confirmar `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden` (já presente); adicionar `overscroll-x-contain` para impedir que o swipe horizontal puxe rolagem vertical da página.
- Aumentar `gap` entre nós de `gap-5` para `gap-6` para respirar com ícones maiores.

### 4. Remover CTA "Agendar consulta" da hero
- `src/routes/index.tsx` linhas 95-102: remover o `<a href="https://agende.longevin.com.br/">Agendar consulta</a>`.
- Manter o botão "Especialidades" ao lado.
- Header, segunda seção e footer permanecem intactos.

### Fora de escopo
- Desktop, dados de `SPECIALTIES`, drawer, tokens globais, demais botões "Agendar consulta".
