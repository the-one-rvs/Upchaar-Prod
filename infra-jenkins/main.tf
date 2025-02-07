terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.82.2"
    }
  }
}

provider "aws" {
  region = "us-east-1" # Change as needed
}

# Key Pair (Ensure you have a key for SSH access)
# resource "aws_key_pair" "jenkins-key" {
#   key_name   = "jenkins-key"
#   public_key = file("~/.ssh/id_rsa.pub")  # Change path if needed
# }

# Security Group for Jenkins
resource "aws_security_group" "jenkins-sg" {
  name        = "jenkins-sg"
  description = "Allow SSH & Jenkins access"
  vpc_id      = aws_vpc.jenkins-vpc.id

  # Allow SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow Jenkins UI (port 8080)
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow traffic for Jenkins agent nodes (optional)
  ingress {
    from_port   = 50000
    to_port     = 50000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "jenkins-sg"
  }
}

# VPC for Jenkins
resource "aws_vpc" "jenkins-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "Jenkins VPC"
  }
}

# Public Subnet
resource "aws_subnet" "jenkins-subnet" {
  vpc_id     = aws_vpc.jenkins-vpc.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone = "us-east-1a"
  tags = {
    Name = "Jenkins Subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "jenkins-igw" {
  vpc_id = aws_vpc.jenkins-vpc.id
  tags = {
    Name = "Jenkins IGW"
  }
}

# Route Table
resource "aws_route_table" "jenkins-route-table" {
  vpc_id = aws_vpc.jenkins-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.jenkins-igw.id
  }
}

# Route Table Association
resource "aws_route_table_association" "jenkins-association" {
  subnet_id      = aws_subnet.jenkins-subnet.id
  route_table_id = aws_route_table.jenkins-route-table.id
}

# Jenkins EC2 Instance
resource "aws_instance" "jenkins-server" {
  ami           = "ami-075449515af5df0d1"  # Ubuntu 22.04
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.jenkins-subnet.id
#   key_name      = aws_key_pair.jenkins-key.key_name
  security_groups = [aws_security_group.jenkins-sg.name]

  user_data = file("jenkins.sh") # Cloud-init script

  tags = {
    Name = "Jenkins Server"
  }

  depends_on = [aws_internet_gateway.jenkins-igw]
}

# Allocate Elastic IP for Jenkins
resource "aws_eip" "jenkins_eip" {
  instance = aws_instance.jenkins-server.id
}

