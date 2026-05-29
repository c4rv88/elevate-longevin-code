Vou aumentar a presença visual da fotografia na seção “Áreas que se conversam” mantendo o visual premium e limpo.

Plano:
1. Remover o posicionamento atrás de tudo que pode estar escondendo a imagem.
2. Aumentar bastante a opacidade da foto e reduzir a máscara/fade para que ela apareça claramente.
3. Suavizar o overlay verde/legibilidade para não apagar a fotografia.
4. Ajustar o enquadramento para mobile, onde o usuário está vendo a página, garantindo que a foto apareça de forma perceptível sem prejudicar a leitura do texto e do diagrama.

Detalhe técnico:
- Alterar apenas `src/routes/index.tsx`, na camada de fundo da seção `#especialidades`.
- Trocar `-z-10` por uma camada controlada dentro da própria seção e manter o conteúdo acima com `z-index`.
- Elevar a opacidade para algo próximo de `0.6–0.75` e reduzir a força do gradiente que hoje está apagando a imagem.