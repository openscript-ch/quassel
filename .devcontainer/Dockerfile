FROM mcr.microsoft.com/devcontainers/typescript-node:24-bookworm

RUN apt update
RUN apt install -y postgresql-common
RUN YES=yes /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
RUN apt install -y postgresql-client-17
