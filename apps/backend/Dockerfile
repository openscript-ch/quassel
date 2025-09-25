FROM docker.io/node:22-slim
RUN apt-get update && \
    apt-get install -y dumb-init curl gnupg2 ca-certificates && \
    echo "deb http://apt.postgresql.org/pub/repos/apt $(. /etc/os-release && echo $VERSION_CODENAME)-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt $(. /etc/os-release && echo $VERSION_CODENAME)-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    apt-get update && \
    apt-get install -y postgresql-client-17
RUN apt-get install -y --no-install-recommends tzdata && rm -rf /var/lib/apt/lists/*
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime
ENV TZ=Etc/UTC
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app
COPY dist/deploy/ .
RUN chown -R node:node .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --head --fail http://localhost:3000/health || exit 1
CMD ["dumb-init", "node", "dist/src/main.js"]
