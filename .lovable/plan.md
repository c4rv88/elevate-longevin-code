## Objetivo

Criar uma página dedicada **A Longevin** acessível em `/a-longevin`, espelhando o conteúdo da página original (https://longevin.com.br/a-longevin/), porém usando a identidade visual já estabelecida no projeto (tokens, tipografia serif, eyebrows, `btn-premium`, paleta gold/marfim, hairlines, header e footer compartilhados).

## Arquivos

### 1. Novo arquivo: `src/routes/a-longevin.tsx`
Rota TanStack `/a-longevin` com `head()` próprio (title, description, og tags) e componente `ALongevinPage`. Usa `<SiteHeader />` e `<SiteFooter />`.

### 2. Editar: `src/components/SiteHeader.tsx`
Trocar o link "A Longevin" de âncora `#sobre` para rota `/a-longevin` (usando `<Link to="/a-longevin">` do TanStack Router). Os demais itens permanecem como âncoras da home.

### 3. Editar: `src/components/SiteFooter.tsx`
Mesmo ajuste no link "A Longevin" na navegação do rodapé.

## Estrutura da página `/a-longevin`

Seções, todas seguindo o estilo das seções existentes em `index.tsx`:

1. **Hero institucional** — fundo claro com eyebrow "A LONGEVIN", título serif grande "Em uma localização privilegiada, a Longevin acolhe, cuida e previne.", breadcrumb sutil "Home / A Longevin", CTA `btn-premium` "Agendar consulta".

2. **Manifesto / proposta** — dois parágrafos do site original (modelo inovador de cuidado em saúde + idealizada por profissionais que defendem uma medicina mais humana, com a lista de especialidades). Layout de duas colunas: texto + imagem (`interiorImg` ou `propostaCasa`).

3. **Melhor Atendimento Médico** — grid de 4 cards/itens com hairlines e ícones lucide:
   - Atenção à jornada individual
   - Atendimento multidisciplinar
   - Localização privilegiada e acessível
   - Acompanhamento contínuo

4. **Por que nos escolher** — bloco com imagem `excelenciaImg` à esquerda e texto à direita; eyebrow "POR QUE NOS ESCOLHER".

5. **Cuidado integral, com presença e intenção** — seção destaque (fundo escuro/gold sutil ou marfim) com a citação completa:
   > "Na Longevin, cada paciente é visto como um todo. Não olhamos apenas exames, mas a história, os sintomas, as emoções e os objetivos de vida..."
   
   Seguida de três pilares (substituindo os emojis 🌿 por ícones lucide ou bullets dourados):
   - Saúde com escuta
   - Diagnóstico com precisão
   - Planos de cuidado personalizados
   
   Encerrando com a frase: *"Porque saúde não é feita de consultas isoladas. É feita de vínculos."*

6. **Localização** — bloco simples com endereço/ícone `MapPin` e link "Ver no Google Maps" (mantém referência ao mapa do site original, sem embed pago).

7. **CTA final** — "Quer conhecer um novo jeito de cuidar da sua saúde?" com `btn-premium` para `https://agende.longevin.com.br/`.

## Detalhes técnicos

- Reaproveitar tokens e classes utilitárias já definidas em `src/styles.css` (`eyebrow`, `btn-premium`, `link-underline`, `hairline`, cor `gold`).
- Tipografia: títulos em `font-serif`, eyebrows em uppercase tracking-wide.
- Sem novas imagens geradas — usar assets já existentes (`interiorImg`, `excelenciaImg`, `propostaCasa`, `propostaMultidisciplinar`).
- `routeTree.gen.ts` é regenerado automaticamente pelo plugin Vite — não editar.
- Sem mudanças de backend / lógica.
