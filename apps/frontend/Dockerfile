FROM docker.io/nginx:stable-alpine

COPY dist/ /usr/share/nginx/html/
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/index.template.html
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./.docker/entrypoint.sh /

RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --head --fail http://localhost || exit 1

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
