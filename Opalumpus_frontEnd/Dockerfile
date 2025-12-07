# Frontend Dockerfile - for Jenkins pipeline and Vite build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files only
COPY package.json package-lock.json* ./

# Install dependencies (including Vite)
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code (will be replaced by volume in docker-compose)
COPY . .

# Build the frontend assets
RUN npm run build

# Production stage - serve via nginx
FROM nginx:stable-alpine AS production

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
