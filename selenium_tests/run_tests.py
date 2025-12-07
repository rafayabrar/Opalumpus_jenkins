#!/usr/bin/env python3
"""
Quick test runner script for Opalumpus Selenium tests
Usage: python run_tests.py [options]
"""

import sys
import subprocess
import os
from pathlib import Path

def main():
    """Main test runner"""
    print("=" * 60)
    print("Opalumpus Selenium Test Suite")
    print("=" * 60)
    
    # Check if virtual environment exists
    venv_path = Path("venv")
    if not venv_path.exists():
        print("\n⚠️  Virtual environment not found.")
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"])
        
        # Activate and install dependencies
        if os.name == 'nt':  # Windows
            pip_path = venv_path / "Scripts" / "pip.exe"
        else:  # Unix/Linux
            pip_path = venv_path / "bin" / "pip"
        
        print("Installing dependencies...")
        subprocess.run([str(pip_path), "install", "-r", "requirements.txt"])
    
    # Check for .env file
    if not Path(".env").exists():
        print("\n⚠️  .env file not found. Creating from .env.example...")
        if Path(".env.example").exists():
            import shutil
            shutil.copy(".env.example", ".env")
            print("✓ Created .env file. Please update it with your configuration.")
    
    # Determine pytest executable
    if os.name == 'nt':  # Windows
        pytest_path = venv_path / "Scripts" / "pytest.exe"
    else:  # Unix/Linux
        pytest_path = venv_path / "bin" / "pytest"
    
    # Run tests
    print("\n" + "=" * 60)
    print("Running tests...")
    print("=" * 60 + "\n")
    
    # Get command line arguments (skip script name)
    test_args = sys.argv[1:] if len(sys.argv) > 1 else []
    
    # Default arguments if none provided
    if not test_args:
        test_args = ["-v", "--html=report.html", "--self-contained-html"]
    
    # Run pytest
    cmd = [str(pytest_path)] + test_args
    result = subprocess.run(cmd)
    
    # Print summary
    print("\n" + "=" * 60)
    if result.returncode == 0:
        print("✓ All tests passed!")
    else:
        print("✗ Some tests failed. Check the output above.")
    print("=" * 60)
    
    # Print report location if HTML report was generated
    if "--html" in " ".join(test_args):
        print(f"\n📊 HTML report generated: {Path.cwd() / 'report.html'}")
    
    return result.returncode

if __name__ == "__main__":
    sys.exit(main())
