import { useState, useEffect } from "react";
import "../App.css";

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:8000/metrics");
      const data = await response.json();
      setMetrics(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Refresh every 2 seconds
    const interval = setInterval(fetchMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading">Initializing Telemetry...</div>;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Optimal': return '#00ff88';
      case 'Warning': return '#ffcc00';
      case 'Critical': return '#ff3366';
      default: return '#fff';
    }
  };

  return (
    <div className="monitor-container">
      <header className="monitor-header">
        <h1>Live System Monitor Dashboard</h1>
        <div className="status-badge" style={{ borderColor: getStatusColor(metrics.status), color: getStatusColor(metrics.status) }}>
          <span className="pulse" style={{ backgroundColor: getStatusColor(metrics.status) }}></span>
          {metrics.status} System
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card glass">
          <h3>Health Score</h3>
          <div className="metric-value huge" style={{ color: getStatusColor(metrics.status) }}>
            {metrics.healthScore}%
          </div>
          <p className="metric-desc">Overall System Reliability</p>
        </div>

        <div className="metric-card glass">
          <h3>Memory Usage</h3>
          <div className="metric-value">
            {metrics.memoryUsagePercent}%
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${metrics.memoryUsagePercent}%`, backgroundColor: metrics.memoryUsagePercent > 80 ? '#ff3366' : '#00ff88' }}
            ></div>
          </div>
          <p className="metric-desc">{metrics.usedMemory} GB / {metrics.totalMemory} GB Used</p>
        </div>

        <div className="metric-card glass">
          <h3>System Uptime</h3>
          <div className="metric-value">
            {metrics.uptimeHours} <span className="unit">hrs</span>
          </div>
          <p className="metric-desc">Continuous operation time</p>
        </div>

        <div className="metric-card glass col-span-2">
          <h3>Hardware Specifications</h3>
          <ul className="hw-list">
            <li><strong>CPU Model:</strong> {metrics.cpuModel}</li>
            <li><strong>Cores:</strong> {metrics.cpuCores} Core Processor</li>
            <li><strong>Architecture:</strong> {metrics.architecture} ({metrics.platform})</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
