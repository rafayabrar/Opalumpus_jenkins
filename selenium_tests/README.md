# Selenium Test Suite for Opalumpus Travel Application

This directory contains automated Selenium test cases for the Opalumpus travel booking web application. The tests are designed to run in headless Chrome mode, making them suitable for CI/CD pipelines including Jenkins on AWS EC2.

## 📋 Overview

The test suite includes **15 comprehensive test cases** covering:
- ✅ Homepage functionality
- ✅ Navigation between pages
- ✅ Admin authentication
- ✅ Booking form validation and submission
- ✅ API health checks
- ✅ Responsive design testing
- ✅ Form field validation
- ✅ Browser navigation

## 🛠️ Prerequisites

- Python 3.8 or higher
- Google Chrome browser installed
- ChromeDriver (automatically managed by webdriver-manager)
- Running Opalumpus application (frontend + backend)

## 📦 Installation

1. **Navigate to the selenium_tests directory:**
   ```powershell
   cd selenium_tests
   ```

2. **Create a virtual environment (recommended):**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```powershell
   cp .env.example .env
   ```
   
   Edit `.env` file to set your application URLs:
   ```
   BASE_URL=http://localhost:5173
   API_URL=http://localhost:3000
   ```

## 🚀 Running Tests

### Run All Tests
```powershell
pytest
```

### Run with HTML Report
```powershell
pytest --html=report.html --self-contained-html
```

### Run Specific Test Categories

**Smoke Tests (Quick):**
```powershell
pytest -m smoke
```

**Critical Tests:**
```powershell
pytest -m critical
```

**Regression Tests:**
```powershell
pytest -m regression
```

### Run Specific Test File
```powershell
pytest test_opalumpus.py
```

### Run Specific Test Case
```powershell
pytest test_opalumpus.py::TestOpalumpusApplication::test_homepage_loads
```

### Run with Verbose Output
```powershell
pytest -v
```

## 📝 Test Cases

### Test Case 1: Homepage Load
- **Purpose:** Verify homepage loads successfully
- **Validates:** Page title, URL, body content

### Test Case 2: Navigation Menu
- **Purpose:** Verify navigation menu exists
- **Validates:** Navigation elements and links

### Test Case 3: Trips Page Navigation
- **Purpose:** Verify navigation to trips page
- **Validates:** URL routing, page content

### Test Case 4: About Page Navigation
- **Purpose:** Verify navigation to about page
- **Validates:** URL routing, page content

### Test Case 5: Contact Page Navigation
- **Purpose:** Verify navigation to contact page
- **Validates:** URL routing, page content

### Test Case 6: Admin Sign-In Page
- **Purpose:** Verify admin login page loads
- **Validates:** Form elements (username, password fields)

### Test Case 7: Invalid Admin Login
- **Purpose:** Test authentication with invalid credentials
- **Validates:** Error handling, security

### Test Case 8: Booking Page Load
- **Purpose:** Verify booking page and form load
- **Validates:** Form fields (name, email, number of people)

### Test Case 9: Booking Form Validation
- **Purpose:** Test form validation rules
- **Validates:** Required field validation

### Test Case 10: Booking Form Submission
- **Purpose:** Test valid booking submission
- **Validates:** Form accepts and processes valid data

### Test Case 11: API Health Check
- **Purpose:** Verify backend API is running
- **Validates:** API endpoint responds correctly

### Test Case 12: Multi-Page Navigation Flow
- **Purpose:** Test navigation through multiple pages
- **Validates:** Complete user journey

### Test Case 13: Responsive Design
- **Purpose:** Test page responsiveness
- **Validates:** Desktop (1920x1080), tablet (768x1024), mobile (375x667)

### Test Case 14: Form Field Types
- **Purpose:** Verify correct HTML5 input types
- **Validates:** Email field, number field types

### Test Case 15: Browser Back Navigation
- **Purpose:** Test browser back button functionality
- **Validates:** Navigation history works correctly

## 🏗️ Project Structure

```
selenium_tests/
├── conftest.py              # Pytest configuration and fixtures
├── test_opalumpus.py        # Main test suite (15 test cases)
├── pytest.ini               # Pytest settings
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 Configuration

### Headless Chrome Options
The tests use headless Chrome with the following options:
- `--headless=new` - New headless mode
- `--no-sandbox` - Required for Docker/CI environments
- `--disable-dev-shm-usage` - Prevents memory issues
- `--disable-gpu` - Disables GPU hardware acceleration
- `--window-size=1920,1080` - Sets default window size

### Fixtures Available
- `driver` - Selenium WebDriver instance (function scope)
- `base_url` - Frontend application URL (session scope)
- `api_url` - Backend API URL (session scope)

## 🔄 Jenkins Integration

### Jenkinsfile Example
```groovy
stage('Run Selenium Tests') {
    steps {
        dir('selenium_tests') {
            sh '''
                python3 -m venv venv
                . venv/bin/activate
                pip install -r requirements.txt
                pytest --html=report.html --self-contained-html
            '''
        }
    }
    post {
        always {
            publishHTML([
                reportDir: 'selenium_tests',
                reportFiles: 'report.html',
                reportName: 'Selenium Test Report'
            ])
        }
    }
}
```

## 🐛 Troubleshooting

### Chrome Driver Issues
If you encounter ChromeDriver version issues:
```powershell
pip install --upgrade webdriver-manager
```

### Application Not Running
Ensure both frontend and backend are running:
```powershell
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend
cd Opalumpus_frontEnd
npm run dev
```

### Permission Errors on Windows
If you get execution policy errors:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### TimeoutException
If tests timeout, increase wait times in conftest.py or check if application is running.

## 📊 Test Reports

After running tests with `--html=report.html`, open `report.html` in a browser to view:
- Test pass/fail status
- Execution time
- Detailed error messages
- Test categorization

## 🔐 Security Notes

- Never commit `.env` file with real credentials
- Use environment variables for sensitive data
- Admin credentials in tests should be test accounts only

## 📈 CI/CD Best Practices

1. **Run tests in isolated environment** (Docker/virtual machine)
2. **Use headless mode** for server environments
3. **Set appropriate timeouts** for network operations
4. **Generate HTML reports** for easy debugging
5. **Tag tests** (smoke/regression) for selective execution

## 🤝 Contributing

When adding new tests:
1. Follow existing naming conventions
2. Add appropriate pytest markers (@pytest.mark.smoke, etc.)
3. Include detailed docstrings
4. Update this README with new test descriptions

## 📄 License

This test suite is part of the Opalumpus project.

## 📞 Support

For issues or questions:
- Check troubleshooting section
- Review pytest documentation: https://docs.pytest.org/
- Review Selenium documentation: https://selenium-python.readthedocs.io/
