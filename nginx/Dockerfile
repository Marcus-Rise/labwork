ARG NGINX_VERSION=1.15

# "nginx" stage
FROM nginx:${NGINX_VERSION}-alpine

COPY docker/nginx/conf.d /etc/nginx/conf.d
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf cache/*
