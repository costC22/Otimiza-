'use client';

import React, { useState, useEffect } from 'react';

interface SystemInfo {
  os: string;
  cpu: string;
  memory: string;
  browser: string;
}

export const SystemInformation = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    os: 'N/A',
    cpu: 'N/A',
    memory: 'N/A',
    browser: 'N/A',
  });

  useEffect(() => {
    const getSystemInfo = async () => {
      if (typeof window !== 'undefined') {
        let osInfo = navigator.platform || 'N/A';
        let cpuInfo = 'Informação indisponível no navegador';
        let memoryInfo = 'N/A';
        let browserInfo = navigator.userAgent || 'N/A';

        if ('deviceMemory' in navigator) {
          memoryInfo = `${(navigator as any).deviceMemory} GB`;
        }

        setSystemInfo({
          os: osInfo,
          cpu: cpuInfo,
          memory: memoryInfo,
          browser: browserInfo,
        });
      }
    };

    getSystemInfo();
  }, []);

  return (
    <>
      <h1>Informações do Sistema</h1>
      <ul>
        <li>
          <strong>Sistema Operacional:</strong> {systemInfo.os}
        </li>
        <li>
          <strong>Navegador:</strong> {systemInfo.browser}
        </li>
        <li>
          <strong>CPU:</strong> {systemInfo.cpu}
        </li>
        <li>
          <strong>Memória:</strong> {systemInfo.memory}
        </li>
      </ul>
    </>
  );
};