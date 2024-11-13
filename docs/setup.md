# Setup

## Getting started

The following steps describe how to set up the Quassel application system.

### Environment

These steps describe how to set up the system environment on Ubuntu 24.04 LTS:

1. Install updates

   ```bash
   apt update && apt upgrade
   ```

1. Install Docker dependencies

   ```bash
   apt install apt-transport-https ca-certificates curl gnupg lsb-release
   ```

1. Import Dockers GPG key

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

1. Add Dockers apt repository
   - On x86_64

     ```bash
     echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
     ```

   - On ARM

     ```bash
     echo "deb [arch=arm64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
     ```

1. Install Docker

   ```bash
   apt update && apt install docker-ce docker-ce-cli containerd.io
   ```

1. Create directory for Docker cli plugins

   ```bash
   mkdir -p /usr/local/lib/docker/cli-plugins
   ```

1. Download `docker-compose` executable
   - On x86_64

     ```bash
     curl -SL https://github.com/docker/compose/releases/download/v2.29.6/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
     ```

   - On ARM

     ```bash
     curl -SL https://github.com/docker/compose/releases/download/v2.29.6/docker-compose-linux-aarch64 -o /usr/local/lib/docker/cli-plugins/docker-compose
     ```

1. Give executable permission to Docker Compose

   ```bash
   chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
   ```

1. Validate the installation of Docker (>= `27.3.1`)

   ```bash
   docker version
   ```

1. Validate the installation of Docker Compose (>= `2.29.6`)

   ```bash
   docker compose version
   ```

The following sources were used:

- [Documentation: Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Documentation: Docker Compose V2](https://docs.docker.com/compose/cli-command/#installing-compose-v2)

### Application system

The following steps describe how to set up the application system:

1. Copy the example files

   ```bash
   cd /srv \
   && wget https://raw.githubusercontent.com/openscript-ch/quassel/refs/heads/main/examples/public/docker-compose.yaml \
   && wget https://raw.githubusercontent.com/openscript-ch/quassel/refs/heads/main/examples/public/traefik.yaml \
   && wget https://raw.githubusercontent.com/openscript-ch/quassel/refs/heads/main/examples/public/.env.example
   ```

1. Rename environment file and fill out the gaps `mv .env.example .env`
1. Make sure that the DNS is routing all subdomains to the host where the individual services run on.
1. Replace all `example.com` with the domain where the application runs on.

   ```bash
   sed -i "s/example.com/example.com/g" docker-compose.yaml
   ```

1. Change contact email for SSL certificates in `traefik.yaml`
1. Configure the following environment variables in `docker-compose.yaml`:
   - **backend**:
      - `SESSION_SECRET` to a 32byte random hex string with `openssl rand -hex 32`
      - `SESSION_SALT` to a 8byte random hex string with `openssl rand -hex 8`
      - `DATABASE_PASSWORD` set a more secure password for the database
   - **frontend**:
      - `API_URL` set to a escaped URL so it works with sed (e.g. "https:\\/\\/api.test.example.com")
1. Run application system

   ```bash
   docker compose -f docker-compose.yaml up -d
   ```

### Automatic updates

For automatic updates, there is a watchtower service configured. This service exposes an endpoint at `http://test.example.com:8080/v1/update`. If a HTTP GET request is sent including the configured secret Bearer token to this endpoint, watchtower will pull new images and restart the services accordingly.

### Monitoring

The following opinionated steps describe to push data to a Grafana instance via Prometheus:

1. Get the remote url and token.
1. Enable [Docker Metrics](https://docs.docker.com/engine/daemon/prometheus/).
   1. Add the following to the Docker daemon configuration file `/etc/docker/daemon.json`:

      ```json
      {
        "metrics-addr" : "localhost:9323"
      }
      ```

   1. Restart the Docker daemon with `systemctl restart docker`.
1. Copy the Grafana Agent configuration example:

   ```bash
   wget https://raw.githubusercontent.com/openscript-ch/quassel/refs/heads/main/examples/public/grafana-agent.yaml
   ```

1. Replace the `remote_write` url and token in `grafana-agent.yaml`.
   1. `<endpoint>` with the remote url.
   1. `<token>` with the token.

## Tasks

The following sections describe the tasks to take care of the application system.

### Release a new version

1. Merge the release pull request and wait for completion of the pipeline.

### Upgrade application system

1. Pull new images

   ```bash
   docker compose -f docker-compose.yaml pull
   ```

1. Recreate containers

   ```bash
   docker compose -f docker-compose.yaml up -d
   ```

1. Migrate database

   ```bash
   docker exec -it $(docker ps -f name=backend -q) npx mikro-orm migration:up
   ```

1. Seed database

   ```bash
   docker exec -it $(docker ps -f name=backend -q) npx mikro-orm seeder:run
   ```

### Maintain application system

- Create a database backup

  ```bash
  docker exec -it $(docker ps -f name=database -q) pg_dumpall -c -U postgres > quassel_dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
  ```

- Archive storage
