## Reordenar topo de `/a-longevin`

Mover o bloco "Mais do que uma clínica — um novo jeito de cuidar" (atual hero) para **depois** da seção "Nossa proposta".

### Nova ordem das seções

1. **Hero / Nossa proposta** (atual seção "Manifesto") — passa a ser o topo da página, com o eyebrow "A Longevin" + breadcrumb Home / A Longevin acima, mantendo o título "Um ecossistema em saúde, além da consulta." e os dois parágrafos. Padding superior aumentado (`pt-40 md:pt-48`) para compensar o header fixo.
2. **"Mais do que uma clínica — um novo jeito de cuidar"** — vira uma seção destaque logo abaixo, centralizada, com o subtítulo e os CTAs ("Agendar consulta" / "Conhecer a proposta") preservados.
3. Pilares (Melhor atendimento médico)
4. Por que nos escolher
5. Cuidado integral
6. Localização (com Google Maps)
7. CTA final

Apenas reordenação e ajuste de paddings/breadcrumb em `src/routes/a-longevin.tsx`. Nenhuma outra mudança.
