# Depoimentos reais do Doctoralia

Substituir a seção "DEPOIMENTOS" atual em `src/routes/index.tsx` por um bloco no estilo do print enviado, usando opiniões 5 estrelas verificadas extraídas do perfil público da Clínica Longevin no Doctoralia.

## O que muda

- Apenas `src/routes/index.tsx` (seção `DEPOIMENTOS`).
- Mesmo background quente da seção atual de depoimentos / equipe, com cabeçalho centralizado:
  - eyebrow "Depoimentos"
  - título serif: "O que dizem nossas *pacientes*"
  - subtítulo: "Relatos reais de pacientes verificados na Doctoralia."
- Grid de 3 colunas (md+) com 6 depoimentos exibidos em carrossel (embla, mesmo padrão da seção de equipe) com setas de navegação à esquerda/direita.
- Cada card:
  - 5 estrelas douradas (cor `--gold`, ícone `Star` do lucide preenchido) no topo
  - citação em itálico serif
  - nome do paciente em bold com selo "verificado" (ícone `BadgeCheck` em verde Doctoralia)
  - subtítulo "Consulta verificada" em muted
  - borda 1px `border-border`, `rounded-2xl`, `bg-background/60`, padding generoso
- Rodapé centralizado: logo/marca "Doctoralia" (texto + ícone estilizado verde) + link "Ver todas as 98 opiniões na Doctoralia" → `https://www.doctoralia.com.br/clinicas/clinica-longevin#facility-opinion-stats` (target=_blank).

## Conteúdo (6 opiniões 5★ reais)

1. **Maria das Graças** — "Médico exatamente o que eu procurava, excelência em tudo, desde o recebimento do paciente até o final da consulta. Já escolhi o médico da nossa família." — *Dr. Igor Brito · Geriatria*
2. **Daniel Mendes** — "Me senti realmente acolhido e compreendido. A consulta foi boa até demais — me senti confortável, respeitado e à vontade para falar." — *Dra. Mayanne Lucy · Psicologia*
3. **Josiane** — "Dra. Alexia atendeu minha mãe. Médica super atenciosa e bastante profissional. Excelente." — *Dra. Alexia Carneiro · Neurologia*
4. **Thamiris** — "Ótima profissional, atenciosa, pontual. Estou gostando muito." — *Dra. Mayanne Lucy · Psicologia*
5. **M.A.S.** — "Atendimento humanizado com orientações detalhadas para a paciente." — *Dr. Igor Brito · Geriatria*
6. **Samara** — "Explicou muito bem. Saímos mais calmos. Maravilhoso." — *Dr. Igor Brito · Clínica médica*

Citações editadas levemente (pontuação) preservando o sentido original.

## Técnico

- Adicionar imports `Star`, `BadgeCheck` do `lucide-react`.
- Reaproveitar `Carousel`/`CarouselContent`/`CarouselItem` + `Autoplay` já importados.
- Estrelas: `<Star className="h-4 w-4 fill-gold text-gold" />` × 5.
- Nenhuma alteração em `SiteHeader`, `SiteFooter`, rotas ou tokens de design.
