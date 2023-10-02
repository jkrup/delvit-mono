# Delvit

## Dev Quickstart
> in the root directory
1. Run db container: `nx run db:serve` or `nx serve db`
2. Run next server: `nx run web:serve`  or `nx serve web` (served on port 4200 by default)

Alternatively, use `nx run-many -t serve -p web db` to run both servers in a single console

## First-time setup
> in the root directory
1. Install packages: `npm i`
2. Run DB container in background: `nx run db:serve`
3. (new terminal) Setup db schema: `nx run db:migrate`
4. Populate `apps/web/.env` file and then follow quickstart steps above


## Tools
- Prisma studio: `nx run db:ui`
- Update DB schema: `nx run db:migrate`