FROM nginx:1.21.0-alpine-perl

COPY /server/nginx.conf /etc/nginx/nginx.conf
COPY /server/includes /etc/nginx/includes

RUN chown -R 101:101 /var/cache/nginx /etc/nginx/ /var/run/

USER 101

EXPOSE 8080
