# ✅ Pre-Deployment Checklist

Use this checklist to ensure everything is ready before pushing to GitHub and deploying.

## 📋 Local Testing

### Docker Setup
- [ ] Docker is installed and running
- [ ] Docker Compose is installed
- [ ] `.env` file created from `.env.example`
- [ ] `.env` file has correct MongoDB credentials
- [ ] `.env` file has correct API URLs

### Local Build Test
- [ ] Run `docker-compose build` successfully
- [ ] Run `docker-compose up -d` successfully
- [ ] All 3 containers are running (mongodb, backend, frontend)
- [ ] All containers are healthy (check with `docker ps`)
- [ ] Frontend accessible at http://localhost:5173
- [ ] Backend accessible at http://localhost:3000
- [ ] MongoDB accessible at localhost:27017

### Application Functionality
- [ ] Homepage loads without errors
- [ ] Navigation works (Home, Trips, About, Contact)
- [ ] Admin sign-in page loads
- [ ] Booking page loads
- [ ] No console errors in browser

### Selenium Tests
- [ ] Navigate to `selenium_tests/`
- [ ] Virtual environment created
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file in selenium_tests with correct URLs
- [ ] Run `pytest -v` - at least 10 tests pass
- [ ] HTML report generated

## 📦 GitHub Preparation

### Code Review
- [ ] All sensitive data removed from code
- [ ] No `.env` files committed (only `.env.example`)
- [ ] `.gitignore` is properly configured
- [ ] All Docker files are optimized
- [ ] Documentation is complete

### Git Status
- [ ] All changes staged (`git add .`)
- [ ] Meaningful commit message prepared
- [ ] Remote repository exists on GitHub
- [ ] Git remote is set (`git remote -v`)

### Files to Verify Exist
- [ ] `Jenkinsfile` in root directory
- [ ] `docker-compose.yml` in root
- [ ] `docker-compose.prod.yml` in root
- [ ] `.env.example` in root
- [ ] `Backend/Dockerfile`
- [ ] `Opalumpus_frontEnd/Dockerfile`
- [ ] `selenium_tests/` directory with all tests
- [ ] All documentation files (.md files)

## 🔧 Jenkins Server Preparation

### Server Requirements
- [ ] Server has minimum 4GB RAM
- [ ] Server has 20GB+ disk space
- [ ] Server is accessible (local or cloud)
- [ ] You have sudo/admin access

### Software Installation
- [ ] Java 11+ installed
- [ ] Jenkins installed and running
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Python 3.8+ installed
- [ ] Chrome browser installed (for Selenium)
- [ ] Git installed

### Jenkins Configuration
- [ ] Jenkins accessible at http://server:8080
- [ ] Initial admin password retrieved
- [ ] Admin user created
- [ ] Suggested plugins installed

### Required Jenkins Plugins
- [ ] Docker Pipeline
- [ ] Docker Commons Plugin
- [ ] Git Plugin
- [ ] Pipeline Plugin
- [ ] HTML Publisher Plugin
- [ ] JUnit Plugin
- [ ] Credentials Binding Plugin

### Jenkins Credentials
- [ ] Docker Hub credentials added (ID: `docker-hub-credentials`)
- [ ] MongoDB URI added (ID: `mongodb-uri`)
- [ ] GitHub credentials added (if private repo)
- [ ] Credentials IDs match Jenkinsfile

### Jenkins System Config
- [ ] Jenkins user added to docker group
- [ ] Jenkins restarted after docker group change
- [ ] Docker accessible from Jenkins (`jenkins` user can run docker)

## 🚀 Pipeline Setup

### Pipeline Job Creation
- [ ] New Pipeline job created
- [ ] Job name: `Opalumpus-CI-CD` (or similar)
- [ ] Build discard configured (keep last 10)
- [ ] GitHub hook trigger enabled
- [ ] Poll SCM configured (`H/5 * * * *`)

### Pipeline Configuration
- [ ] Pipeline definition: "Pipeline script from SCM"
- [ ] SCM: Git
- [ ] Repository URL set correctly
- [ ] Branch: `*/main`
- [ ] Script Path: `Jenkinsfile`
- [ ] Credentials selected (if needed)

### GitHub Webhook (Optional but Recommended)
- [ ] Webhook URL: `http://jenkins-url:8080/github-webhook/`
- [ ] Content type: `application/json`
- [ ] Events: "Just the push event"
- [ ] Webhook is active
- [ ] Webhook successfully delivers (check deliveries)

## 🧪 First Build Test

### Before First Build
- [ ] All credentials configured
- [ ] Docker Hub account exists
- [ ] MongoDB is accessible
- [ ] Ports are available (3000, 5173, 27017)

### Run First Build
- [ ] Click "Build Now" in Jenkins
- [ ] Build starts without errors
- [ ] Watch Console Output
- [ ] All stages execute successfully

### Expected Build Stages
- [ ] ✅ Checkout
- [ ] ✅ Environment Setup
- [ ] ✅ Cleanup Previous Builds
- [ ] ✅ Backend - Install Dependencies
- [ ] ✅ Backend - Lint & Test
- [ ] ✅ Frontend - Install Dependencies
- [ ] ✅ Frontend - Build
- [ ] ✅ Run Selenium Tests
- [ ] ✅ Build Docker Images
- [ ] ✅ Security Scan
- [ ] ✅ Push to Docker Hub (main branch)
- [ ] ✅ Deploy to Staging
- [ ] ✅ Smoke Tests

### After Build Completion
- [ ] Build status: SUCCESS
- [ ] Docker images pushed to Docker Hub
- [ ] Selenium Test Report available
- [ ] JUnit test results visible
- [ ] Application is deployed and running

## 🌐 Deployment Verification

### Container Status
- [ ] Run `docker ps` on Jenkins server
- [ ] See `opalumpus_mongodb` running
- [ ] See `opalumpus_backend` running
- [ ] See `opalumpus_frontend` running
- [ ] All containers show "healthy" status

### Application Access
- [ ] Frontend accessible: http://server:5173
- [ ] Backend API accessible: http://server:3000
- [ ] Homepage loads correctly
- [ ] No errors in browser console
- [ ] API returns data correctly

### Logs Check
- [ ] Run `docker-compose logs backend` - no errors
- [ ] Run `docker-compose logs frontend` - no errors
- [ ] Run `docker-compose logs mongodb` - no errors

## 📊 Monitoring & Reports

### Jenkins Reports
- [ ] Build history shows build #1
- [ ] Console output is available
- [ ] Selenium Test Report is accessible
- [ ] JUnit test results are visible
- [ ] Build artifacts are archived

### Test Reports
- [ ] Selenium tests passed (at least 10/15)
- [ ] HTML report is viewable
- [ ] Screenshots captured (if any failures)
- [ ] Test execution time is reasonable

## 🔄 Continuous Integration Test

### Auto-Build Test
- [ ] Make a small change in code
- [ ] Commit and push to GitHub
- [ ] Jenkins automatically detects push
- [ ] New build starts automatically
- [ ] Build completes successfully
- [ ] Changes are deployed

## 🛡️ Security Check

### Credentials Security
- [ ] No passwords in code
- [ ] No API keys in repository
- [ ] `.env` file in `.gitignore`
- [ ] Credentials stored in Jenkins securely
- [ ] Docker Hub credentials work

### Container Security
- [ ] Containers run as non-root user
- [ ] No unnecessary ports exposed
- [ ] Health checks configured
- [ ] Security scan passed (or reviewed)

## 📚 Documentation Verification

### Documentation Files
- [ ] `PROJECT_README.md` exists and is complete
- [ ] `JENKINS_SETUP.md` exists and is accurate
- [ ] `GITHUB_JENKINS_GUIDE.md` exists and is helpful
- [ ] `IMPLEMENTATION_SUMMARY.md` exists
- [ ] `selenium_tests/README.md` exists
- [ ] All documentation is up to date

## 🎯 Final Checks

### Everything Works
- [ ] Local development works (`./start.sh`)
- [ ] Docker Compose works
- [ ] Selenium tests pass locally
- [ ] Jenkins pipeline works
- [ ] GitHub webhook triggers builds
- [ ] Deployment is successful
- [ ] Application is accessible
- [ ] All documentation is accurate

### Ready for Submission
- [ ] All assignment requirements met
- [ ] Code is clean and commented
- [ ] Documentation is comprehensive
- [ ] Pipeline is fully automated
- [ ] Tests are passing
- [ ] Deployment is working

---

## ✅ Sign-Off

When all items are checked:

**Local Testing:** ☐ Complete
**GitHub Push:** ☐ Complete  
**Jenkins Setup:** ☐ Complete
**Pipeline Running:** ☐ Complete
**Deployment Working:** ☐ Complete
**Documentation Done:** ☐ Complete

**Final Status:** ☐ READY FOR SUBMISSION

---

**Notes/Issues:**
```
(Add any notes or issues encountered during setup)




```

**Date Completed:** _______________

**Verified By:** _______________
