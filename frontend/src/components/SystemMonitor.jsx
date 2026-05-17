import { useState, useEffect } from "react";
import "../App.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:8000/metrics");
      const data = await response.json();
      setMetrics(data);
      
      const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
      setHistory(prev => {
        const newHistory = [...prev, { time, memory: parseFloat(data.memoryUsagePercent) }];
        if (newHistory.length > 20) newHistory.shift();
        return newHistory;
      });

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

        <div className="metric-card glass col-span-3">
          <h3>Live Memory Usage</h3>
          <div style={{ width: '100%', height: 250, marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#a0a0a0" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#a0a0a0" fontSize={12} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#00ff88' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#00ff88" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#00ff88', strokeWidth: 2, stroke: '#242424' }}
                  activeDot={{ r: 6 }} 
                  isAnimationActive={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="metric-card glass">
          <h3>Hardware Specifications</h3>
          <ul className="hw-list">
            <li><strong>CPU Model:</strong> {metrics.cpuModel}</li>
            <li><strong>Cores:</strong> {metrics.cpuCores} Core Processor</li>
            <li><strong>Clock Speed:</strong> {(metrics.cpuSpeed / 1000).toFixed(2)} GHz ({metrics.cpuSpeed} MHz)</li>
            <li><strong>Architecture:</strong> {metrics.architecture} ({metrics.platform})</li>
          </ul>
        </div>

        <div className="metric-card glass col-span-2">
          <h3>Top Active Processes</h3>
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#888' }}>
                  <th style={{ padding: '0.5rem' }}>PID</th>
                  <th style={{ padding: '0.5rem' }}>Process Name</th>
                  <th style={{ padding: '0.5rem' }}>CPU %</th>
                  <th style={{ padding: '0.5rem' }}>Memory %</th>
                </tr>
              </thead>
              <tbody>
                {metrics.topProcesses && metrics.topProcesses.map((proc, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.5rem', color: '#a0a0a0' }}>{proc.pid}</td>
                    <td style={{ padding: '0.5rem', color: '#fff', fontWeight: '500' }}>{proc.name}</td>
                    <td style={{ padding: '0.5rem', color: '#ffcc00' }}>{proc.cpu}%</td>
                    <td style={{ padding: '0.5rem', color: '#00ff88' }}>{proc.mem}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
