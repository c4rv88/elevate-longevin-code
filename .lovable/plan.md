## Adicionar Meta Pixel (Facebook) ID `1931281277521079`

Vou instalar o Meta Pixel no site para rastrear PageView em todas as páginas.

### Mudanças em `src/routes/__root.tsx`

1. **Adicionar o script do Pixel** no array `scripts` do `head()` da root route:
   ```ts
   {
     children: `!function(f,b,e,v,n,t,s)
       {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
       n.callMethod.apply(n,arguments):n.queue.push(arguments)};
       if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
       n.queue=[];t=b.createElement(e);t.async=!0;
       t.src=v;s=b.getElementsByTagName(e)[0];
       s.parentNode.insertBefore(t,s)}(window, document,'script',
       'https://connect.facebook.net/en_US/fbevents.js');
       fbq('init', '1931281277521079');
       fbq('track', 'PageView');`,
   }
   ```

2. **Adicionar o fallback `<noscript>` no `<body>`** (NÃO no `<head>` — TanStack/Vite quebra com `<img>` dentro de `<noscript>` no head). Vou colocar dentro do `RootShell`, antes do `<Scripts />`:
   ```tsx
   <noscript>
     <img height="1" width="1" style={{ display: "none" }}
       src="https://www.facebook.com/tr?id=1931281277521079&ev=PageView&noscript=1"
       alt="" />
   </noscript>
   ```

3. **Rastrear PageView em navegação SPA**: como o TanStack Router troca rotas sem reload, vou adicionar um `useEffect` no `RootComponent` que escuta mudanças de rota via `router.subscribe('onResolved', ...)` e dispara `window.fbq?.('track', 'PageView')`.

### Observações

- Não vou usar Google Tag Manager nem Conversion API — só o Pixel client-side como você passou.
- Se quiser eventos extras depois (Lead, Contact, ViewContent ao clicar em WhatsApp/CTA), me avisa que adiciono nos handlers.

Confirma que posso aplicar?