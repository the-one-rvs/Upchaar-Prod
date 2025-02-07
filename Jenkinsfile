pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/the-one-rvs/Upchaar-Prod'
            }
        }

        stage('Generating Complete Code with env') {
            steps {
                sh 'sh env.sh'
            }
        }

        stage('Check Changes in Services') {
            steps {
                script {
                    def changedServices = []
                    def diff = sh(script: 'git diff --name-only HEAD~1..HEAD', returnStdout: true).trim()
                    if (diff.contains('UpchaarTest/upchaarone')) {
                        changedServices.add('frontend')
                    }
                    if (diff.contains('UpchaarTest/sample_scanner')) {
                        changedServices.add('test_scanner')
                    }
                    if (diff.contains('UpchaarTest/backend')) {
                        changedServices.add('backend')
                    }
                    if (diff.contains('UpchaarTest/virtual_vaidhya')) {
                        changedServices.add('virtual_vaidhya')
                    }
                    env.CHANGED_SERVICES = changedServices.join(',')
                }
            }
        }

        stage('Build Docker Image with trivy for frontend') {
            when {
                expression { return env.CHANGED_SERVICES.contains('frontend') }
            }
            steps {
                sh """
                    docker build -t quasarcelestio/upchaar:frontend-v2.2 UpchaarTest/upchaarone
                    trivy image --severity HIGH,CRITICAL quasarcelestio/upchaar:frontend-v2.2 >> trivy-frontend.txt
                    docker push quasarcelestio/upchaar:frontend-v2.2
                """
            }
        }

        stage('Build Docker Image with trivy for test_scanner') {
            when {
                expression { return env.CHANGED_SERVICES.contains('test_scanner') }
            }
            steps {
                sh """
                    docker build -t quasarcelestio/upchaar:test_scanner-v2.2 UpchaarTest/sample_scanner
                    trivy image --severity HIGH,CRITICAL quasarcelestio/upchaar:test_scanner-v2.2 >> trivy-test_scanner.txt
                    docker push quasarcelestio/upchaar:test_scanner-v2.2
                """
            }
        }

        stage('Build Docker Image with trivy for backend') {
            when {
                expression { return env.CHANGED_SERVICES.contains('backend') }
            }
            steps {
                sh """
                    docker build -t quasarcelestio/upchaar:backend-v2.2 UpchaarTest/backend
                    trivy image --severity HIGH,CRITICAL quasarcelestio/upchaar:backend-v2.2 >> trivy-backend.txt
                    docker push quasarcelestio/upchaar:backend-v2.2
                """
            }
        }

        stage('Build Docker Image with trivy for virtual_vaidhya') {
            when {
                expression { return env.CHANGED_SERVICES.contains('virtual_vaidhya') }
            }
            steps {
                sh """
                    docker build -t quasarcelestio/upchaar:virtual-vaidhya-v2.2 UpchaarTest/virtual_vaidhya
                    trivy image --severity HIGH,CRITICAL quasarcelestio/upchaar:virtual-vaidhya-v2.2 >> trivy-virtual_vaidhya.txt
                    docker push quasarcelestio/upchaar:virtual-vaidhya-v2.2
                """
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Pipeline failed!"
        }
        cleanup {
            script {
                def images = [
                    "quasarcelestio/upchaar:frontend-v2.2",
                    "quasarcelestio/upchaar:test_scanner-v2.2",
                    "quasarcelestio/upchaar:backend-v2.2",
                    "quasarcelestio/upchaar:virtual-vaidhya-v2.2"
                ]
                images.each { image ->
                    sh "docker rmi ${image} || true"
                }
            }
        }
    }
}
