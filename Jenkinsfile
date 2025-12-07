pipeline {
    agent any
    
    environment {
        // Set Python path
        PYTHON_VERSION = '3.11'
        VENV_DIR = 'venv'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                echo 'Setting up Python environment...'
                dir('selenium_tests') {
                    sh '''
                        # Create virtual environment
                        python3 -m venv ${VENV_DIR}
                        
                        # Activate virtual environment and install dependencies
                        . ${VENV_DIR}/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt
                    '''
                }
            }
        }
        
        stage('Install Chrome') {
    steps {
        echo "Installing Chrome and dependencies..."
        sh '''
            sudo mkdir -p /etc/apt/keyrings

            # Download Google Chrome GPG key
            wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | \
                sudo gpg --dearmor -o /etc/apt/keyrings/google-chrome.gpg

            # Add Chrome repo
            echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome.gpg] https://dl.google.com/linux/chrome/deb/ stable main" | \
                sudo tee /etc/apt/sources.list.d/google-chrome.list

            # Update
            sudo apt-get update -y

            # Install Chrome
            sudo apt-get install -y google-chrome-stable
        '''
    }
}

        
        stage('Start Application') {
            steps {
                echo 'Starting application services...'
                // Adjust this based on your deployment method
                sh '''
                    # Start backend
                    cd Backend
                    npm install
                    nohup npm start &
                    
                    # Start frontend
                    cd ../Opalumpus_frontEnd
                    npm install
                    nohup npm run dev &
                    
                    # Wait for services to be ready
                    sleep 10
                '''
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                echo 'Running Selenium tests...'
                dir('selenium_tests') {
                    sh '''
                        # Activate virtual environment
                        . ${VENV_DIR}/bin/activate
                        
                        # Run tests with HTML report
                        pytest -v \
                            --html=report.html \
                            --self-contained-html \
                            --junit-xml=results.xml
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Publishing test reports...'
            
            // Publish HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'selenium_tests',
                reportFiles: 'report.html',
                reportName: 'Selenium Test Report',
                reportTitles: 'Opalumpus Selenium Tests'
            ])
            
            // Publish JUnit test results
            junit 'selenium_tests/results.xml'
            
            // Cleanup
            echo 'Cleaning up...'
            sh '''
                # Stop application services
                pkill -f "npm start" || true
                pkill -f "npm run dev" || true
            '''
        }
        
        success {
            echo '✓ All tests passed successfully!'
        }
        
        failure {
            echo '✗ Tests failed. Check the reports for details.'
        }
    }
}
