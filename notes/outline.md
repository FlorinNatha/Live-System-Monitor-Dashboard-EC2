# Full DevOps Workflow for Live System Monitor Dashboard

## Prerequisites

### Before the session, ensure the following are installed or accounts are created:

1. **Node.js**
2. **Docker / DockerHub Account**
3. **Jenkins**
4. **Git/Github**
5. **AWS Account** (use university email if applicable)
    - **Reference**: [AWS Account Setup: Step-by-Step Guide for Beginners | How to create an AWS free tier account?](https://youtu.be/NbWBE4Mh-tI?si=aLUmKep0zOrGiNGH)


---

## Workflow Outline

### 1. Introduction to Deployment

- **Overview:**
  - Importance of deployment in modern software development.
  - Introduction to CI/CD, Docker, Jenkins, and AWS EC2.

- **Architecture Diagram:**
  - Node.js Metrics API + React Monitor Dashboard Deployment Workflow.

---

### 2. Setting Up the Environment

- **Prerequisites:**
  - Node.js, React, Docker, Jenkins, AWS Account, and Git (install before the session).

- **Install Necessary Tools:**
  - Node.js and npm for development.
  - Docker for containerization.
  - Jenkins for CI/CD.
  - AWS CLI for interacting with AWS.

- **Initialize Sample Projects:**
  - Backend: Node.js Express API serving live system metrics.
  - Frontend: React UI for real-time monitoring dashboard.

---

### 3. Containerization of the Applications

- **Docker Basics:**
  - What is Docker and why use it?
  - Key concepts: Images, Containers, Dockerfiles.

- **Creating Dockerfiles:**
  - **Node.js Backend Dockerfile:**
    - Use a base Node.js image.
    - Install dependencies and copy source files.
    - Expose the backend port.
  - **React Frontend Dockerfile:**
    - Use a base Node.js image for build.
    - Use a lightweight server like Nginx for serving.
    - Build the React app and serve it with Nginx.

- **Building and Running Docker Images:**
  - Build Docker images for backend and frontend.
  - Run containers locally and test functionality.

---

### 4. Setting Up a CI/CD Pipeline with Jenkins

- **Introduction to Jenkins:**
  - Overview and role in CI/CD workflows.
  - Install Jenkins on a local machine or server.

- **Integrate Jenkins with Git:**
  - Connect Jenkins to a Git repository hosting the source code.
  - Trigger builds on every commit.

- **Create Jenkins Pipelines:**
  - **Backend Pipeline:**
    - Pull code, build Docker image, push to Docker Hub (or other container registries).
  - **Frontend Pipeline:**
    - Same steps as backend with frontend-specific configurations.

- **Test Pipelines:**
  - Verify successful execution for both applications.

---

### 5. Deploying Applications to AWS EC2

- **Setup EC2 Instances:**
  - Launch EC2 instance and configure security groups (open necessary ports).
  - SSH into the EC2 instance and install Docker.

- **Deploy Applications:**
  - Pull backend and frontend Docker images from the container registry.
  - Verify deployments via EC2 public IP.
  - **Optional:** Use `docker-compose` to orchestrate multi-container deployment.

---

### 6. Automating Deployment with Jenkins

- Extend Jenkins pipelines to:
  - SSH into the EC2 instance.
  - Pull and deploy updated Docker images after successful builds.
  - Restart running containers.

- **Demo:** End-to-end deployment automation.

---

### 7. Monitoring and Logging (Extra)

- **Application Logging:**
  - Enable logging within applications for troubleshooting.

- **Docker Logging:**
  - Utilize Docker's built-in logging features.

- **Monitoring EC2 Instances:**
  - Use AWS CloudWatch or similar tools to monitor instances.
