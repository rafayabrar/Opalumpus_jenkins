# Opalumpus Travel Application - CI/CD Pipeline

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Docker](https://img.shields.io/badge/docker-enabled-blue)]()
[![Jenkins](https://img.shields.io/badge/jenkins-automated-red)]()

A full-stack travel booking application with automated CI/CD pipeline using Jenkins, Docker, and Selenium testing.

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React.js      │────▶│   Node.js/      │────▶│   MongoDB       │
│   Frontend      │     │   Express API   │     │   Database      │
│   (Port 5173)   │     │   (Port 3000)   │     │   (Port 27017)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        │
         └───────────────────────┴────────────────────────┘
                              Docker Network
```

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [CI/CD Pipeline](#cicd-pipeline)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## ✨ Features

- 🌐 **Full-Stack Application**: React frontend + Node.js backend + MongoDB
- 🔄 **CI/CD Pipeline**: Automated Jenkins pipeline
- 🐳 **Dockerized**: Complete Docker containerization
- 🧪 **Automated Testing**: Selenium test suite (15 test cases)
- 📊 **Health Checks**: Built-in health monitoring
- 🔒 **Security Scanning**: Container vulnerability scanning
- 📦 **Multi-Stage Builds**: Optimized Docker images
- 🚀 **Auto Deployment**: Push to deploy workflow

## 🛠️ Technology Stack

### Frontend
- React 19.0.0
- Vite 5.0.11
- React Router DOM 7.9.4
- Axios 1.7.9

### Backend
- Node.js 18
- Express 4.21.2
- MongoDB 8.9.2 (Mongoose)
- JWT Authentication

### DevOps
- Docker & Docker Compose
- Jenkins Pipeline
- Selenium WebDriver
- Python (Pytest)
- Nginx

## 📦 Prerequisites

### Local Development
- Node.js 18+ and npm
- Python 3.8+
- Docker and Docker Compose
- Git

### CI/CD Server
- Jenkins 2.x
- Docker and Docker Compose
- Chrome browser (for Selenium)
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/rafayabrar/Opalumpus_jenkins.git
cd Opalumpus_jenkins
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Run with Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017

## 🔄 CI/CD Pipeline

### Pipeline Stages

1. **Checkout** - Clone code from GitHub
2. **Environment Setup** - Configure build environment
3. **Cleanup** - Remove old builds
4. **Backend Build** - Install dependencies & test
5. **Frontend Build** - Build React application
6. **Selenium Tests** - Run automated UI tests
7. **Docker Build** - Create container images
8. **Security Scan** - Scan for vulnerabilities
9. **Push Images** - Upload to Docker Hub
10. **Deploy** - Deploy to staging environment
11. **Smoke Tests** - Validate deployment

### Running the Pipeline

#### Automatic (GitHub Push)
```bash
git add .
git commit -m "Your changes"
git push origin main
```
Jenkins automatically detects the push and runs the pipeline.

#### Manual Trigger
1. Open Jenkins
2. Navigate to `Opalumpus-CI-CD` job
3. Click **Build Now**

### Pipeline Configuration

See [JENKINS_SETUP.md](JENKINS_SETUP.md) for detailed setup instructions.

## 🐳 Docker Setup

### Development Mode
```bash
# Build and run
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Production Mode
```bash
# Use production compose file
docker-compose -f docker-compose.prod.yml up -d

# Or use deployment script
chmod +x deploy.sh
./deploy.sh
```

### Individual Services

#### Backend
```bash
cd Backend
docker build -t opalumpus-backend .
docker run -p 3000:4000 \
  -e MONGODB_URI=mongodb://localhost:27017/opalumpus \
  opalumpus-backend
```

#### Frontend
```bash
cd Opalumpus_frontEnd
docker build -t opalumpus-frontend .
docker run -p 5173:80 opalumpus-frontend
```

## 🧪 Testing

### Selenium Tests

#### Setup
```bash
cd selenium_tests
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

#### Run Tests
```bash
# All tests
pytest -v

# Specific categories
pytest -m smoke       # Smoke tests
pytest -m critical    # Critical tests
pytest -m regression  # Regression tests

# With HTML report
pytest --html=report.html --self-contained-html
```

#### Windows Quick Start
```cmd
cd selenium_tests
.\run_tests.bat
```

### Test Coverage
- ✅ 15 comprehensive test cases
- ✅ Homepage functionality
- ✅ Navigation testing
- ✅ Form validation
- ✅ Authentication flows
- ✅ API integration
- ✅ Responsive design

See [selenium_tests/README.md](selenium_tests/README.md) for details.

## 📂 Project Structure

```
Opalumpus_jenkins/
├── Backend/                    # Node.js backend
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── server.js             # Entry point
│   ├── Dockerfile            # Backend container
│   └── package.json          # Dependencies
│
├── Opalumpus_frontEnd/        # React frontend
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── Routes/          # Page components
│   │   └── assets/          # Static assets
│   ├── Dockerfile           # Frontend container
│   ├── nginx.conf           # Nginx configuration
│   ├── vite.config.ts       # Vite config
│   └── package.json         # Dependencies
│
├── selenium_tests/           # Automated tests
│   ├── test_opalumpus.py    # Test cases
│   ├── conftest.py          # Test configuration
│   ├── requirements.txt     # Python packages
│   ├── run_tests.bat        # Windows runner
│   └── README.md            # Test documentation
│
├── docker-compose.yml        # Development compose
├── docker-compose.prod.yml   # Production compose
├── Jenkinsfile              # CI/CD pipeline
├── deploy.sh                # Deployment script
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── .dockerignore           # Docker ignore rules
├── JENKINS_SETUP.md        # Jenkins guide
└── README.md               # This file
```

## 🚀 Deployment

### Local/Staging Deployment
```bash
docker-compose up -d
```

### Production Deployment

#### Option 1: Docker Compose
```bash
# On production server
docker-compose -f docker-compose.prod.yml up -d
```

#### Option 2: Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

#### Option 3: Jenkins Pipeline
Push to `main` branch - Jenkins handles everything automatically.

### Health Checks
```bash
# Backend
curl http://localhost:3000/

# Frontend
curl http://localhost:5173/

# Check container health
docker ps
docker inspect opalumpus_backend | grep Health
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/opalumpus?authSource=admin
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Docker Compose
- **Development**: Uses `docker-compose.yml`
- **Production**: Uses `docker-compose.prod.yml`

## 📊 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Container Stats
```bash
docker stats
```

### Health Status
```bash
docker-compose ps
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Change port in docker-compose.yml
```

#### MongoDB Connection Issues
```bash
# Check MongoDB is running
docker-compose ps mongodb

# View MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec -it opalumpus_mongodb mongosh
```

#### Build Failures
```bash
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📚 Documentation

- [Jenkins Setup Guide](JENKINS_SETUP.md)
- [Selenium Tests](selenium_tests/README.md)
- [Test Setup Guide](selenium_tests/SETUP_GUIDE.md)
- [Quick Reference](selenium_tests/QUICK_REFERENCE.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is part of an academic assignment.

## 👥 Authors

- Rafay Abrar

## 🙏 Acknowledgments

- MongoDB for database
- Docker for containerization
- Jenkins for CI/CD automation
- Selenium for test automation

---

**Made with ❤️ for DevOps Excellence**
