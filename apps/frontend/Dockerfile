FROM docker.io/nginx:stable-alpine

COPY dist/ /usr/share/nginx/html/
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./.docker/entrypoint.sh /

RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
