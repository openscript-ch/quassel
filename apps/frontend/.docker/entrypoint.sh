#!/bin/sh
set -xe

: "${API_URL?Define the api endpoint}"

envsubst < /usr/share/nginx/html/index.template.html > /usr/share/nginx/html/index.html

exec "$@"
