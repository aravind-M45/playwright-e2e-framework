// Jenkinsfile
pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                withCredentials([file(credentialsId: 'digit-env-file', variable: 'ENV_FILE')]) {
                    bat 'copy %ENV_FILE% .env'
                    bat 'npx playwright test --grep "@digit|@api" --project=chromium'
                }
            }
        }
    }

    post {
        always {
            junit 'junit-test-report.xml'
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}