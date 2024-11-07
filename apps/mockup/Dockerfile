FROM docker.io/nginx:stable-alpine

COPY src/ /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider --quiet http://localhost || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
