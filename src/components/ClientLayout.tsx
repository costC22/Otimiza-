'use client';

import {useEffect, useState} from 'react';

const ClientLayout = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: 'N/A',
    cpu: 'N/A',
    memory: 'N/A',
    browser: 'N/A', // Add browser info
  });

  useEffect(() => {
    const getSystemInfo = async () => {
      if (typeof window !== 'undefined') {
        // Browser environment
        let osInfo = 'N/A';
        let cpuInfo = 'N/A';
        let memoryInfo = 'N/A';
        let browserInfo = 'N/A';

        if (navigator.userAgent) {
          browserInfo = navigator.userAgent;
        }

        if (navigator.platform) {
          osInfo = navigator.platform;
        }

        if (navigator.deviceMemory) {
          memoryInfo = `${navigator.deviceMemory} GB`;
        }

        setSystemInfo({
          os: osInfo,
          cpu: cpuInfo,
          memory: memoryInfo,
          browser: browserInfo,
        });
      } else {
        // Non-browser environment (e.g., server-side rendering)
        setSystemInfo({
          os: 'N/A',
          cpu: 'N/A',
          memory: 'N/A',
          browser: 'N/A',
        });
      }
    };

    getSystemInfo();
  }, []);

  return (
    <div className="mt-4 p-2 border-t border-gray-700">
      <h4 className="text-sm font-bold">Informações do Sistema</h4>
      <p className="text-xs">Sistema Operacional: {systemInfo.os}</p>
      <p className="text-xs">Navegador: {systemInfo.browser}</p>
      <p className="text-xs">CPU: {systemInfo.cpu}</p>
      <p className="text-xs">Memória: {systemInfo.memory}</p>
    </div>
  );
};

export default ClientLayout;
