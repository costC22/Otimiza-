'use client';

import { useEffect, useState } from 'react';
import { useTauri } from "@/hooks/use-tauri";

const ClientLayout = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: 'N/A',
    cpu: 'N/A',
    memory: 'N/A'
  });

  const tauri = useTauri();

  useEffect(() => {
    const getSystemInfo = async () => {
      try {
        if (tauri) {
          const osInfo = await tauri.os.platform();
          const cpuInfo = await tauri.os.version();
          const totalMemory = await tauri.os.type();

          setSystemInfo({
            os: osInfo || 'N/A',
            cpu: cpuInfo || 'N/A',
            memory: totalMemory || 'N/A'
          });
        }
      } catch (error) {
        console.error("Failed to fetch system info:", error);
      }
    };

    getSystemInfo();
  }, [tauri]);

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
