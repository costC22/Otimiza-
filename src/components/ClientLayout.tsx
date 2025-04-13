'use client';

import os from 'os';
import {useEffect, useState} from "react";

const ClientLayout = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: 'N/A',
    cpu: 'N/A',
    memory: 'N/A'
  });

  useEffect(() => {
    const getSystemInfo = async () => {
      try {
        const osInfo = os;
        const cpuInfo = osInfo.cpus();
        const totalMemory = osInfo.totalmem();
        const totalMemoryGB = (totalMemory / (1024 * 1024 * 1024)).toFixed(2);

        setSystemInfo({
          os: osInfo.platform(),
          cpu: cpuInfo.length > 0 ? cpuInfo[0].model : 'N/A',
          memory: `${totalMemoryGB} GB`
        });
      } catch (error) {
        console.error("Failed to fetch system info:", error);
      }
    };

    getSystemInfo();
  }, []);

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
