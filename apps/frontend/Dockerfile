FROM docker.io/nginx:stable-alpine

COPY dist/ /usr/share/nginx/html/
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./.docker/entrypoint.sh /

RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider --quiet http://localhost || exit 1

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
