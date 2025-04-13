'use server';

import os from 'os';

const ClientLayout = async () => {
  let systemInfo = {
    os: 'N/A',
    cpu: 'N/A',
    memory: 'N/A'
  };

  try {
    const cpuInfo = os.cpus();
    const totalMemory = os.totalmem();
    const totalMemoryGB = (totalMemory / (1024 * 1024 * 1024)).toFixed(2);

    systemInfo = {
      os: os.platform(),
      cpu: cpuInfo.length > 0 ? cpuInfo[0].model : 'N/A',
      memory: `${totalMemoryGB} GB`
    };
  } catch (error) {
    console.error("Failed to fetch system info:", error);
  }

  return (
    <div className="mt-4 p-2 border-t border-gray-700">
      <h4 className="text-sm font-bold">Informações do Sistema</h4>
      <p className="text-xs">Sistema Operacional: {systemInfo.os}</p>
      <p className="text-xs">CPU: {systemInfo.cpu}</p>
      <p className="text-xs">Memória: {systemInfo.memory}</p>
    </div>
  );
};

export default ClientLayout;
