## Adicionar fotos aos 3 cards da seção "Nossa proposta"

Mapear cada imagem ao card correspondente, mantendo o visual leve e clean:


| Card                                    | Imagem                                    |
| --------------------------------------- | ----------------------------------------- |
| 01 · Atendimento Diferenciado           | `atendimento.webp` (médico em consulta)   |
| 02 · Multidisciplinar                   | `Longevin-Recep.jpg` (recepção)           |
| 03 · Parece uma casa, mas é uma clínica | `Nossos-Diferenciais-3.png` (consultório) |


### Implementação

1. **Copiar uploads** para `src/assets/`:
  - `src/assets/proposta-atendimento.webp`
  - `src/assets/proposta-multidisciplinar.png`
  - `src/assets/proposta-casa.jpg`
2. `**src/routes/index.tsx**` — atualizar o array dos 3 cards adicionando `img`, e reescrever o bloco render de cada card para:
  - Imagem no topo do card em `aspect-[4/3] overflow-hidden` (sem borda extra, mantendo o grid `gap-px` e `rounded-2xl` já existente)
  - `img` com `loading="lazy"`, `object-cover`, transição sutil `group-hover:scale-[1.03] duration-[1200ms]`
  - Padding do conteúdo reduzido para `p-8 md:p-10` (mantendo respiro)
  - Manter kicker (01/02/03), traço dourado, título serif e descrição — mesma hierarquia
  - Adicionar `group` à `div` do card
3. **Leveza visual**: aplicar um leve overlay `from-background/0 to-background/10` sobre as imagens para integrar com a paleta clara e manter o tom "clean". Sem alterações de cores, fontes ou estrutura geral da seção.

Nenhuma outra seção é afetada.