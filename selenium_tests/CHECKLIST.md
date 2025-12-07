# Pre-Test Checklist

## ✅ Before Running Selenium Tests

Use this checklist to ensure everything is ready before running the test suite.

### 1. System Requirements
- [ ] Python 3.8 or higher installed
  - Check: `python --version`
- [ ] Google Chrome browser installed
  - Check: `google-chrome --version` (Linux) or open Chrome manually (Windows)
- [ ] Git installed (if cloning from repository)
  - Check: `git --version`

### 2. Application Services
- [ ] MongoDB is running
  - Check: Connect to MongoDB or verify service status
- [ ] Backend server is running on port 3000
  - Check: `curl http://localhost:3000` should return "API Working"
  - Start: `cd Backend && npm start`
- [ ] Frontend is running on port 5173
  - Check: `curl http://localhost:5173` or open in browser
  - Start: `cd Opalumpus_frontEnd && npm run dev`

### 3. Test Environment Setup
- [ ] Navigated to selenium_tests directory
  - `cd selenium_tests`
- [ ] Virtual environment exists
  - Check: Folder `venv` exists
  - Create: `python -m venv venv`
- [ ] Virtual environment activated
  - Windows: `.\venv\Scripts\Activate.ps1`
  - Linux/Mac: `source venv/bin/activate`
- [ ] Dependencies installed
  - Check: `pip list` shows selenium, pytest, etc.
  - Install: `pip install -r requirements.txt`

### 4. Configuration
- [ ] .env file exists
  - Copy from: `cp .env.example .env` (Linux/Mac)
  - Copy from: `Copy-Item .env.example .env` (Windows)
- [ ] .env file has correct URLs
  - BASE_URL should point to frontend (default: http://localhost:5173)
  - API_URL should point to backend (default: http://localhost:3000)

### 5. Quick Smoke Test
Run these commands to verify setup:

```powershell
# Windows PowerShell
python --version          # Should show Python 3.8+
pip list | Select-String selenium  # Should show selenium package
curl http://localhost:3000  # Should return "API Working"
curl http://localhost:5173  # Should return HTML content
```

```bash
# Linux/Mac
python3 --version         # Should show Python 3.8+
pip list | grep selenium  # Should show selenium package
curl http://localhost:3000  # Should return "API Working"
curl http://localhost:5173  # Should return HTML content
```

### 6. Ready to Run!

If all checkboxes are checked, run tests:

**Windows:**
```powershell
.\run_tests.ps1
```

**Linux/Mac:**
```bash
python3 run_tests.py
```

**Direct pytest:**
```bash
pytest -v --html=report.html --self-contained-html
```

## 📊 Expected Output

When everything is working:
```
==================== test session starts ====================
collected 15 items

test_opalumpus.py::TestOpalumpusApplication::test_homepage_loads PASSED
test_opalumpus.py::TestOpalumpusApplication::test_navigation_menu_exists PASSED
test_opalumpus.py::TestOpalumpusApplication::test_navigate_to_trips_page PASSED
...
==================== 15 passed in XX.XXs ====================
```

## 🐛 Troubleshooting

### If tests fail:

1. **Check application is running:**
   ```powershell
   curl http://localhost:3000
   curl http://localhost:5173
   ```

2. **Check Chrome is installed:**
   ```powershell
   # Windows - Check in Program Files or open Chrome
   # Linux
   google-chrome --version
   ```

3. **Verify virtual environment:**
   ```powershell
   pip list
   # Should show selenium, pytest, etc.
   ```

4. **Check .env configuration:**
   ```powershell
   cat .env  # Linux/Mac
   type .env # Windows
   ```

5. **Run single test to isolate issue:**
   ```powershell
   pytest test_opalumpus.py::TestOpalumpusApplication::test_homepage_loads -v
   ```

## 🎯 Test Execution Strategy

### First Time Setup (Full)
1. Install dependencies
2. Configure .env
3. Start application services
4. Run all tests
5. Review HTML report

### Regular Testing (Quick)
1. Ensure services running
2. Run smoke tests: `pytest -m smoke`
3. If passed, run all tests
4. Review any failures

### Before Deployment (Complete)
1. Run all tests: `pytest`
2. Run with coverage: `pytest --html=report.html`
3. Verify all 15 tests pass
4. Check report.html for details
5. Commit and push if all pass

## 📝 Notes

- Tests take approximately 60-90 seconds to complete
- Headless mode is enabled by default (no browser window)
- Test data is configurable in test files
- Each test is independent and can run in any order
- Failed tests will show detailed error messages

---

**Last Updated**: December 2025
**Total Tests**: 15
**Average Duration**: 60-90 seconds
**Success Rate Target**: 100%
