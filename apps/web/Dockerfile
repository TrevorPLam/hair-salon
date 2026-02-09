# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.pnpm-store ./.pnpm-store
COPY . .

RUN pnpm run build

# Stage 3: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
