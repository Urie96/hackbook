FROM node:15.0.1-alpine3.10
COPY package*.json ./
RUN npm ci --only=production
CMD [ "npm","run start" ]