# Developer guide

This guide covers the tasks and hints for developers.

## Tasks

- **Upgrade dependencies** with `pnpm upgrade -ri`. If you use `-L` aswell you can upgrade major package version, but make sure you don't upgrade to dependencies that require Node 22.
- **Bump versions** by using `pnpm changeset`.

## Tools

- **Connect to the development database** with `psql -h db -U postgres` and the password `postgres`.
