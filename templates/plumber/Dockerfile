# Stage 1: Dependencies
FROM node:24-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages ./packages
COPY templates/hair-salon/package.json ./templates/hair-salon/

RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:24-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.pnpm-store ./.pnpm-store
COPY . .

RUN pnpm run build --filter=@templates/hair-salon

# Stage 3: Runtime
FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/templates/hair-salon/.next/standalone ./
COPY --from=builder /app/templates/hair-salon/.next/static ./templates/hair-salon/.next/static
COPY --from=builder /app/templates/hair-salon/public ./templates/hair-salon/public

EXPOSE 3100

CMD ["node", "templates/hair-salon/server.js"]
