# Selenium Tests - Quick Reference Card

## 🚀 Quick Start

### Windows
```powershell
cd selenium_tests
.\run_tests.ps1
```

### Linux/Mac
```bash
cd selenium_tests
python3 run_tests.py
```

## 📋 Test Commands

| Command | Description |
|---------|-------------|
| `pytest` | Run all tests |
| `pytest -v` | Run with verbose output |
| `pytest -m smoke` | Run smoke tests only |
| `pytest -m critical` | Run critical tests only |
| `pytest -m regression` | Run regression tests only |
| `pytest --html=report.html --self-contained-html` | Generate HTML report |
| `pytest test_opalumpus.py::TestOpalumpusApplication::test_homepage_loads` | Run specific test |

## 🧪 15 Test Cases Overview

| # | Test Name | Category | What It Tests |
|---|-----------|----------|---------------|
| 1 | `test_homepage_loads` | Smoke, Critical | Homepage loads successfully |
| 2 | `test_navigation_menu_exists` | Smoke | Navigation menu present |
| 3 | `test_navigate_to_trips_page` | Smoke, Critical | Trips page navigation |
| 4 | `test_navigate_to_about_page` | Regression | About page navigation |
| 5 | `test_navigate_to_contact_page` | Regression | Contact page navigation |
| 6 | `test_admin_signin_page_loads` | Critical | Admin login page loads |
| 7 | `test_invalid_admin_login` | Critical | Invalid login rejection |
| 8 | `test_booking_page_loads` | Critical | Booking form loads |
| 9 | `test_booking_form_validation` | Critical | Form validation works |
| 10 | `test_booking_form_submission_valid_data` | Critical | Valid booking submission |
| 11 | `test_api_health_check` | Smoke | API server responding |
| 12 | `test_navigation_flow` | Regression | Multi-page navigation |
| 13 | `test_page_responsiveness` | Regression | Responsive design |
| 14 | `test_form_field_types` | Regression | HTML5 input types |
| 15 | `test_browser_back_navigation` | Regression | Browser back button |

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `conftest.py` | Pytest fixtures and Chrome config |
| `pytest.ini` | Pytest settings |
| `.env` | Environment variables (URLs) |
| `requirements.txt` | Python dependencies |

## 📁 Project Structure

```
selenium_tests/
├── conftest.py              # Test configuration
├── test_opalumpus.py        # 15 test cases
├── pytest.ini               # Pytest settings
├── requirements.txt         # Dependencies
├── run_tests.py             # Python runner
├── run_tests.ps1            # PowerShell runner
├── .env.example             # Environment template
├── .env                     # Your config (not in git)
├── README.md                # Full documentation
├── SETUP_GUIDE.md           # Setup instructions
└── QUICK_REFERENCE.md       # This file
```

## 🌐 Environment Variables

```env
BASE_URL=http://localhost:5173    # Frontend URL
API_URL=http://localhost:3000     # Backend API URL
```

## 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Chrome version mismatch | `pip install --upgrade webdriver-manager` |
| Tests timeout | Ensure app is running; increase timeouts in conftest.py |
| Permission errors | `Set-ExecutionPolicy RemoteSigned` (Windows) |
| Module not found | Activate venv: `.\venv\Scripts\Activate.ps1` |
| .env not found | Copy `.env.example` to `.env` |

## 📊 Jenkins Pipeline

Use `Jenkinsfile.selenium` for CI/CD integration.

Key stages:
1. Checkout code
2. Setup Python environment
3. Install Chrome
4. Start application
5. Run tests
6. Publish reports

## 🎯 Test Strategy

- **Smoke Tests** (3 tests): Quick validation, run first
- **Critical Tests** (7 tests): Core functionality must pass
- **Regression Tests** (7 tests): Comprehensive coverage

## 📈 Success Metrics

All 15 tests should pass when:
- ✅ Frontend is running on port 5173
- ✅ Backend API is running on port 3000
- ✅ Database is connected
- ✅ Chrome browser is installed

## 🔐 Security Notes

- Never commit `.env` with real credentials
- Use test credentials only
- Keep dependencies updated

## 📞 Need Help?

1. Check `README.md` for detailed docs
2. Check `SETUP_GUIDE.md` for setup help
3. Review `report.html` after test run
4. Check application logs

## 💡 Pro Tips

1. Run smoke tests first: `pytest -m smoke`
2. Use `-v` for detailed output
3. Generate HTML reports for debugging
4. Use headless mode in CI/CD (already configured)
5. Set proper timeouts for slow networks

---

**Last Updated**: December 2025
**Test Framework**: Selenium + Pytest
**Browser**: Chrome (Headless)
**Python**: 3.8+
