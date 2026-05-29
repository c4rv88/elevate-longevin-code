Em `src/components/SpecialtiesNetwork.tsx`:

1. **Remover "Integra com"** do tooltip (`NodeTooltip`): apagar o bloco `{spec.related.length > 0 && (...)}` que renderiza o eyebrow gold "Integra com" e a lista de especialidades relacionadas. Manter ícone, nome e descrição curta.

2. **Centro do diagrama com o mesmo tamanho dos nós das especialidades**: no `DesktopDiagram`, reduzir o círculo central (atualmente `min-h-[150px] min-w-[150px]`) para `88px × 88px` — exatamente o mesmo `width/height` dos nós de especialidade — para que a árvore fique visualmente alinhada/centrada com os demais círculos. Ajustar a árvore interna (`<img src={treeLogo} />`) de `h-16 w-16` para algo como `h-10 w-10` para caber bem no círculo menor.

3. **Aumentar os ícones das especialidades**: trocar `<s.Icon className="h-5 w-5 …" />` por `h-7 w-7` (e manter `strokeWidth={1.25}`) para os ícones ficarem mais legíveis dentro dos círculos. Pequena redução do `mt-1` do label se necessário para evitar overflow.

Sem mudanças no mobile (`MobileTimeline`) nem em outras seções.
