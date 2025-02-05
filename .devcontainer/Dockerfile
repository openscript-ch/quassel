FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

RUN apt update
RUN apt install -y postgresql-common
RUN YES=yes /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
RUN apt install -y postgresql-client-17
RUN su node -c "npm install -g pnpm@10.2.0"
