Plano para corrigir o mobile:

1. Ajustar o wrapper mobile de `SpecialtiesNetwork` para nunca exceder `100vw`, com centralização real (`mx-auto`, `max-w-full`) e isolamento de overflow.
2. Corrigir a timeline horizontal para que a rolagem fique apenas dentro da faixa dos ícones, sem empurrar a largura da página; trocar o padding com `calc(50%-40px)` por uma forma válida/segura em CSS.
3. Garantir que o card de preview e textos usem largura limitada com `box-border`, evitando qualquer conteúdo ultrapassar a viewport em 390px.
4. Validar visualmente no viewport mobile atual que não há faixa preta/rolagem horizontal e que a especialidade ativa continua centralizada.