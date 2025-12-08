@echo off
REM Quick start script for Windows
REM This script sets up and runs the Opalumpus application

echo ============================================
echo Opalumpus Travel Application - Quick Start
echo ============================================
echo.

REM Check Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed or not in PATH
    pause
    exit /b 1
)

REM Check Docker Compose
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker Compose is not installed or not in PATH
    pause
    exit /b 1
)

echo [OK] Docker: 
docker --version
echo [OK] Docker Compose:
docker-compose --version
echo.

REM Create .env if it doesn't exist
if not exist ".env" (
    echo [INFO] Creating .env file from template...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo [WARN] Please update .env with your configuration
    echo.
)

REM Stop existing containers
echo [INFO] Stopping any existing containers...
docker-compose down -v 2>nul
echo.

REM Build and start services
echo [INFO] Building and starting services...
docker-compose up --build -d

if errorlevel 1 (
    echo [ERROR] Failed to start services
    pause
    exit /b 1
)

REM Wait for services
echo [INFO] Waiting for services to be healthy...
timeout /t 30 /nobreak >nul

REM Display status
echo.
echo ============================================
echo Running containers:
echo ============================================
docker-compose ps

echo.
echo ============================================
echo Application started successfully!
echo ============================================
echo.
echo Access URLs:
echo   Frontend:  http://localhost:5173
echo   Backend:   http://localhost:3000
echo   MongoDB:   mongodb://localhost:27017
echo.
echo Useful commands:
echo   View logs:    docker-compose logs -f
echo   Stop:         docker-compose down
echo   Restart:      docker-compose restart
echo   Rebuild:      docker-compose up --build -d
echo.
echo Run tests:
echo   cd selenium_tests
echo   .\run_tests.bat
echo.

pause
