## Transformar foto do hero em galeria interativa

Substituir a galeria de 4 thumbs (atualmente abaixo do hero) por miniaturas posicionadas **logo abaixo da foto principal do hero (fachada)**. Ao clicar numa miniatura, ela vira a imagem principal.

### Mudanças em `src/routes/a-longevin.tsx`

1. Adicionar `useState` para o índice da imagem ativa. Lista de imagens = fachada + 4 fotos internas (recepção, sala de espera, consultório, atendimento).
2. No hero (coluna direita), trocar `<img src={fachadaImg}>` pela imagem ativa, e adicionar abaixo uma linha com 5 miniaturas (thumbnails ~80–96px, rounded, border destacada quando ativa, hover scale).
3. Remover a seção "Galeria / Nosso espaço" separada que foi adicionada anteriormente — passa a ser redundante.
4. Converter o componente de função simples em componente com estado (já é função React, basta adicionar `useState`).

Sem mudanças em outras seções, cores ou textos.
