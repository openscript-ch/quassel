# Developer guide

This guide covers the tasks and hints for developers.

## Services

After running `pnpm dev` the following services should come up:

- [localhost:3000](http://localhost:3000): Backend
  - [localhost:3000/api](http://localhost:3000/api): API documentation
- [localhost:3001](http://localhost:3001): Frontend
- [localhost:3002](http://localhost:3002): Mockup

## Tasks

- **Upgrade dependencies** with `pnpm upgrade -ri`. If you use `-L` aswell you can upgrade major package version, but make sure you don't upgrade to dependencies that require Node 22.
- **Bump versions** by using `pnpm changeset`.
- **Connect to the development database** with `psql -h db -U postgres` and the password `postgres`.
- **Regenerate API types** of the frontend with `pnpm --filter @quassel/frontend run build:types`.
- **Run db tasks** by using `pnpm --filter @quassel/backend run db`.
    **Create a new migration** with `pnpm --filter @quassel/backend run db migration:create`.
  - **Migrate up to the latest version** with `pnpm --filter @quassel/backend run db migration:up`.
  - **Run seeders** with `pnpm --filter @quassel/backend run db seeder:run`.
- **Run nest tasks** by using `pnpm --filter @quassel/backend run nest`.
  - **Generate services** with e. g. `pnpm --filter @quassel/backend run nest g s participants research`.
  - **Generate controllers** with e. g. `pnpm --filter @quassel/backend run nest g co languages defaults`.
