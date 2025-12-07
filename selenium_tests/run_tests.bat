@echo off
REM Selenium Test Runner for Windows
REM This batch file sets up and runs the Selenium test suite

echo ============================================================
echo Opalumpus Selenium Test Suite
echo ============================================================
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo [WARNING] Virtual environment not found.
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Failed to create virtual environment.
        echo Make sure Python is installed and in your PATH.
        pause
        exit /b 1
    )
    echo [SUCCESS] Virtual environment created.
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo [ERROR] Failed to activate virtual environment.
    pause
    exit /b 1
)

REM Check if dependencies are installed
venv\Scripts\pip.exe show selenium >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing dependencies...
    venv\Scripts\pip.exe install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed.
    echo.
)

REM Check for .env file
if not exist ".env" (
    echo [WARNING] .env file not found.
    if exist ".env.example" (
        echo Creating .env from .env.example...
        copy .env.example .env >nul
        echo [SUCCESS] Created .env file.
        echo [INFO] Please update .env with your configuration if needed.
        echo.
    )
)

REM Run tests
echo ============================================================
echo Running Selenium tests...
echo ============================================================
echo.

REM Check if arguments were passed, otherwise use default
if "%~1"=="" (
    venv\Scripts\python.exe -m pytest -v --html=report.html --self-contained-html
) else (
    venv\Scripts\python.exe -m pytest %*
)

set TEST_EXIT_CODE=%errorlevel%

echo.
echo ============================================================
if %TEST_EXIT_CODE%==0 (
    echo [SUCCESS] All tests passed!
) else (
    echo [FAILED] Some tests failed. Check the output above.
)
echo ============================================================

REM Show report location if it exists
if exist "report.html" (
    echo.
    echo [INFO] HTML report generated: %CD%\report.html
    echo       Open this file in a browser to view detailed results.
)

echo.
pause
exit /b %TEST_EXIT_CODE%
