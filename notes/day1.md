# Full DevOps Workflow for Node.js Backend and React Frontend Deployment

## Day 01: Introduction to Deployment and Tools

### Topics

#### Introduction

- **What is CI/CD Pipeline and Why is it Needed?**
  - CI/CD pipelines automate the process of building, testing, and deploying applications. They reduce manual errors, provide consistent deployments, and enable faster delivery cycles.

#### Tools Overview

- **Git**: Version control system to manage source code.
- **Jenkins**: Automation server for building CI/CD pipelines.
- **Docker**: Containerization tool for packaging applications with dependencies.
- **Docker Hub**: Public container registry for sharing Docker images.

#### Containerization Basics

- **Why Use Containers?**
  - Portability, lightweight nature, and consistency across environments.
- **Key Concepts**:
  - Docker Images: Blueprint of the application.
  - Docker Containers: Running instances of images.

#### Deploying Docker Images to Registries

- Deploying images to:
  - **Docker Hub**: Default public registry.
  - **ECR/EKS**: Amazon services for private registries and Kubernetes orchestration.

#### Introduction to Deployments

- **Where to Deploy Applications?**
  - Options include AWS EC2, DigitalOcean, and other cloud platforms.

#### Jenkins Introduction and Configuration

- **Why Jenkins?**
  - It automates build and deployment processes.
- **Setup Steps**:
  - Install Jenkins.
  - Configure Jenkins with necessary plugins and GitHub integration.

#### What are Webhooks?

- **Introduction**:
  - Mechanism to trigger CI/CD processes in real-time when changes occur.
- **Examples**:
  - Stripe/PayPal events, GitHub push events.

---

## EC2 Deployment Architecture and Implementation

### Architecture Diagram

- A detailed diagram showcasing the flow between:
  - **Frontend**: React application served via Nginx.
  - **Backend**: Node.js API server.
  - **Database** (if applicable).
  - Deployment infrastructure.

### Basic EC2 Deployment Steps

#### Setting Up the EC2 Instance

1. Launch an EC2 instance with an appropriate security group.
2. Open necessary ports (e.g., 3000 for React, 8080 for Node.js).

#### Backend Deployment

1. SSH into the instance.
2. Install Node.js and npm.
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
   ```
3. Clone the repository:
   ```bash
   git clone <repo_url>
   ```
4. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
5. Start the backend server using **PM2** for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start index.js
   ```

#### Frontend Deployment

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies and build the React app:
   ```bash
   npm install
   npm run build
   ```
3. Serve the built React app (Vite outputs to `dist` directory) using `serve`:

   ```bash
   # Make sure you are in the 'frontend' directory, NOT inside 'dist'
   cd ~/Live-System-Monitor-Dashboard-EC2/frontend
   sudo npm install -g serve
   serve -s dist -l 3000
   ```

4. Serve on the default HTTP port (80) as a super user:

   ```bash
   # Make sure you are in the 'frontend' directory
   cd ~/Live-System-Monitor-Dashboard-EC2/frontend
   sudo apt update
   sudo apt install nodejs npm
   sudo npm install -g serve
   sudo serve -s dist -l 80
   ```

### Updating Endpoint Configurations

- Change the API endpoint in the frontend to point to your EC2 public IP.
- Edit the fetch URL in your component (e.g., `SystemMonitor.jsx`):
  ```bash
  vi src/components/SystemMonitor.jsx
  ```
- Save and exit:
  - **Save and Quit**: `:wq`
  - **Quit Without Saving**: `:q!`

---

### DNS and HTTPS Setup

1. Configure a domain name using a DNS provider.
2. Install and configure **Nginx**:
   - Install Nginx:
     ```bash
     sudo apt install nginx
     ```
   - Configure Nginx to reverse proxy to the backend and frontend.
3. Enable HTTPS with **Certbot**:
   - Install Certbot:
     ```bash
     sudo apt install certbot python3-certbot-nginx
     ```
   - Obtain and apply an SSL certificate:
     ```bash
     sudo certbot --nginx
     ```
