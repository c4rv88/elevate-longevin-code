## Adicionar galeria de fotos na página `/a-longevin`

### O que fazer

Inserir uma nova seção "Galeria" logo abaixo do hero (após a foto da fachada), exibindo as 4 fotos enviadas: recepção, sala de espera e dois consultórios.

### Passos

1. **Copiar as 4 imagens** de `user-uploads://` para `src/assets/`:
   - `recep-longevin2.webp` (recepção com logo)
   - `recep-longevin.webp` (sala de espera)
   - `consultorio-longevin.webp` (consultório com mesa)
   - `consultorio-longevin2.webp` (consultório com janela gradeada)

2. **Editar `src/routes/a-longevin.tsx`**:
   - Importar as 4 imagens.
   - Adicionar nova `<section>` entre o hero e a seção "Manifesto destaque" (após linha 96).
   - Layout: grid responsivo de 4 colunas em desktop (2 em tablet, 1 em mobile), com cantos arredondados, borda sutil e legendas curtas em cada foto (Recepção, Sala de espera, Consultório, Atendimento). Tom claro consistente com o resto da página.

### Arquivos afetados
- `src/assets/recep-longevin.webp`, `src/assets/recep-longevin2.webp`, `src/assets/consultorio-longevin.webp`, `src/assets/consultorio-longevin2.webp` (novos)
- `src/routes/a-longevin.tsx` (imports + nova seção)
