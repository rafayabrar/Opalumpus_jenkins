import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

@pytest.fixture(scope="function")
def driver():
    """
    Setup Chrome WebDriver with headless mode for automated testing.
    This fixture is used by all test cases.
    """
    chrome_options = Options()
    
    # Headless mode - required for Jenkins/AWS EC2 environment
    chrome_options.add_argument("--headless=new")
    
    # Additional options for stability in CI/CD environments
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    
    # Initialize the Chrome driver with proper Windows handling
    try:
        # Use ChromeDriverManager to get the driver path
        driver_path = ChromeDriverManager().install()
        
        # Create service with explicit path
        service = Service(executable_path=driver_path)
        
        # Initialize driver
        driver = webdriver.Chrome(service=service, options=chrome_options)
    except Exception as e:
        print(f"Error initializing Chrome driver: {e}")
        print(f"Python version: {sys.version}")
        print(f"Python executable: {sys.executable}")
        raise
    
    # Set implicit wait
    driver.implicitly_wait(10)
    
    yield driver
    
    # Teardown - close the browser
    driver.quit()

@pytest.fixture(scope="session")
def base_url():
    """
    Returns the base URL for the application.
    Can be configured via environment variable.
    """
    return os.getenv("BASE_URL", "http://localhost:5173")

@pytest.fixture(scope="session")
def api_url():
    """
    Returns the API base URL.
    Can be configured via environment variable.
    """
    return os.getenv("API_URL", "http://localhost:3000")

def pytest_configure(config):
    """Configure pytest with custom markers"""
    config.addinivalue_line(
        "markers", "smoke: mark test as smoke test"
    )
    config.addinivalue_line(
        "markers", "regression: mark test as regression test"
    )
    config.addinivalue_line(
        "markers", "critical: mark test as critical functionality"
    )
