terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.82.2"
    }
  }
}

provider "aws" {
  region = var.region
}

# Create a VPC
resource "aws_vpc" "my-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "My VPC"
  }
}

# Create Public Subnet
resource "aws_subnet" "public-subnet" {
  cidr_block = "10.0.2.0/24"
  vpc_id = aws_vpc.my-vpc.id
  map_public_ip_on_launch = true
  availability_zone = "us-east-1a"
  tags = {
    Name = "public-subnet"
  }
}

# Create Private Subnet
resource "aws_subnet" "private-subnet" {
  cidr_block = "10.0.1.0/24"
  vpc_id = aws_vpc.my-vpc.id
  availability_zone = "us-east-1a"
  tags = {
    Name = "private-subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "my-igw" {
  vpc_id = aws_vpc.my-vpc.id
  tags = {
    Name = "my-igw"
  }
}

# Public Route Table
resource "aws_route_table" "my-public-route-table" {
  vpc_id = aws_vpc.my-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my-igw.id
  }
}

# Associate Public Route Table
resource "aws_route_table_association" "public-sub" {
  route_table_id = aws_route_table.my-public-route-table.id
  subnet_id = aws_subnet.public-subnet.id
}

# Security Group for Kubernetes Nodes
resource "aws_security_group" "kubeadm-sg" {
  vpc_id = aws_vpc.my-vpc.id

  # Allow SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow API Server (Control Plane)
  ingress {
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow Kubernetes Node Communication
  ingress {
    from_port   = 10250
    to_port     = 10250
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow etcd Communication
  ingress {
    from_port   = 2379
    to_port     = 2380
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow Kubernetes Worker Communication
  ingress {
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "kubeadm-sg"
  }
}

# Key Pair for SSH Access
resource "aws_key_pair" "k8s-key" {
  key_name   = "k8s-key"
  public_key = file("~/.ssh/id_rsa.pub")  # Ensure you have a public key here
}

# Control Plane Node
resource "aws_instance" "control-plane" {
  ami           = "ami-075449515af5df0d1"
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.public-subnet.id
  security_groups = [aws_security_group.kubeadm-sg.name]
  key_name      = aws_key_pair.k8s-key.key_name

  user_data = file("control_plane.sh") # Cloud-init script

  tags = {
    Name = "k8s-control-plane"
  }

  depends_on = [aws_internet_gateway.my-igw]
}

# Worker Node
resource "aws_instance" "worker-node" {
  ami           = "ami-075449515af5df0d1"
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.public-subnet.id
  security_groups = [aws_security_group.kubeadm-sg.name]
  key_name      = aws_key_pair.k8s-key.key_name

  user_data = file("worker.sh") # Cloud-init script

  tags = {
    Name = "k8s-worker-node"
  }

  depends_on = [aws_internet_gateway.my-igw]
}
