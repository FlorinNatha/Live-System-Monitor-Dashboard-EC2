const os = require('os');
const si = require('systeminformation');

const getSystemMetrics = async (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);
  
  const cpus = os.cpus();
  const cpuModel = cpus[0].model;
  const cpuCores = cpus.length;
  const cpuSpeed = cpus[0].speed;
  
  const uptimeSeconds = os.uptime();
  const uptimeHours = (uptimeSeconds / 3600).toFixed(2);

  let healthScore = 100;
  if (memoryUsagePercent > 90) healthScore -= 40;
  else if (memoryUsagePercent > 70) healthScore -= 20;

  let topProcesses = [];
  try {
    const processData = await si.processes();
    const sorted = processData.list.sort((a, b) => b.cpu - a.cpu);
    topProcesses = sorted.slice(0, 5).map(p => ({
      name: p.name,
      cpu: p.cpu.toFixed(1),
      mem: p.mem.toFixed(1),
      pid: p.pid
    }));
  } catch(e) {
    console.error("Error fetching processes", e);
  }
  
  res.json({
    topProcesses,
    platform: os.platform(),
    architecture: os.arch(),
    cpuModel,
    cpuCores,
    cpuSpeed,
    totalMemory: (totalMemory / (1024 ** 3)).toFixed(2),
    freeMemory: (freeMemory / (1024 ** 3)).toFixed(2),
    usedMemory: (usedMemory / (1024 ** 3)).toFixed(2),
    memoryUsagePercent,
    uptimeHours,
    healthScore,
    status: healthScore > 80 ? 'Optimal' : healthScore > 50 ? 'Warning' : 'Critical'
  });
};

module.exports = {
  getSystemMetrics
};
