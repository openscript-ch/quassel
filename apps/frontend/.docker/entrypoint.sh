#!/bin/sh
set -xe

: "${API_URL?Define the api endpoint}"

sed -i "s|//REPLACE_WITH_API_URL|$API_URL|g" /usr/share/nginx/html/index.html

exec "$@"
