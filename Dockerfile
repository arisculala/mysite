# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
# node:22-bookworm-slim = Debian 12 (glibc) — required for Next.js SWC binaries on Linux
FROM node:22-bookworm-slim AS deps
WORKDIR /app

# Patch OS-level CVEs before anything else
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY .npmrc package.json package-lock.json* ./
# npm ci uses the lockfile for reproducible installs.
# npm v7+ lockfiles include optional deps for all platforms; npm selects
# the correct linux-x64-gnu SWC binary automatically at install time.
RUN npm ci

# ─── Stage 2: Builder ────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder
WORKDIR /app

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Ensure public/ always exists so the COPY in the runner stage never fails
RUN mkdir -p /app/public

# ─── Stage 3: Production runner (Distroless) ─────────────────────────────────
# Pinned by digest for reproducible, auditable builds.
# To update: docker pull gcr.io/distroless/nodejs22-debian12 && docker inspect --format='{{index .RepoDigests 0}}' gcr.io/distroless/nodejs22-debian12
FROM gcr.io/distroless/nodejs22-debian12@sha256:8a3e96fe3345b5d83ecec2066e7c498139a02a6d1214e4f6c39f9ce359f3f5bc AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy only the standalone output from the builder
COPY --from=builder /app/public           ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static     ./.next/static

EXPOSE 3000

# Distroless has no shell — CMD must be exec form with full node path
CMD ["server.js"]
