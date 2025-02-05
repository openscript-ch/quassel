FROM docker.io/node:22-alpine
RUN apk add --no-cache dumb-init curl postgresql17-client
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app
COPY dist/ .
RUN chown -R node:node .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --head --fail http://localhost:3000/health || exit 1
CMD ["dumb-init", "node", "src/main.js"]
