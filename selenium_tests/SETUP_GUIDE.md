# Selenium Test Setup Guide for Jenkins/AWS EC2

This guide provides step-by-step instructions for setting up and running Selenium tests locally and in Jenkins on AWS EC2.

## Table of Contents
1. [Local Setup (Windows)](#local-setup-windows)
2. [Local Setup (Linux/Mac)](#local-setup-linuxmac)
3. [AWS EC2 Setup](#aws-ec2-setup)
4. [Jenkins Integration](#jenkins-integration)
5. [Troubleshooting](#troubleshooting)

---

## Local Setup (Windows)

### Prerequisites
- Python 3.8+ installed
- Google Chrome installed
- Git installed

### Step 1: Clone Repository
```powershell
cd C:\path\to\your\projects
git clone <your-repo-url>
cd Opalumpus_jenkins
```

### Step 2: Navigate to Test Directory
```powershell
cd selenium_tests
```

### Step 3: Run Setup Script
```powershell
.\run_tests.ps1
```

This script will:
- Create a virtual environment
- Install all dependencies
- Create .env file from template
- Run the test suite

### Manual Setup (Alternative)
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create .env file
Copy-Item .env.example .env

# Edit .env with your settings
notepad .env

# Run tests
pytest -v --html=report.html --self-contained-html
```

---

## Local Setup (Linux/Mac)

### Prerequisites
- Python 3.8+ installed
- Google Chrome installed
- Git installed

### Step 1: Clone Repository
```bash
cd ~/projects
git clone <your-repo-url>
cd Opalumpus_jenkins/selenium_tests
```

### Step 2: Run Setup
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your settings
nano .env  # or vim, code, etc.

# Run tests
pytest -v --html=report.html --self-contained-html
```

### Using Python Script
```bash
python3 run_tests.py
```

---

## AWS EC2 Setup

### Step 1: Launch EC2 Instance
- AMI: Ubuntu Server 22.04 LTS
- Instance Type: t2.medium (minimum)
- Security Group: Open ports 22, 80, 3000, 5173, 8080

### Step 2: Connect to EC2
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 3: Install System Dependencies
```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Python and pip
sudo apt-get install -y python3 python3-pip python3-venv

# Install Chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update
sudo apt-get install -y google-chrome-stable

# Install additional dependencies
sudo apt-get install -y xvfb libxi6 libgconf-2-4

# Verify Chrome installation
google-chrome --version
```

### Step 4: Install Node.js (for application)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

### Step 5: Clone and Setup Project
```bash
cd ~
git clone <your-repo-url>
cd Opalumpus_jenkins

# Setup backend
cd Backend
npm install
# Create .env file with MongoDB connection string
nano .env

# Setup frontend
cd ../Opalumpus_frontEnd
npm install

# Setup Selenium tests
cd ../selenium_tests
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure test URLs for EC2
cp .env.example .env
nano .env
# Update BASE_URL and API_URL to use EC2 public IP or localhost
```

### Step 6: Start Application Services
```bash
# In one terminal - Backend
cd ~/Opalumpus_jenkins/Backend
nohup npm start > backend.log 2>&1 &

# In another terminal - Frontend
cd ~/Opalumpus_jenkins/Opalumpus_frontEnd
nohup npm run dev > frontend.log 2>&1 &

# Verify services are running
curl http://localhost:3000
curl http://localhost:5173
```

### Step 7: Run Tests
```bash
cd ~/Opalumpus_jenkins/selenium_tests
source venv/bin/activate
pytest -v --html=report.html --self-contained-html
```

---

## Jenkins Integration

### Step 1: Install Jenkins on EC2
```bash
# Install Java
sudo apt-get install -y openjdk-11-jdk

# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt-get update
sudo apt-get install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Step 2: Configure Jenkins
1. Access Jenkins at `http://your-ec2-ip:8080`
2. Enter initial admin password
3. Install suggested plugins
4. Create admin user

### Step 3: Install Required Jenkins Plugins
- HTML Publisher Plugin
- JUnit Plugin
- Git Plugin
- Pipeline Plugin

### Step 4: Create Jenkins Pipeline Job
1. Click "New Item"
2. Enter name: "Opalumpus-Selenium-Tests"
3. Select "Pipeline"
4. Click "OK"

### Step 5: Configure Pipeline
In the Pipeline section, select "Pipeline script from SCM":
- SCM: Git
- Repository URL: Your Git repo URL
- Script Path: `Jenkinsfile.selenium`

### Step 6: Build the Pipeline
Click "Build Now" to run the pipeline.

### Alternative: Direct Pipeline Script
Copy the contents of `Jenkinsfile.selenium` into the Pipeline script section.

---

## Running Tests in Different Modes

### Run All Tests
```bash
pytest
```

### Run Specific Test Categories
```bash
# Smoke tests only
pytest -m smoke

# Critical tests only
pytest -m critical

# Regression tests only
pytest -m regression
```

### Run with Different Output Formats
```bash
# Verbose output
pytest -v

# Generate HTML report
pytest --html=report.html --self-contained-html

# Generate JUnit XML (for Jenkins)
pytest --junit-xml=results.xml

# All together
pytest -v --html=report.html --self-contained-html --junit-xml=results.xml
```

### Run Specific Test
```bash
pytest test_opalumpus.py::TestOpalumpusApplication::test_homepage_loads
```

---

## Environment Variables

Create a `.env` file with:

```env
# For local development
BASE_URL=http://localhost:5173
API_URL=http://localhost:3000

# For EC2 deployment (replace with your EC2 IP)
# BASE_URL=http://your-ec2-ip:5173
# API_URL=http://your-ec2-ip:3000

# For production (replace with your domain)
# BASE_URL=https://your-domain.com
# API_URL=https://api.your-domain.com
```

---

## Troubleshooting

### Chrome Not Found
```bash
# Install Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt-get install -f
```

### ChromeDriver Version Mismatch
The tests use `webdriver-manager` which automatically downloads the correct ChromeDriver version. If issues persist:
```bash
pip install --upgrade webdriver-manager
```

### Tests Timing Out
Increase timeout values in `conftest.py`:
```python
driver.implicitly_wait(20)  # Increase from 10 to 20 seconds
```

### Application Not Running
Verify services:
```bash
# Check if backend is running
curl http://localhost:3000

# Check if frontend is running
curl http://localhost:5173

# Check process
ps aux | grep node
ps aux | grep npm
```

### Permission Denied on Scripts
```bash
chmod +x run_tests.py
```

For PowerShell on Windows:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Display Issues in Headless Mode
The tests are configured for headless Chrome. If you need to see the browser:
1. Edit `conftest.py`
2. Comment out: `chrome_options.add_argument("--headless=new")`
3. Run tests again

### Jenkins Build Fails
Check Jenkins console output for specific errors. Common issues:
- Chrome not installed: Install Chrome on Jenkins server
- Permissions: Jenkins user needs permissions to run Chrome
- Network: Ensure application services are accessible from Jenkins

---

## Best Practices

1. **Always use virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Linux/Mac
   .\venv\Scripts\Activate.ps1  # Windows
   ```

2. **Keep dependencies updated**
   ```bash
   pip install --upgrade -r requirements.txt
   ```

3. **Use environment variables** for configuration
   - Never hardcode URLs or credentials
   - Use `.env` file (not committed to git)

4. **Run smoke tests first**
   ```bash
   pytest -m smoke
   ```

5. **Generate reports for debugging**
   ```bash
   pytest --html=report.html --self-contained-html
   ```

---

## Additional Resources

- [Selenium Python Documentation](https://selenium-python.readthedocs.io/)
- [Pytest Documentation](https://docs.pytest.org/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [ChromeDriver Downloads](https://chromedriver.chromium.org/)

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review test logs in `report.html`
3. Check Jenkins console output
4. Verify application is running and accessible
