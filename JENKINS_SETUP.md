# Jenkins CI/CD Pipeline Setup Guide

This guide will help you set up the complete CI/CD pipeline for the Opalumpus Travel Application using Jenkins.

## 📋 Prerequisites

### On Jenkins Server
- Jenkins 2.x installed
- Docker and Docker Compose installed
- Git installed
- Python 3.8+ (for Selenium tests)
- Chrome browser (for Selenium tests)

### Required Jenkins Plugins
1. **Docker Pipeline** - For Docker commands in pipeline
2. **Git Plugin** - For Git integration
3. **Pipeline** - For pipeline jobs
4. **HTML Publisher** - For publishing test reports
5. **JUnit Plugin** - For test result visualization
6. **Credentials Plugin** - For storing secrets
7. **Blue Ocean** (Optional) - Better pipeline visualization

## 🔧 Jenkins Configuration

### Step 1: Install Required Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Go to **Available** tab
3. Search and install:
   - Docker Pipeline
   - Docker Commons
   - HTML Publisher
   - JUnit
   - Credentials Binding

### Step 2: Configure Credentials

Navigate to **Manage Jenkins** → **Manage Credentials** → **Global**

#### A. Docker Hub Credentials
1. Click **Add Credentials**
2. Kind: **Username with password**
3. Scope: **Global**
4. Username: Your Docker Hub username
5. Password: Your Docker Hub password/token
6. ID: `docker-hub-credentials`
7. Description: Docker Hub Credentials

#### B. MongoDB URI
1. Click **Add Credentials**
2. Kind: **Secret text**
3. Secret: `mongodb://admin:admin123@mongodb:27017/opalumpus?authSource=admin`
4. ID: `mongodb-uri`
5. Description: MongoDB Connection String

### Step 3: Configure System

1. Go to **Manage Jenkins** → **Configure System**
2. Under **Global properties**, check **Environment variables**
3. Add:
   - Name: `DOCKER_HOST`
   - Value: `unix:///var/run/docker.sock` (Linux) or `tcp://localhost:2375` (Windows)

### Step 4: Create Jenkins Pipeline Job

1. Click **New Item**
2. Enter name: `Opalumpus-CI-CD`
3. Select: **Pipeline**
4. Click **OK**

#### Configure Pipeline

**General Section:**
- ✅ Discard old builds
  - Strategy: Log Rotation
  - Max # of builds to keep: 10

**Build Triggers:**
- ✅ GitHub hook trigger for GITScm polling
- ✅ Poll SCM: `H/5 * * * *` (every 5 minutes)

**Pipeline Section:**
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/rafayabrar/Opalumpus_jenkins.git`
- Credentials: Add your GitHub credentials
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile`

Click **Save**

## 🐙 GitHub Configuration

### Step 1: Push Code to GitHub

```bash
cd C:\Users\rafay\Documents\GitHub\Opalumpus_jenkins
git add .
git commit -m "Add Jenkins CI/CD pipeline configuration"
git push origin main
```

### Step 2: Configure GitHub Webhook (Optional)

1. Go to your GitHub repository
2. Settings → Webhooks → Add webhook
3. Payload URL: `http://your-jenkins-url:8080/github-webhook/`
4. Content type: `application/json`
5. Events: **Just the push event**
6. Active: ✅

## 🚀 Running the Pipeline

### Manual Trigger
1. Go to your Jenkins job
2. Click **Build Now**
3. Watch the pipeline execute

### Automatic Trigger
- Push to GitHub main branch
- Or wait for scheduled poll

## 📊 Pipeline Stages Overview

The pipeline includes the following stages:

1. **Checkout** - Clones code from GitHub
2. **Environment Setup** - Configures environment variables
3. **Cleanup Previous Builds** - Removes old containers/images
4. **Backend - Install Dependencies** - Installs Node.js packages
5. **Backend - Lint & Test** - Runs backend tests
6. **Frontend - Install Dependencies** - Installs frontend packages
7. **Frontend - Build** - Builds React application
8. **Run Selenium Tests** - Executes automated UI tests
9. **Build Docker Images** - Creates Docker images
10. **Security Scan** - Scans for vulnerabilities (if Trivy installed)
11. **Push to Docker Hub** - Publishes images (main branch only)
12. **Deploy to Staging** - Deploys application
13. **Smoke Tests** - Validates deployment

## 🔒 Security Best Practices

### 1. Secure Credentials
Never commit sensitive data. Use Jenkins credentials:
```groovy
environment {
    MONGODB_URI = credentials('mongodb-uri')
    DOCKER_CREDS = credentials('docker-hub-credentials')
}
```

### 2. Use Docker BuildKit
Add to Jenkins environment:
```bash
DOCKER_BUILDKIT=1
COMPOSE_DOCKER_CLI_BUILD=1
```

### 3. Scan Images
Install Trivy on Jenkins agent:
```bash
# Ubuntu/Debian
sudo apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy
```

## 🌐 Deployment Options

### Option 1: Local Staging (Default)
Pipeline deploys to Jenkins server using docker-compose

### Option 2: Remote Server
1. Add SSH credentials in Jenkins
2. Modify deploy stage:
```groovy
stage('Deploy to Production') {
    steps {
        sshagent(['production-server-ssh']) {
            sh '''
                scp docker-compose.prod.yml deploy.sh user@server:/app/
                ssh user@server "cd /app && ./deploy.sh"
            '''
        }
    }
}
```

### Option 3: Kubernetes
Use kubectl in pipeline:
```groovy
stage('Deploy to K8s') {
    steps {
        sh 'kubectl apply -f k8s/'
    }
}
```

## 📧 Notifications

### Email Notifications
Add to post section in Jenkinsfile:
```groovy
post {
    success {
        emailext (
            subject: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Build successful!",
            to: "your-email@example.com"
        )
    }
    failure {
        emailext (
            subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Build failed!",
            to: "your-email@example.com"
        )
    }
}
```

### Slack Notifications
Install Slack Notification plugin:
```groovy
post {
    success {
        slackSend (
            color: 'good',
            message: "Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        )
    }
}
```

## 🐛 Troubleshooting

### Issue: Permission Denied for Docker
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Issue: Selenium Tests Failing
1. Ensure Chrome is installed on Jenkins agent
2. Check if ports 3000 and 5173 are available
3. Increase wait times in Selenium tests

### Issue: Build Fails on Main Branch
1. Check credentials are configured
2. Verify Docker Hub account exists
3. Check network connectivity

### Issue: Docker Compose Not Found
```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

## 📈 Monitoring

### View Logs
```bash
# Container logs
docker-compose logs -f

# Jenkins logs
tail -f /var/log/jenkins/jenkins.log
```

### Check Service Health
```bash
docker-compose ps
docker inspect opalumpus_backend | grep Health
```

## 🎯 Next Steps

1. ✅ Set up Jenkins with required plugins
2. ✅ Configure credentials
3. ✅ Create pipeline job
4. ✅ Push code to GitHub
5. ✅ Run first build
6. ✅ Monitor pipeline execution
7. ✅ Access deployed application
8. ✅ Set up notifications

## 📚 Additional Resources

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Docker Documentation](https://docs.docker.com/)
- [Selenium Documentation](https://selenium-python.readthedocs.io/)
- [Trivy Security Scanner](https://github.com/aquasecurity/trivy)

---

**Support:** For issues, check the Jenkins console output and Docker logs.
