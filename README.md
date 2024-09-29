# Quassel

Quassel (previously Language Exposure Questionnaire) is a web-based application designed to aid researchers in collecting and analyzing data on children's language exposure. This software will streamline the process of recording when and to which languages children are exposed, capturing details such as who was involved (e.g., grandparents) and for how long. It offers a calendar-like interface for data entry, recurring event functionality, and tools for identifying gaps in exposure. Additionally, the software provides administrators with features to manage users, export data in various formats, and review collected questionnaires. Ultimately, this software aims to provide valuable insights into language development within the university's research or educational context.

## Contribute

1. Checkout the [open issues](./issues), if you don't know what to improve
1. Create a fork, change some code and make sure it works, is properly formatted and tested
1. Send a pull request

## Usage

As an **user** open your organizations installation in a web browser.

As a **developer** get started as follows:

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) up and running
1. Get [Visual Studio Code](https://code.visualstudio.com/) with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) ready
1. Open the project in the Dev Container and run `pnpm dev`
1. Lint the code with `pnpm check:types`, `pnpm check:format` and `pnpm check:lint`.
1. Run tests with `pnpm test`
1. Further steps are outlined in the [developer guide](./docs/developer.md).

As an **administrator** have a look at the [setup guide](./docs/setup.md).

## Structure

All parts of the project live inside this monorepo.

- Apps
  - [`backend`](./apps/backend/)
  - [`frontend`](./apps/frontend/)
  - [`mockup`](./apps/mockup/)
- Libs
  - [`ui`](./libs/ui/): Common UI components are represented inside this package.
