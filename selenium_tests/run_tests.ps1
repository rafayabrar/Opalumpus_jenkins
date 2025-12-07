# PowerShell script to run Selenium tests on Windows
# Usage: .\run_tests.ps1

Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 59) -ForegroundColor Cyan
Write-Host "Opalumpus Selenium Test Suite" -ForegroundColor Green
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 59) -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (-Not (Test-Path "venv")) {
    Write-Host "⚠️  Virtual environment not found." -ForegroundColor Yellow
    Write-Host "Creating virtual environment..." -ForegroundColor Cyan
    python -m venv venv
    
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    .\venv\Scripts\pip.exe install -r requirements.txt
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}

# Check for .env file
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
        Write-Host "Please update .env with your configuration." -ForegroundColor Yellow
    }
}

# Run tests
Write-Host ""
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 59) -ForegroundColor Cyan
Write-Host "Running tests..." -ForegroundColor Green
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 59) -ForegroundColor Cyan
Write-Host ""

# Check if arguments were passed
if ($args.Count -gt 0) {
    .\venv\Scripts\pytest.exe $args
} else {
    .\venv\Scripts\pytest.exe -v --html=report.html --self-contained-html
}

$exitCode = $LASTEXITCODE

# Print summary
Write-Host ""
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 59) -ForegroundColor Cyan
if ($exitCode -eq 0) {
    Write-Host "✓ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "✗ Some tests failed. Check the output above." -ForegroundColor Red
}
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 59) -ForegroundColor Cyan

# Show report location
if (Test-Path "report.html") {
    Write-Host ""
    Write-Host "📊 HTML report generated: $(Get-Location)\report.html" -ForegroundColor Cyan
    Write-Host "   Open this file in a browser to view detailed results." -ForegroundColor Gray
}

exit $exitCode
