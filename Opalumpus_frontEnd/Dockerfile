# Frontend Dockerfile - optimized for Jenkins pipeline and Vite build

# -------------------
# Build Stage
# -------------------
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files only
COPY package.json package-lock.json* ./

# Install dependencies (including Vite)
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Ensure local binaries are in PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy source code
COPY . .

# Build frontend assets using npx to ensure local vite binary is used
RUN npx vite build

# -------------------
# Production Stage
# -------------------
FROM nginx:stable-alpine AS production

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
