# Backend Dockerfile - Optimized for CI/CD
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for potential build steps)
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy application source
COPY . .

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps --no-audit --no-fund

# Copy application code
COPY --chown=app:app . .

# Set environment
ENV NODE_ENV=production
EXPOSE 4000

# Use non-root user
USER app

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server.js"]
