## Substituir imagem da seção "Excelência que atua em conjunto"

Trocar a foto atual (`interiorImg` / clinic-interior.jpg) pela nova foto da equipe médica (`Atua_conjunto.webp`) na seção EXCELÊNCIA do `src/routes/index.tsx`.

### Implementação

1. Copiar `user-uploads://Atua_conjunto.webp` para `src/assets/excelencia-equipe.webp`.
2. Em `src/routes/index.tsx`:
   - Adicionar `import excelenciaImg from "@/assets/excelencia-equipe.webp";`
   - Trocar `src={interiorImg}` por `src={excelenciaImg}` no `<img>` da seção EXCELÊNCIA (linha ~183).
   - Atualizar o `alt` para "Equipe médica Longevin que atua em conjunto".
   - Ajustar o aspect ratio do contêiner de `aspect-[4/5]` para `aspect-[4/3]` (a nova foto é paisagem) para evitar crop pesado, mantendo `rounded-2xl overflow-hidden`.

Nenhuma outra alteração — badge "10+", textos, layout e tipografia permanecem iguais.
