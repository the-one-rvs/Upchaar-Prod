#!/bin/bash

set -e  # Exit on error

# Variables
KUBERNETES_VERSION="1.27.0-00"
MASTER_IP="<CONTROL_PLANE_IP>"

echo "[TASK 1] Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "[TASK 2] Installing dependencies..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

echo "[TASK 3] Installing Docker..."
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker

echo "[TASK 4] Disabling Swap..."
sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab

echo "[TASK 5] Adding Kubernetes repository..."
sudo curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo add-apt-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"

echo "[TASK 6] Installing Kubernetes components..."
sudo apt-get update -y
sudo apt-get install -y kubelet=$KUBERNETES_VERSION kubeadm=$KUBERNETES_VERSION kubectl=$KUBERNETES_VERSION

sudo systemctl enable kubelet
sudo systemctl start kubelet

echo "[TASK 7] Joining Kubernetes cluster..."
JOIN_CMD=$(ssh ubuntu@$MASTER_IP 'cat /home/ubuntu/kubeadm-join.sh')
sudo $JOIN_CMD

echo "[INFO] Worker node setup complete!"
