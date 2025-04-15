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
        
            
                Informações do Sistema
            
            
                
                    Sistema Operacional: {systemInfo.os}
                
                
                    Navegador: {systemInfo.browser}
                
                
                    CPU: {systemInfo.cpu}
                
                
                    Memória: {systemInfo.memory}
                
            
        
    );
};
