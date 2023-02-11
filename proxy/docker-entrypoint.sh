#!/usr/bin/env bash
set -eu

envsubst '${NEST1} ${NEST2} ${NEST_PORT}' < /etc/nginx/conf.d/project.conf.template > /etc/nginx/conf.d/project.conf

exec "$@"