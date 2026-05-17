# 📊 Live System Monitor Dashboard (AWS EC2)

![Project Status](https://img.shields.io/badge/Status-Active-success)
![AWS](https://img.shields.io/badge/Deployed%20on-AWS%20EC2-FF9900?logo=amazonaws)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)

A full-stack, enterprise-style infrastructure monitoring tool designed to track and visualize live hardware telemetry from an AWS EC2 instance. This project bridges the gap between **Software Development** and **IT Operations (DevOps)** by providing a beautiful, real-time dashboard of the server it is deployed on.

---

## 🚀 Key Features

* **Real-Time Telemetry Tracking**: Monitors the exact hardware it runs on (whether your local laptop or an AWS Linux Server).
* **Live Memory Usage Chart**: Utilizes `Recharts` to draw a dynamic, real-time line graph tracking memory consumption over a rolling 60-second window.
* **Top Active Processes (Task Manager)**: Safely polls the operating system to display the top 5 highest CPU-consuming background processes in real-time.
* **Intelligent Health Scoring**: Calculates an overall "Server Health Score" that drops dynamically if memory thresholds are exceeded, with pulsing UI alerts (Optimal/Warning/Critical).
* **Hardware Interrogation**: Extracts raw system specifications including CPU Architecture, live Cycle Count (MHz/GHz), core count, and system uptime.
* **Modern Premium UI**: Built with a sleek, dark-mode Glassmorphism aesthetic featuring CSS micro-animations.

---

## 🛠️ Technology Stack

**Frontend (The Visuals):**
* React.js (Vite)
* Recharts (Data Visualization)
* Vanilla CSS (Glassmorphism UI)

**Backend (The Brains):**
* Node.js & Express.js
* `os` (Native Node.js Operating System Module)
* `systeminformation` (Advanced Hardware & Process Polling)

**Cloud Infrastructure:**
* AWS EC2 (Ubuntu Linux)
* Security Groups (Ports 3000 & 8000)

---

## 💻 How It Works Under The Hood

The Node.js backend serves as a telemetry agent. Every 2 seconds, it interrogates the host Operating System (Linux or Windows) to grab a snapshot of the CPU load, RAM availability, and process IDs. It formats this data into a JSON payload and streams it to the React frontend. 

By deploying this directly onto an **AWS EC2 instance**, the dashboard transforms from a standard web app into a legitimate cloud monitoring tool, exposing the hidden metrics of Amazon's enterprise hardware.

---

## ⚙️ Running Locally

If you want to run this on your personal machine to monitor your local hardware:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FlorinNatha/Live-System-Monitor-Dashboard-EC2.git
   cd Live-System-Monitor-Dashboard-EC2
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Start the Frontend:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## ☁️ Deploying to AWS EC2

To monitor an actual cloud server:

1. **Launch an EC2 Instance:** Spin up an Ubuntu `t2.micro` or `t3.micro` instance.
2. **Configure Security Groups:** Open Port `3000` (Frontend) and Port `8000` (Backend) to `0.0.0.0/0`.
3. **Pull the Code on EC2:** SSH into the instance and `git pull` the repository.
4. **Update IP Address:** In `frontend/src/components/SystemMonitor.jsx`, change the fetch URL to your EC2's Public IP (e.g., `http://YOUR_EC2_IP:8000/metrics`).
5. **Build & Serve Frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   sudo npm install -g serve
   serve -s dist -l 3000
   ```
6. **Run Backend:**
   ```bash
   cd backend
   npm install
   node index.js
   ```

*(For production environments, it is recommended to use `pm2` to keep the backend running in the background).*
