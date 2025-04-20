#!/bin/sh
set -xe

: "${API_URL?Define the api endpoint}"

envsubst < /usr/share/nginx/html/index.template.html > /usr/share/nginx/html/index.html

if [ -d /usr/share/nginx/html/icons ]; then
  cp /usr/share/nginx/html/icons/* /usr/share/nginx/html
fi

exec "$@"
