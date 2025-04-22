provider "aws" {
  region = "us-east-1" # Change to your preferred region
}

resource "aws_instance" "react_app" {
  ami           = "ami-0e449927258d45bc4"  # Amazon Linux 2 AMI (Change based on your region)
  instance_type = "t2.micro"

  security_groups = [aws_security_group.react_sg.name]

  user_data = <<-EOF
             #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras enable nginx1
              sudo yum install -y nginx
              sudo systemctl start nginx
              sudo systemctl enable nginx
              
              # Install Node.js and npm
              curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
              sudo yum install -y nodejs
              
              # Clone React App from GitHub
              sudo yum install -y git
              git clone https://github.com/padmashri23/CI-CD_Integration_with_Crypto_Price_Tracking_app.git /home/ec2-user/react-app
              
              # Build React App
              cd /home/ec2-user/react-app
              npm install
              npm run build
              
              # Remove default Nginx welcome page
              sudo rm -rf /usr/share/nginx/html/*
              
              # Copy React build files to Nginx
              sudo cp -r /home/ec2-user/react-app/dist/* /usr/share/nginx/html/

              # Restart Nginx
              sudo systemctl restart nginx
              EOF

  tags = {
    Name = "ReactAppServer"
  }
}

resource "aws_security_group" "react_sg" {
  name        = "react_app_sg"
  description = "Allow HTTP and SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}