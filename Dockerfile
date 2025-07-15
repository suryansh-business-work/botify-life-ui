FROM node:23 AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
CMD [ "serve", "-s", "dist" ]