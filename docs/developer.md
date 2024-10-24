# Developer guide

This guide covers the tasks and hints for developers.

## Tasks

- **Upgrade dependencies** with `pnpm upgrade -ri`. If you use `-L` aswell you can upgrade major package version, but make sure you don't upgrade to dependencies that require Node 22.
- **Bump versions** by using `pnpm changeset`.
- **Connect to the development database** with `psql -h db -U postgres` and the password `postgres`.
- **Run db tasks** by using `pnpm --filter @quassel/backend run db`.
  - **Migrate up to the latest version** with `pnpm --filter @quassel/backend run db migration:up`.
