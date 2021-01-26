FROM node:14.15.0-alpine3.12
WORKDIR /home
RUN npm config set registry https://registry.npm.taobao.org
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "npm", "start" ]