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
- **Run db tasks** by using `pnpm --filter @quassel/backend run db`.
    **Create a new migration** with `pnpm --filter @quassel/backend run db migration:create`.
  - **Migrate up to the latest version** with `pnpm --filter @quassel/backend run db migration:up`.
- **Run nest tasks** by using `pnpm --filter @quassel/backend run nest`.
  - **Generate ressources** with `pnpm --filter @quassel/backend run nest g res`.
  - **Generate controllers** with e. g. `pnpm --filter @quassel/backend run nest g co --flat carer defaults`.
