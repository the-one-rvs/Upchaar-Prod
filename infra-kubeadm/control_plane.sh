#!/bin/bash

set -e  # Exit on error

# Variables
KUBERNETES_VERSION="1.27.0-00"
POD_NETWORK_CIDR="192.168.0.0/16"

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

echo "[TASK 7] Initializing Kubernetes control plane..."
sudo kubeadm init --pod-network-cidr=$POD_NETWORK_CIDR | tee kubeadm-init.log

echo "[TASK 8] Configuring kubectl..."
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

echo "[TASK 9] Deploying Calico network..."
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

echo "[TASK 10] Generating join command for worker node..."
JOIN_CMD=$(sudo kubeadm token create --print-join-command)
echo "Run the following command on the worker node:"
echo "$JOIN_CMD"

echo "$JOIN_CMD" > /home/ubuntu/kubeadm-join.sh
chmod +x /home/ubuntu/kubeadm-join.sh

echo "[INFO] Kubernetes Control Plane setup complete!"
