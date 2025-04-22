
# CI/CD_Integration_with_Crypto_Price_Tracking_app
Automatically Apply Terraform with AWS CodeBuild


# Deploying a React.js App on AWS EC2 Using Terraform 

<div align="center">

## 📐 Architecture Diagram

![Image](https://github.com/user-attachments/assets/d389dae9-e6e7-44af-b15e-791d5f8f9642)


## <a name="steps">☑️ Steps</a>

1. Clone React.js App from Github
1. Create an IAM User
2. Configure AWS profile and set up the AWS CLI
3. Set Up Terraform Configuration
4. Deploy the Infrastructure with Terraform
5. Clean Up Resources

## <a name="quick-start">🤸 Quick Start</a>

**Prerequisites**

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en) installed on your system.
- [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) (1.2.0+) installed.
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed.
- [AWS account](https://aws.amazon.com/free/) and [associated credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html) that allow you to create resources.


## <a name="clone-repo">	:octocat:  Cloning the Repository</a>

First, we’ll set up a React app by cloning the React app from my GitHub repository. If you already have one, feel free to skip this part.

```bash
git clone https://github.com/padmashri23/CI-CD_Integration_with_Crypto_Price_Tracking_app.git
```

## ➡️ Step 1 - Create an IAM User, and the Access Key

First, we need to create a user and then create access keys for that particular user so that we can work with it for our authentication purpose.

1. Navigate to your AWS Console, search for AWS Identity and Access Management (IAM)
2. Go the Tab at righ hand side and choose "Users"
3. Click "Create user"

![Image](https://github.com/user-attachments/assets/71d0fb34-ca51-4b62-b80d-6e78c7f31451)

4. Enter the "User name" i will use `ec2-terraform` then click "Next"

![Image](https://github.com/user-attachments/assets/45c24e90-faa2-4728-8e0d-7a24a023d953)
5. Set permissions, choose "Attached policies directly" search and choose `AmazonEC2FullAccess` and `AdminstratorAccess` then click "Next"

![Image](https://github.com/user-attachments/assets/a78f2a07-39b3-4959-8df6-2c8646fee142)

6. Review the details and click "Create user"

![Image](https://github.com/user-attachments/assets/65675d0c-852c-4eac-b8d6-79743bba3b87)

Now you can see that our user has been successfully created.

Next, let's create the access key for the user

7. Click on the user we just created or click on `View user`

![Image](https://github.com/user-attachments/assets/5856a2e0-2e85-4b3a-9d40-34f259c36248)

8. Click on "Create access key"

![Image](https://github.com/user-attachments/assets/f920eb9d-dad3-4ea1-be81-3c147e7c2e79)

9. Since I am going to work with `Command Line Interface (CLI), we will choose CLI and check the confirmation box and click "Next"

![Image](https://github.com/user-attachments/assets/a2737aa2-2ae9-416f-8744-2594cc7ca205)

10. The access key is successfully created, now it will show the access key as well as the secret access key, I will simply go and download the CSV file.

![Image](https://github.com/user-attachments/assets/a9679222-d84f-4855-a0d5-869667a8dc6d)


## ➡️ Step 2 - Configure AWS profile and set up the AWS CLI

We are going to configure basic settings that the AWS Command Line Interface (AWS CLI) uses to interact with AWS. These include your security credentials, the default output format, and the default AWS Region.


1. Open VS Code (or any IDE of your choise) 
2. Create a new directory for your Terraform project:

```bash
mkdir aws-ec2-terraform
cd aws-ec2-terraform
```

3. Run the command `aws configure`
2. Copy and paste your AWS Access Key ID
3. Copy and paste your AWS Secret Access key
4. Keep as default region name and output format

![1](https://github.com/julien-muke/aws-ec2-terraform/assets/110755734/ad38c212-ed4a-4730-9614-8a8959faab10)

5. To check if the AWS profile is configured run the following command `aws configure list`

![2](https://github.com/julien-muke/aws-ec2-terraform/assets/110755734/3d5a2a6f-9d22-4cf7-b065-3e5d2b0765c7)


## ➡️ Step 3 - Set Up Terraform Configuration

Now, let’s jump into Terraform and initialize our project.

1. Create a `main.tf` file inside our project directory

```bash
touch main.tf
```

2. Copy and paste the Terraform configuration below:

⚠️Note: Here’s a Terraform script to deploy a React.js app on AWS using an EC2 instance with Nginx. The setup includes:

✅ Provisioning an EC2 instance <br/>
✅ Installing Nginx <br/>
✅ Deploying a React.js app <br/>
✅ Configuring security groups <br/>
✅ Using user data to automate setup <br/>


```bash
provider "aws" {
  region = "us-east-1" # Change to your preferred region
}

resource "aws_instance" "react_app" {
  ami           = "ami-xxxxxxxxxxxx"  # Amazon Linux 2 AMI (Change based on your region)
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
              git clone https://github.com/yourusername/your-react-app.git /home/ec2-user/react-app
              
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
```

⚠️Note: Replace `https://github.com/yourusername/your-react-app.git` with your actual GitHub repository URL.

## ➡️ Step 4 - Deploy the Infrastructure with Terraform

1. Initialize Terraform

```bash
terraform init
```

2. Plan and Apply

```bash
terraform apply -auto-approve
```

3. Access Your App via the EC2 public IP

Find the instance in the AWS console and copy the public IP. Visit:

Open it in a browser: `http://your-ec2-public-ip`

You should see your React.js app running! 🚀

## 🗑️ Clean Up Resources

When you’re done, clean up your AWS resources to avoid charges:

```bash
terraform destroy
```
Thanks to the Tutorial 
<a href="https://youtu.be/Tbp6VJrq2ho?si=htW_VrEVu3E4XiEn" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

### Final Results:

![image](https://github.com/user-attachments/assets/0c2969fd-c1e9-4f49-ab1e-a87198484091)

![image](https://github.com/user-attachments/assets/859fc207-02f0-4fdc-b7eb-e96a3fda098e)

![image](https://github.com/user-attachments/assets/bf9312e7-d7e5-4d6e-9bba-bf07f0a45890)

![image](https://github.com/user-attachments/assets/14dd179c-b411-4a70-98e2-cf722f275ccc)

### The app run on the port : http://54.226.0.98

### Make sure to install AWS-CLI and Terraform-CLI before configuring it.


