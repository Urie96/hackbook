FROM alpine:3.12.3

LABEL maintainer "By Urie96 - https://github.com/Urie96"

ENV NGINX_VERSION 1.19.6

RUN set -ex \
  && apk add --no-cache \
  ca-certificates libressl pcre zlib \
  && apk add --no-cache --virtual .build-deps \
  build-base autoconf automake libtool linux-headers libressl-dev pcre-dev zlib-dev git \
  && cd /tmp \
  && wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
  && tar xf nginx-${NGINX_VERSION}.tar.gz \
  && git clone https://github.com/google/ngx_brotli.git \
  && cd ngx_brotli \
  && git submodule update --init \
  && cd /tmp \
  && cd nginx-${NGINX_VERSION} \
  && ./configure \
  --sbin-path=/usr/sbin/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --add-module=/tmp/ngx_brotli \
  --with-http_v2_module \
  --with-http_gzip_static_module \
  --with-http_ssl_module \
  && make -j$(getconf _NPROCESSORS_ONLN) \
  && make install \
  && apk del .build-deps \
  && rm -rf /tmp/*

EXPOSE 80 443

CMD ["nginx","-g","daemon off;"]