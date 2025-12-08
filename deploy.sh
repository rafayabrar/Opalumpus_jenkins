#!/bin/bash
# Deployment script for production server
# Usage: ./deploy.sh [version]

set -e

VERSION=${1:-latest}
COMPOSE_FILE="docker-compose.prod.yml"

echo "🚀 Deploying Opalumpus Travel Application - Version: $VERSION"

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Error: .env file not found"
    echo "Please create .env from .env.example"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    exit 1
fi

# Pull latest images
echo "📥 Pulling Docker images..."
docker-compose -f $COMPOSE_FILE pull

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f $COMPOSE_FILE down

# Start new containers
echo "▶️  Starting containers..."
docker-compose -f $COMPOSE_FILE up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Health checks
echo "🏥 Running health checks..."

BACKEND_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' opalumpus_backend_prod)
FRONTEND_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' opalumpus_frontend_prod)
MONGODB_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' opalumpus_mongodb_prod)

echo "Backend: $BACKEND_HEALTH"
echo "Frontend: $FRONTEND_HEALTH"
echo "MongoDB: $MONGODB_HEALTH"

if [ "$BACKEND_HEALTH" != "healthy" ] || [ "$FRONTEND_HEALTH" != "healthy" ] || [ "$MONGODB_HEALTH" != "healthy" ]; then
    echo "❌ Some services are not healthy"
    echo "Checking logs..."
    docker-compose -f $COMPOSE_FILE logs --tail=50
    exit 1
fi

# Show running containers
echo "📊 Running containers:"
docker-compose -f $COMPOSE_FILE ps

echo "✅ Deployment completed successfully!"
echo "🌐 Frontend: http://localhost:80"
echo "🔧 Backend: http://localhost:3000"
