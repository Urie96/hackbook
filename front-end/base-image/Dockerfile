FROM alpine:edge
RUN apk add --no-cache nginx-mod-http-lua && mkdir /run/nginx && touch /run/nginx/nginx.pid
CMD [ "nginx" ]