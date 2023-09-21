# Delvit

## Dev Quickstart
> in the root directory
1. Run db container: `nx run db:serve`
2. Run next server: `nx run web:serve` (served on port 4200 by default)

> only run on first-time setup
3. Setup db schema: `nx run db:migrate`
4. Populate `apps/web/.env` file 

