#!/bin/bash
# Quick start script for Opalumpus application
# This script sets up and runs the application locally

set -e

echo "🚀 Opalumpus Travel Application - Quick Start"
echo "=============================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed. Aborting." >&2; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose is required but not installed. Aborting." >&2; exit 1; }

echo "✅ Docker: $(docker --version)"
echo "✅ Docker Compose: $(docker-compose --version)"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
    echo ""
fi

# Stop existing containers
echo "🛑 Stopping any existing containers..."
docker-compose down -v 2>/dev/null || true
echo ""

# Build and start services
echo "🏗️  Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check health
echo "🏥 Checking service health..."
echo ""

MONGODB_STATUS=$(docker inspect --format='{{.State.Health.Status}}' opalumpus_mongodb 2>/dev/null || echo "not found")
BACKEND_STATUS=$(docker inspect --format='{{.State.Health.Status}}' opalumpus_backend 2>/dev/null || echo "not found")
FRONTEND_STATUS=$(docker inspect --format='{{.State.Health.Status}}' opalumpus_frontend 2>/dev/null || echo "not found")

echo "MongoDB:  $MONGODB_STATUS"
echo "Backend:  $BACKEND_STATUS"
echo "Frontend: $FRONTEND_STATUS"
echo ""

# Display running containers
echo "📊 Running containers:"
docker-compose ps
echo ""

# Success message
echo "=============================================="
echo "✅ Application started successfully!"
echo "=============================================="
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:3000"
echo "   MongoDB:   mongodb://localhost:27017"
echo ""
echo "📝 Useful commands:"
echo "   View logs:    docker-compose logs -f"
echo "   Stop:         docker-compose down"
echo "   Restart:      docker-compose restart"
echo "   Rebuild:      docker-compose up --build -d"
echo ""
echo "🧪 Run tests:"
echo "   cd selenium_tests && ./run_tests.bat (Windows)"
echo "   cd selenium_tests && python run_tests.py (All platforms)"
echo ""
