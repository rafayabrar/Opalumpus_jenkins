# Backend Dockerfile - multi-stage, optimized for production
FROM node:18-alpine AS deps
WORKDIR /app

# Copy only package files to install dependencies
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm install --production --no-audit --no-fund

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production
EXPOSE 4000

# Set ownership and use non-root
RUN chown -R app:app /app
USER app

# Run server - code will be mounted via docker-compose volume
CMD ["node", "server.js"]
