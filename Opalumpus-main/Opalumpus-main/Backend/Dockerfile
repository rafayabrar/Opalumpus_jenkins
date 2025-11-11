# Backend Dockerfile - multi-stage, optimized for small production image
# Builds a lean runtime image and runs the Express server as a non-root user

FROM node:18-alpine AS deps
WORKDIR /app

# Install only production dependencies. If you add devDependencies, use a lockfile
COPY package.json package-lock.json* ./
RUN npm install --production --no-audit --no-fund

FROM node:18-alpine AS runner
WORKDIR /app

# Create a non-root user to run the app
RUN addgroup -S app && adduser -S app -G app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy app source
COPY . .

ENV NODE_ENV=production
EXPOSE 4000

# Ensure files are readable by the non-root user
RUN chown -R app:app /app
USER app

# Start the server (server.js is the entry in this project)
CMD ["node", "server.js"]
