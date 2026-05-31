# Deploy do Longevin no Swarm + Traefik

Adaptar o padrão dos seus outros sites (Swarm + Traefik + Let's Encrypt) para o Longevin, mantendo o SSR Node já configurado (porta 3000).

## Arquivos a criar/ajustar

### 1) `docker-stack.yml` (novo — para Portainer/Swarm)
Stack idêntica em estrutura ao seu exemplo `monameclinic`, com diferenças:
- `image: longevin:site-v01` (build local no servidor, tag manual)
- Host duplo: `longevin.com.br` e `www.longevin.com.br`
- `loadbalancer.server.port=3000` (Node SSR, não nginx)
- Redirect `www` → apex via middleware Traefik
- Healthcheck HTTP em `/` para o Swarm saber quando o container está pronto

```yaml
version: "3.7"

services:
  longevin:
    image: longevin:site-v01
    networks:
      - network_public
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.longevin.rule=Host(`longevin.com.br`) || Host(`www.longevin.com.br`)
        - traefik.http.routers.longevin.entrypoints=websecure
        - traefik.http.routers.longevin.tls.certresolver=letsencryptresolver
        - traefik.http.routers.longevin.middlewares=longevin-www-redirect
        - traefik.http.middlewares.longevin-www-redirect.redirectregex.regex=^https?://www\.longevin\.com\.br/(.*)
        - traefik.http.middlewares.longevin-www-redirect.redirectregex.replacement=https://longevin.com.br/$${1}
        - traefik.http.middlewares.longevin-www-redirect.redirectregex.permanent=true
        - traefik.http.services.longevin.loadbalancer.server.port=3000
        - traefik.http.services.longevin.loadbalancer.passHostHeader=true

networks:
  network_public:
    external: true
    name: network_public
```

### 2) `Dockerfile` (manter o atual)
Já está pronto: build com `oven/bun:1`, runtime `node:20-alpine`, expõe 3000.
Sem alterações.

### 3) `docker-compose.yml` (manter para dev local)
Continua útil para `docker compose up` em dev. Sem alterações.

### 4) `DEPLOY.md` (novo — instruções operacionais)
Passo a passo para o servidor:

```bash
# 1) Atualizar código
cd /opt/longevin
git pull

# 2) Build local da imagem (gera longevin:site-v01)
docker build -t longevin:site-v01 .

# 3a) Primeiro deploy
docker stack deploy -c docker-stack.yml longevin

# 3b) Atualizações futuras (incrementar tag: v02, v03...)
docker build -t longevin:site-v02 .
# editar docker-stack.yml -> image: longevin:site-v02
docker stack deploy -c docker-stack.yml longevin

# Logs / status
docker service logs -f longevin_longevin
docker service ls
```

## Detalhes técnicos

- **Por que porta 3000 e não 80**: o build TanStack Start gera um servidor Node (`.output/server/index.mjs`) que escuta em `PORT=3000`. Traefik faz o proxy `:443 → container:3000`. Não há nginx no container.
- **Por que `||` no rule**: Traefik v2 permite múltiplos hosts num único router. Mais limpo que duplicar router.
- **Redirect www→apex**: padrão SEO (canonical único). Se preferir o inverso (apex→www), basta inverter regex/replacement.
- **`network_public` external**: assume que sua rede overlay do Traefik já existe (igual aos outros stacks). Sem mudança.
- **Tag versionada (`site-v01`)**: igual ao seu padrão `moname:site-v04`. Evita usar `:latest` (que quebra rollback no Swarm).
- **Sem `ports:` exposto**: Traefik resolve via rede overlay, container não publica porta no host (mesmo padrão do seu exemplo).

## Fora de escopo
- Configurar DNS de `longevin.com.br` apontando para o servidor (manual no registrador).
- Configurar Traefik / Let's Encrypt resolver — assumido já existente, como nos outros sites.
