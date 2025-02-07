#!/bin/bash
set -e

# Update system
apt-get update -y
apt-get upgrade -y

# Install Java (required for Jenkins)
apt-get install -y openjdk-17-jdk

# Add Jenkins repository key
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add Jenkins repository
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
apt-get update -y
apt-get install -y jenkins

# Start and enable Jenkins service
systemctl start jenkins
systemctl enable jenkins

# Allow Jenkins to run without password (optional)
usermod -aG sudo jenkins

# Print Jenkins initial admin password
echo "Jenkins installed! Use the following command to get the admin password:"
echo "sudo cat /var/lib/jenkins/secrets/initialAdminPassword"

