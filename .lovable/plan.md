## Aplicar header com letras verdes nas páginas de especialidades

Atualmente `SpecialtyPage.tsx` usa `<SiteHeader />` (variant default "auto"), que mostra letras claras no topo. Trocar para `<SiteHeader variant="light" />` — mesma variante usada em `/a-longevin`, que aplica o tom verde nos itens de navegação.

### Arquivo
- `src/components/SpecialtyPage.tsx` linha 13: `<SiteHeader />` → `<SiteHeader variant="light" />`
