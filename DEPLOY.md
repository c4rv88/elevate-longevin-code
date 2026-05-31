# Deploy — Longevin (Docker Swarm + Traefik)

Stack para rodar o site `longevin.com.br` no mesmo servidor dos demais
projetos, atrás do Traefik com TLS via Let's Encrypt.

> Diferente dos outros sites (SPA estático com nginx na porta 80), o
> Longevin roda **SSR Node** no container, exposto internamente na **porta
> 3000**. O Traefik faz o proxy HTTPS → 3000.

## Pré-requisitos no servidor

- Docker em modo Swarm (`docker swarm init` já executado).
- Rede overlay `network_public` existente (a mesma usada pelos outros
  stacks). Caso não exista:
  ```bash
  docker network create --driver overlay --attachable network_public
  ```
- Traefik já rodando com o resolver `letsencryptresolver` configurado
  (igual ao stack do `monameclinic`).
- DNS de `longevin.com.br` e `www.longevin.com.br` apontando para o IP do
  servidor.

## Primeiro deploy

```bash
# 1) Clonar o repositório
sudo mkdir -p /opt/longevin && sudo chown $USER /opt/longevin
git clone <URL_DO_REPO> /opt/longevin
cd /opt/longevin

# 2) Build local da imagem (tag versionada, igual ao padrão moname:site-vXX)
docker build -t longevin:site-v01 .

# 3) Deploy da stack
docker stack deploy -c docker-stack.yml longevin

# 4) Acompanhar
docker service ls
docker service logs -f longevin_longevin
```

Em alguns segundos o Traefik emite o certificado e o site fica disponível
em https://longevin.com.br (com redirect automático de `www` → apex).

## Atualizações (novo deploy)

Sempre incremente a tag (`v02`, `v03`...) — evita usar `:latest`, que
quebra rollback no Swarm.

```bash
cd /opt/longevin
git pull

# Nova tag
docker build -t longevin:site-v02 .

# Atualiza docker-stack.yml: trocar  image: longevin:site-v01  por  v02
sed -i 's/longevin:site-v01/longevin:site-v02/' docker-stack.yml

# Re-deploy (rolling update, sem downtime)
docker stack deploy -c docker-stack.yml longevin
```

## Comandos úteis

```bash
# Status do serviço
docker service ps longevin_longevin

# Logs em tempo real
docker service logs -f longevin_longevin

# Escalar (opcional, se quiser mais réplicas)
docker service scale longevin_longevin=2

# Remover a stack
docker stack rm longevin
```

## Troubleshooting

- **502 Bad Gateway no Traefik**: o container ainda está subindo o Node.
  Aguarde ~10s ou veja `docker service logs -f longevin_longevin`.
- **Certificado não emite**: confira que a porta 80 do servidor está
  liberada (Let's Encrypt usa HTTP-01 challenge) e que o DNS já propagou.
- **Imagem não encontrada no deploy**: a tag em `docker-stack.yml` deve
  bater exatamente com a tag do `docker build -t ...` rodado no host.
