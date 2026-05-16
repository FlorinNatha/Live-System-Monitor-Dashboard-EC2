const os = require('os');

const getSystemMetrics = (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);
  
  const cpus = os.cpus();
  const cpuModel = cpus[0].model;
  const cpuCores = cpus.length;
  
  const uptimeSeconds = os.uptime();
  const uptimeHours = (uptimeSeconds / 3600).toFixed(2);

  let healthScore = 100;
  if (memoryUsagePercent > 90) healthScore -= 40;
  else if (memoryUsagePercent > 70) healthScore -= 20;
  
  res.json({
    platform: os.platform(),
    architecture: os.arch(),
    cpuModel,
    cpuCores,
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
