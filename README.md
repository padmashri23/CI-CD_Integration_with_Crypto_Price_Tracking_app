# CI/CD Integration with Crypto Price Tracking App

## 📀 Automatically Apply Terraform with AWS EC2 Instance

### 🌍 Why Terraform?

Terraform is a powerful **Infrastructure as Code (IaC)** tool that enables efficient, scalable, and automated infrastructure management. Here's why it stands out:

<p align="center">
  <strong>✅ Key Benefits of Terraform Over Manual Setup</strong>
</p>

<p align="center">
   
  ✔️ Infrastructure is repeatable & consistent<br>
   
  ✔️ Fast, automated deployment<br>
  
  ✔️ Easily scales with configurations<br>
  
  ✔️ Changes are tracked in Git<br>
  
  ✔️ Easier rollback in case of issues<br>
  
  ✔️ Teams can collaborate via code
  
</p>

Using Terraform with your **CI/CD pipeline** ensures **stability, visibility, and productivity**—especially when deploying modern apps like **React.js on AWS EC2**.


## 🚀 Deploying a React.js App on AWS EC2 Using Terraform

<div align="center">

## 📐 Architecture Diagram

![Architecture Diagram](https://github.com/user-attachments/assets/d389dae9-e6e7-44af-b15e-791d5f8f9642)

</div>

---

## ☑️ Steps

1. Clone React.js App from GitHub
2. Create an IAM User
3. Configure AWS Profile and Set Up the AWS CLI
4. Set Up Terraform Configuration
5. Deploy the Infrastructure with Terraform
6. Clean Up Resources

---

## 🤸 Quick Start

### Prerequisites
Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/en)
- [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) (v1.2.0+)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [AWS Account](https://aws.amazon.com/free/) with appropriate IAM permissions

---

## 🐼 Cloning the Repository

```bash
git clone https://github.com/padmashri23/CI-CD_Integration_with_Crypto_Price_Tracking_app.git
```

---

## ➔ Step 1 - Create an IAM User and Access Key

1. Navigate to the AWS Console > IAM > Users > **Create user**
2. Enter user name (e.g., `ec2-terraform`) and proceed
3. Attach the following policies:
   - `AmazonEC2FullAccess`
   - `AdministratorAccess`
4. Complete creation and generate access keys
5. Choose "CLI" as the usage type and download the CSV credentials file

---

## ➔ Step 2 - Configure AWS CLI

1. Open your IDE and create a directory:

```bash
mkdir aws-ec2-terraform && cd aws-ec2-terraform
```

2. Run AWS configuration:

```bash
aws configure
```

3. Input your credentials and region when prompted

4. Verify configuration:

```bash
aws configure list
```

---

## ➔ Step 3 - Set Up Terraform Configuration

1. Create a Terraform configuration file:

```bash
touch main.tf
```

2. Add the following content to `main.tf`:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "react_app" {
  ami           = "ami-xxxxxxxxxxxx"  # Update with valid Amazon Linux 2 AMI ID
  instance_type = "t2.micro"
  security_groups = [aws_security_group.react_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras enable nginx1
              sudo yum install -y nginx
              sudo systemctl start nginx
              sudo systemctl enable nginx

              curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
              sudo yum install -y nodejs
              sudo yum install -y git

              git clone https://github.com/yourusername/your-react-app.git /home/ec2-user/react-app
              cd /home/ec2-user/react-app
              npm install && npm run build

              sudo rm -rf /usr/share/nginx/html/*
              sudo cp -r /home/ec2-user/react-app/dist/* /usr/share/nginx/html/
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
```

**Note**: Replace `https://github.com/yourusername/your-react-app.git` with your repository URL.

---

## ➔ Step 4 - Deploy Infrastructure

1. Initialize Terraform:

```bash
terraform init
```

2. Plan and Apply:

```bash
terraform apply -auto-approve
```

3. Access the App:

Visit your EC2 public IP in a browser:

```
http://your-ec2-public-ip
```

You should see your React.js app live! 🚀

---

## 🖳️ Clean Up Resources

```bash
terraform destroy
```

---

## 📅 Final Results

![Result 1](https://github.com/user-attachments/assets/0c2969fd-c1e9-4f49-ab1e-a87198484091)
![Result 2](https://github.com/user-attachments/assets/859fc207-02f0-4fdc-b7eb-e96a3fda098e)
![Result 3](https://github.com/user-attachments/assets/bf9312e7-d7e5-4d6e-9bba-bf07f0a45890)
![Result 4](https://github.com/user-attachments/assets/14dd179c-b411-4a70-98e2-cf722f275ccc)

---

### App Running on:
**http://54.226.0.98**

---

## 📄 Reference Tutorial

<a href="https://youtu.be/Tbp6VJrq2ho?si=htW_VrEVu3E4XiEn" target="_blank">
  <img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" alt="Tutorial Video" />
</a>

---

> 🚀 Make sure to install AWS CLI and Terraform CLI before beginning your setup.

