pipeline {
    agent any
    
    environment {
        // Docker Hub credentials (configure in Jenkins credentials)
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_HUB_USERNAME = "${DOCKER_HUB_CREDENTIALS_USR}"
        DOCKER_IMAGE_PREFIX = "${DOCKER_HUB_USERNAME}/opalumpus"
        
        // Version tagging
        BUILD_VERSION = "${env.BUILD_NUMBER}"
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        
        // Application configuration
        MONGODB_URI = credentials('mongodb-uri')
        VITE_API_BASE_URL = "http://localhost:3000"
        
        // Ports
        BACKEND_PORT = "3000"
        FRONTEND_PORT = "5173"
        MONGODB_PORT = "27017"
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                checkout scm
                sh '''
                    echo "Git Commit: ${GIT_COMMIT_SHORT}"
                    echo "Build Number: ${BUILD_VERSION}"
                '''
            }
        }
        
        stage('Environment Setup') {
            steps {
                echo '🔧 Setting up environment...'
                sh '''
                    # Create .env files if they don't exist
                    if [ ! -f Backend/.env ]; then
                        echo "PORT=4000" > Backend/.env
                        echo "MONGODB_URI=${MONGODB_URI}" >> Backend/.env
                        echo "NODE_ENV=production" >> Backend/.env
                    fi
                    
                    if [ ! -f Opalumpus_frontEnd/.env ]; then
                        echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > Opalumpus_frontEnd/.env
                    fi
                    
                    # Display environment info
                    echo "Node version: $(node --version)"
                    echo "NPM version: $(npm --version)"
                    echo "Docker version: $(docker --version)"
                    echo "Docker Compose version: $(docker-compose --version)"
                '''
            }
        }
        
        stage('Cleanup Previous Builds') {
            steps {
                echo '🧹 Cleaning up previous builds...'
                sh '''
                    # Stop and remove existing containers
                    docker-compose down -v || true
                    
                    # Remove dangling images
                    docker image prune -f || true
                    
                    # Clean up old build artifacts
                    rm -rf Backend/node_modules || true
                    rm -rf Opalumpus_frontEnd/node_modules || true
                    rm -rf Opalumpus_frontEnd/dist || true
                '''
            }
        }
        
        stage('Backend - Install Dependencies') {
            steps {
                echo '📦 Installing backend dependencies...'
                dir('Backend') {
                    sh '''
                        npm ci --only=production --no-audit --no-fund
                    '''
                }
            }
        }
        
        stage('Backend - Lint & Test') {
            steps {
                echo '✅ Running backend tests...'
                dir('Backend') {
                    sh '''
                        # Add your backend tests here
                        # Example: npm test
                        echo "Backend tests placeholder - add your tests"
                    '''
                }
            }
        }
        
        stage('Frontend - Install Dependencies') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir('Opalumpus_frontEnd') {
                    sh '''
                        npm ci --legacy-peer-deps --no-audit --no-fund
                    '''
                }
            }
        }
        
        stage('Frontend - Build') {
            steps {
                echo '🏗️ Building frontend...'
                dir('Opalumpus_frontEnd') {
                    sh '''
                        npm run build
                        
                        # Verify build output
                        if [ ! -d "dist" ]; then
                            echo "❌ Build failed: dist directory not found"
                            exit 1
                        fi
                        echo "✅ Frontend build successful"
                    '''
                }
            }
        }
        
        stage('Run Selenium Tests') {
            when {
                expression { fileExists('selenium_tests/test_opalumpus.py') }
            }
            steps {
                echo '🧪 Running Selenium tests...'
                dir('selenium_tests') {
                    sh '''
                        # Setup Python virtual environment
                        python3 -m venv venv || true
                        . venv/bin/activate
                        
                        # Install dependencies
                        pip install -r requirements.txt
                        
                        # Create .env for tests
                        cat > .env << EOF
BASE_URL=http://localhost:${FRONTEND_PORT}
API_URL=http://localhost:${BACKEND_PORT}
EOF
                        
                        # Start services for testing
                        cd ..
                        docker-compose up -d
                        
                        # Wait for services to be ready
                        echo "Waiting for services to be healthy..."
                        sleep 30
                        
                        # Run tests
                        cd selenium_tests
                        pytest -v --html=report.html --self-contained-html --junit-xml=results.xml || true
                    '''
                }
            }
            post {
                always {
                    // Publish test reports
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'selenium_tests',
                        reportFiles: 'report.html',
                        reportName: 'Selenium Test Report',
                        reportTitles: 'Selenium Tests'
                    ])
                    junit allowEmptyResults: true, testResults: 'selenium_tests/results.xml'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                sh '''
                    # Build backend image
                    docker build -t ${DOCKER_IMAGE_PREFIX}-backend:${BUILD_VERSION} \
                                 -t ${DOCKER_IMAGE_PREFIX}-backend:latest \
                                 ./Backend
                    
                    # Build frontend image
                    docker build -t ${DOCKER_IMAGE_PREFIX}-frontend:${BUILD_VERSION} \
                                 -t ${DOCKER_IMAGE_PREFIX}-frontend:latest \
                                 --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} \
                                 ./Opalumpus_frontEnd
                    
                    echo "✅ Docker images built successfully"
                '''
            }
        }
        
        stage('Security Scan') {
            steps {
                echo '🔒 Running security scans...'
                sh '''
                    # Install trivy if not available
                    if ! command -v trivy &> /dev/null; then
                        echo "Trivy not installed, skipping security scan"
                        echo "To enable: Install trivy on Jenkins agent"
                    else
                        # Scan backend image
                        trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE_PREFIX}-backend:${BUILD_VERSION} || true
                        
                        # Scan frontend image
                        trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE_PREFIX}-frontend:${BUILD_VERSION} || true
                    fi
                '''
            }
        }
        
        stage('Push to Docker Hub') {
            when {
                branch 'main'
            }
            steps {
                echo '📤 Pushing images to Docker Hub...'
                sh '''
                    # Login to Docker Hub
                    echo "${DOCKER_HUB_CREDENTIALS_PSW}" | docker login -u "${DOCKER_HUB_CREDENTIALS_USR}" --password-stdin
                    
                    # Push backend images
                    docker push ${DOCKER_IMAGE_PREFIX}-backend:${BUILD_VERSION}
                    docker push ${DOCKER_IMAGE_PREFIX}-backend:latest
                    
                    # Push frontend images
                    docker push ${DOCKER_IMAGE_PREFIX}-frontend:${BUILD_VERSION}
                    docker push ${DOCKER_IMAGE_PREFIX}-frontend:latest
                    
                    echo "✅ Images pushed successfully"
                '''
            }
            post {
                always {
                    sh 'docker logout || true'
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                echo '🚀 Deploying to staging environment...'
                sh '''
                    # Stop existing containers
                    docker-compose down || true
                    
                    # Pull latest images
                    docker pull ${DOCKER_IMAGE_PREFIX}-backend:${BUILD_VERSION}
                    docker pull ${DOCKER_IMAGE_PREFIX}-frontend:${BUILD_VERSION}
                    
                    # Start services with docker-compose
                    docker-compose up -d
                    
                    # Wait for services to be healthy
                    echo "Waiting for services to start..."
                    sleep 20
                    
                    # Health checks
                    echo "Checking backend health..."
                    curl -f http://localhost:${BACKEND_PORT}/ || exit 1
                    
                    echo "Checking frontend health..."
                    curl -f http://localhost:${FRONTEND_PORT}/ || exit 1
                    
                    echo "✅ Deployment successful"
                '''
            }
        }
        
        stage('Smoke Tests') {
            when {
                branch 'main'
            }
            steps {
                echo '💨 Running smoke tests on deployed application...'
                sh '''
                    # Test backend API
                    BACKEND_STATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:${BACKEND_PORT}/)
                    if [ "$BACKEND_STATUS" != "200" ]; then
                        echo "❌ Backend smoke test failed: HTTP $BACKEND_STATUS"
                        exit 1
                    fi
                    
                    # Test frontend
                    FRONTEND_STATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:${FRONTEND_PORT}/)
                    if [ "$FRONTEND_STATUS" != "200" ]; then
                        echo "❌ Frontend smoke test failed: HTTP $FRONTEND_STATUS"
                        exit 1
                    fi
                    
                    echo "✅ Smoke tests passed"
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            // Send success notification (configure email/Slack)
        }
        failure {
            echo '❌ Pipeline failed!'
            sh '''
                # Collect logs for debugging
                docker-compose logs > docker-logs.txt || true
            '''
            archiveArtifacts artifacts: 'docker-logs.txt', allowEmptyArchive: true
            // Send failure notification
        }
        always {
            echo '🧹 Cleaning up...'
            sh '''
                # Clean up Docker resources
                docker system prune -f || true
            '''
            cleanWs()
        }
    }
}
