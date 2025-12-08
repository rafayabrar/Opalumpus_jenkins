# 🚀 Complete Guide: GitHub Push + Jenkins Pipeline Setup

This guide walks you through pushing your code to GitHub and setting up the complete Jenkins CI/CD pipeline.

## Part 1: Push Code to GitHub

### Step 1: Prepare Repository

```bash
# Navigate to project directory
cd C:\Users\rafay\Documents\GitHub\Opalumpus_jenkins

# Check current status
git status
```

### Step 2: Add All Files

```bash
# Stage all changes
git add .

# Review what will be committed
git status
```

### Step 3: Commit Changes

```bash
# Commit with descriptive message
git commit -m "Add complete CI/CD pipeline with Jenkins, Docker, and Selenium tests"
```

### Step 4: Push to GitHub

```bash
# Push to main branch
git push origin main

# If you're pushing for the first time
git push -u origin main
```

### Step 5: Verify on GitHub

1. Go to https://github.com/rafayabrar/Opalumpus_jenkins
2. Verify all files are present:
   - ✅ Jenkinsfile
   - ✅ docker-compose.yml
   - ✅ docker-compose.prod.yml
   - ✅ Backend/Dockerfile
   - ✅ Opalumpus_frontEnd/Dockerfile
   - ✅ selenium_tests/
   - ✅ .env.example
   - ✅ All documentation files

---

## Part 2: Jenkins Server Setup

### Prerequisites

You need a server (local or cloud) with:
- Ubuntu 20.04+ or similar Linux distribution
- Minimum 4GB RAM, 2 CPU cores
- 20GB+ disk space
- Sudo/root access

### Option A: Install on Local Machine

#### Step 1: Install Java

```bash
sudo apt update
sudo apt install -y openjdk-11-jdk
java -version
```

#### Step 2: Install Jenkins

```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins
```

#### Step 3: Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Install Docker Compose
sudo apt install -y docker-compose-plugin

# Restart Jenkins
sudo systemctl restart jenkins
```

#### Step 4: Install Chrome (for Selenium)

```bash
# Install Chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | \
  sudo tee /etc/apt/sources.list.d/google-chrome.list

sudo apt update
sudo apt install -y google-chrome-stable

# Verify
google-chrome --version
```

#### Step 5: Install Python (for Selenium)

```bash
sudo apt install -y python3 python3-pip python3-venv
python3 --version
pip3 --version
```

### Option B: AWS EC2 Setup

#### Step 1: Launch EC2 Instance

1. **Login to AWS Console**
2. **Launch Instance**:
   - AMI: Ubuntu Server 22.04 LTS
   - Instance Type: t2.medium (minimum)
   - Storage: 20GB
   - Security Group: 
     - SSH (22) - Your IP
     - HTTP (80) - Anywhere
     - Custom (8080) - Anywhere (Jenkins)
     - Custom (3000) - Anywhere (Backend)
     - Custom (5173) - Anywhere (Frontend)

#### Step 2: Connect to EC2

```bash
# Download your .pem key and connect
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

#### Step 3: Install Everything

Run the same commands as Option A (Steps 1-5)

---

## Part 3: Configure Jenkins

### Step 1: Access Jenkins

1. Open browser: `http://localhost:8080` or `http://your-ec2-ip:8080`
2. Get initial password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

3. Paste password and continue

### Step 2: Install Plugins

1. Select **Install suggested plugins**
2. Wait for installation to complete
3. Additionally install these plugins:
   - Go to **Manage Jenkins** → **Manage Plugins**
   - **Available** tab:
     - Docker Pipeline
     - Docker Commons Plugin
     - HTML Publisher
     - JUnit Plugin
     - Blue Ocean (optional, for better UI)
   - Click **Install without restart**

### Step 3: Create Admin User

1. Fill in your details:
   - Username: `admin`
   - Password: (choose strong password)
   - Full Name: Your Name
   - Email: your-email@example.com
2. Click **Save and Continue**

### Step 4: Configure Jenkins URL

1. Set Jenkins URL to `http://your-server-ip:8080`
2. Click **Save and Finish**

---

## Part 4: Configure Credentials

### Step 1: Docker Hub Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **Global** → **Add Credentials**
3. Configure:
   - Kind: **Username with password**
   - Scope: **Global**
   - Username: `your-dockerhub-username`
   - Password: `your-dockerhub-password-or-token`
   - ID: `docker-hub-credentials`
   - Description: `Docker Hub Credentials`
4. Click **Create**

### Step 2: MongoDB URI

1. Add another credential
2. Configure:
   - Kind: **Secret text**
   - Scope: **Global**
   - Secret: `mongodb://admin:admin123@mongodb:27017/opalumpus?authSource=admin`
   - ID: `mongodb-uri`
   - Description: `MongoDB Connection String`
3. Click **Create**

### Step 3: GitHub Credentials (Optional)

1. Add another credential
2. Configure:
   - Kind: **Username with password**
   - Username: `your-github-username`
   - Password: `github-personal-access-token`
   - ID: `github-credentials`
3. Click **Create**

**To create GitHub token:**
- GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Select scopes: `repo`, `admin:repo_hook`
- Copy token immediately (won't see it again)

---

## Part 5: Create Jenkins Pipeline

### Step 1: Create New Job

1. Click **New Item**
2. Enter name: `Opalumpus-CI-CD`
3. Select: **Pipeline**
4. Click **OK**

### Step 2: Configure General Settings

**General Section:**
- ✅ Description: `CI/CD pipeline for Opalumpus Travel Application`
- ✅ Discard old builds
  - Strategy: **Log Rotation**
  - Days to keep: `30`
  - Max # of builds: `10`

### Step 3: Configure Build Triggers

Check these options:
- ✅ **GitHub hook trigger for GITScm polling**
- ✅ **Poll SCM**: `H/5 * * * *`
  - (Checks GitHub every 5 minutes)

### Step 4: Configure Pipeline

**Pipeline Section:**
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/rafayabrar/Opalumpus_jenkins.git`
- Credentials: Select GitHub credentials (if private repo)
- Branches to build: `*/main`
- Script Path: `Jenkinsfile`

### Step 5: Save Configuration

Click **Save**

---

## Part 6: Configure GitHub Webhook (Optional but Recommended)

This enables automatic builds when you push to GitHub.

### Step 1: Get Jenkins URL

Note your Jenkins URL: `http://your-server-ip:8080`

### Step 2: Configure Webhook

1. Go to GitHub repository
2. **Settings** → **Webhooks** → **Add webhook**
3. Configure:
   - Payload URL: `http://your-jenkins-url:8080/github-webhook/`
   - Content type: `application/json`
   - Secret: (leave empty or use a secret)
   - Which events: **Just the push event**
   - ✅ Active
4. Click **Add webhook**

### Verify Webhook

Push a test commit and check:
- GitHub shows ✅ green checkmark on webhook
- Jenkins automatically starts build

---

## Part 7: Run Your First Build

### Manual Build

1. Go to Jenkins dashboard
2. Click on `Opalumpus-CI-CD` job
3. Click **Build Now**
4. Watch the build in **Build History**
5. Click on build #1
6. Click **Console Output** to see logs

### Build Stages to Expect

You should see these stages execute:
1. ✅ Checkout
2. ✅ Environment Setup
3. ✅ Cleanup Previous Builds
4. ✅ Backend - Install Dependencies
5. ✅ Backend - Lint & Test
6. ✅ Frontend - Install Dependencies
7. ✅ Frontend - Build
8. ✅ Run Selenium Tests
9. ✅ Build Docker Images
10. ✅ Security Scan
11. ✅ Push to Docker Hub (main branch only)
12. ✅ Deploy to Staging
13. ✅ Smoke Tests

### Expected Build Time

- First build: 10-15 minutes (downloads dependencies)
- Subsequent builds: 5-8 minutes

---

## Part 8: Verify Deployment

### Check Running Containers

```bash
docker ps
```

You should see:
- `opalumpus_mongodb`
- `opalumpus_backend`
- `opalumpus_frontend`

### Access Application

1. **Frontend**: http://localhost:5173 or http://your-server-ip:5173
2. **Backend API**: http://localhost:3000 or http://your-server-ip:3000
3. **Health Check**: http://localhost:3000/

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Part 9: View Test Reports

### Selenium Test Report

1. In Jenkins, go to your build
2. Click **Selenium Test Report** in left sidebar
3. View detailed test results with screenshots

### JUnit Test Results

1. In Jenkins build view
2. Click **Test Result**
3. See pass/fail statistics

---

## Troubleshooting

### Issue: Build Fails at Docker Stage

**Solution:**
```bash
# Ensure Jenkins user can access Docker
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Issue: Selenium Tests Fail

**Possible causes:**
1. Chrome not installed
2. Application not running
3. Ports already in use

**Solution:**
```bash
# Install Chrome
sudo apt install -y google-chrome-stable

# Check ports
sudo netstat -tlnp | grep -E '3000|5173'
```

### Issue: Cannot Push to Docker Hub

**Solution:**
1. Verify Docker Hub credentials in Jenkins
2. Check credential ID matches Jenkinsfile: `docker-hub-credentials`
3. Ensure Docker Hub repository exists

### Issue: GitHub Webhook Not Working

**Solution:**
1. Verify Jenkins URL is accessible from internet
2. Check webhook delivery in GitHub settings
3. Ensure Jenkins is listening on `0.0.0.0`, not `127.0.0.1`

---

## Summary Checklist

Before deploying, ensure:

- [x] Code pushed to GitHub
- [x] Jenkins installed and running
- [x] Docker installed on Jenkins server
- [x] Jenkins plugins installed
- [x] Credentials configured in Jenkins
- [x] Pipeline job created
- [x] GitHub webhook configured (optional)
- [x] First build successful
- [x] Application accessible
- [x] Tests passing

---

## Next Steps

1. **Monitor builds**: Set up email/Slack notifications
2. **Add more tests**: Expand test coverage
3. **Production deployment**: Deploy to production server
4. **Scale**: Use Kubernetes for orchestration
5. **Monitoring**: Add Prometheus/Grafana

---

## Support & Documentation

- **Jenkins Docs**: [JENKINS_SETUP.md](JENKINS_SETUP.md)
- **Project README**: [PROJECT_README.md](PROJECT_README.md)
- **Selenium Tests**: [selenium_tests/README.md](selenium_tests/README.md)

---

**🎉 Congratulations! Your CI/CD pipeline is now fully automated!**

Every push to `main` branch will:
1. ✅ Run all tests
2. ✅ Build Docker images
3. ✅ Push to Docker Hub
4. ✅ Deploy application
5. ✅ Verify deployment
