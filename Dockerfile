# Build stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM ubuntu:24.04

# Install nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Remove default nginx static assets
RUN rm -rf /var/www/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /var/www/html

# Copy custom nginx config for SPA routing
# COPY nginx.conf /etc/nginx/sites-available/default

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]