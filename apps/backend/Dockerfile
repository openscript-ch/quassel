FROM docker.io/node:22-slim
RUN apt update && apt install -y --no-install-recommends postgresql-common
RUN YES=yes /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
RUN apt install -y --no-install-recommends dumb-init curl postgresql-client-17 && apt clean && rm -rf /var/lib/apt/lists/*
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
