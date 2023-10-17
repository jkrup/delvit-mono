### BUILDER
FROM docker.io/node:18-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY dist/apps/web/package.json dist/apps/web/package-lock.json ./
RUN npm install --production --frozen-lockfile && npm rebuild --arch=x64 --platform=linux --libc=musl sharp

COPY libs/db/prisma ./prisma
RUN npx prisma generate

### RUNNER
FROM docker.io/node:18-alpine as runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# ENV MALLOC_ARENA_MAX=2
# ENV NODE_OPTIONS='--dns-result-order=ipv4first --max-old-space-size=512'
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app

# For info on deployment placement, see https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
COPY dist/apps/web .
COPY dist/apps/web/.next/standalone/apps/web/.env.production .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["npm", "start"]