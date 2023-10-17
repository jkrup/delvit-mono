# Prerequisites
- Docker + Docker Compose
- [flyctl](https://fly.io/launchpad)

# Dev Quickstart
> in the root directory
1. Run db container: `nx run db:serve` or `nx serve db`
2. Run next server: `nx run web:serve`  or `nx serve web` (served on port 4200 by default)

Alternatively, use `nx run-many -t serve` to run both servers in a single console

## Dev Tools
- Prisma studio: `nx run db:ui`
- Update DB schema: `nx run db:migrate`
- Rebuild prisma querybuilder: `nx run db:generate`

## First-time setup
> in the root directory
1. Install packages: `npm i`
2. Run DB container in background: `nx run db:serve`
3. (new terminal) Setup db schema: `nx run db:migrate`
4. Populate `apps/web/.env` file and then follow quickstart steps above

# Production - Fly.io

## Deploying

References:
- [Deploying with a Dockerfile](https://fly.io/docs/languages-and-frameworks/dockerfile/)
- [Postgres on Fly.io](https://fly.io/docs/postgres/#about-postgres-on-fly)

## Monitoring
- [Web Logs](https://fly.io/apps/dlv-web/monitoring)
- [DB Logs](https://fly.io/apps/dlv-web-db/monitoring)

