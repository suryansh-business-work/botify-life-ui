FROM node:23 AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD [ "npm", "run", "dev" ]