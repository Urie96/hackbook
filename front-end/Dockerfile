FROM node:15.0.1-alpine3.12 as builder
RUN npm config set registry https://registry.npm.taobao.org
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:1.19.3-alpine as app
COPY --from=builder dist /usr/share/nginx/html