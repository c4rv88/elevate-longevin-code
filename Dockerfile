# ---- Build stage ----
FROM oven/bun:1 AS build
WORKDIR /app

# Install deps (cache-friendly)
COPY package.json bun.lockb* bunfig.toml* ./
RUN bun install --frozen-lockfile || bun install

# Copy source and build
COPY . .
RUN bun run build

# ---- Runtime stage ----
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Nitro node-server output is self-contained in .output/
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
