# Setup

## Getting started

The following steps describe how to set up the Quassel.

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

1. Clone this repository

   ```bash
   cd /srv \
   && wget https://raw.githubusercontent.com/openscript-ch/quassel/refs/heads/main/docs/docker-compose.yaml \
   && wget https://raw.githubusercontent.com/openscript-ch/quassel/refs/heads/main/docs/traefik.yaml
   ```

1. Make sure that the DNS is routing all subdomains to the host where the individual services run on.
1. Replace all `example.com` with the domain where the application runs on.

   ```bash
   sed -i "s/example.com/example.ch/g" docker-compose.yaml
   ```

1. Change contact email for SSL certificates in `traefik.yaml`
1. Configure the following environment variables in `docker-compose.yaml`:
   - **todo**
1. Run application system

   ```bash
   docker compose -f docker-compose.yml up -d
   ```

### Release a new version

1. Merge the release pull request and wait for completion of the pipeline.

### Upgrade application system

1. Pull new images

   ```bash
   docker compose -f docker-compose.yml pull
   ```

1. Recreate containers

   ```bash
   docker compose -f docker-compose.yml up -d
   ```

1. Migrate database

### Maintain application system

- Create a database backup

- Archive storage

