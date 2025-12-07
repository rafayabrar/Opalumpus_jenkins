# Frontend Dockerfile - Jenkins + Vite build fix
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Add local binaries to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy source code
COPY . .

# Use npx to ensure vite is found
RUN npx vite build

# Production stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
