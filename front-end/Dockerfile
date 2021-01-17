# FROM node:14.15.0-alpine3.12 as builder
# WORKDIR /tmp
# RUN npm config set registry https://registry.npm.taobao.org
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

FROM nginx-brotli:alpine as app
# COPY --from=builder /tmp/dist /usr/share/nginx/html
COPY ./dist /root
COPY ./nginx-conf /etc/nginx/