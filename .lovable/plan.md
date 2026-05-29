## Inverter ordem em `/a-longevin`

Atualmente o hero fala sobre localização e depois vem "Nossa proposta"; a localização aparece só perto do fim. Vamos inverter: a página começa apresentando a clínica e termina com a localização + Google Maps.

### Mudanças em `src/routes/a-longevin.tsx`

1. **Hero** — trocar o título e a ênfase para falar da clínica em si:
   - Eyebrow: "A Longevin"
   - Título: "Mais do que uma clínica — *um novo jeito de cuidar.*"
   - Subtítulo curto explicando o ecossistema de medicina integrada.
   - Mantém CTAs "Agendar consulta" e "Conhecer a proposta".

2. **Reordenar seções** (de cima para baixo):
   1. Hero (clínica)
   2. Manifesto / proposta
   3. Pilares (Melhor atendimento médico)
   4. Por que nos escolher
   5. Cuidado integral (bloco escuro)
   6. **Localização** — agora penúltima seção, com título "Em uma localização privilegiada, a Longevin acolhe, cuida e previne." e **embed real do Google Maps** (iframe) no lugar da imagem `propostaCasa`, mais o endereço e link "Ver no Google Maps".
   7. CTA final

3. **Google Maps embed** — usar `<iframe>` padrão do Google Maps (`https://www.google.com/maps?q=...&output=embed`) com a query "Clínica Longevin Fortaleza", dentro do mesmo container arredondado/bordado já usado para imagens.

Nenhuma outra mudança de estilo, header ou footer.
