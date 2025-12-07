# Frontend Dockerfile - multi-stage build (Vite) and serve via nginx

FROM node:18-alpine AS build
WORKDIR /app

# Install deps and build the production assets
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production

# Copy built static files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Use a custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
