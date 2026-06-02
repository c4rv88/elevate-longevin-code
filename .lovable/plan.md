## Adicionar Google Tag Manager `GTM-T52JC3WR`

### Mudanças em `src/routes/__root.tsx`

1. **Constantes + snippets** no topo do arquivo (junto do Meta Pixel já existente):
   ```ts
   const GTM_ID = "GTM-T52JC3WR";
   const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','${GTM_ID}');`;
   ```

2. **Script GTM no `<head>`**: adicionar `{ children: gtmScript }` no array `scripts` do `head()` da root route (junto do Meta Pixel).

3. **Noscript iframe GTM no `<body>`**: dentro do `RootShell`, junto do noscript do Meta Pixel:
   ```tsx
   <noscript>
     <iframe
       src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
       height="0"
       width="0"
       style={{ display: "none", visibility: "hidden" }}
       title="Google Tag Manager"
     />
   </noscript>
   ```

### Observações
- Coexiste com o Meta Pixel já instalado.
- GTM gerencia GA4, Ads, etc. pelo painel — não preciso adicionar `gtag` separado.