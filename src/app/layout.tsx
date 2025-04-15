'use client';

import './globals.css';
import { Geist } from 'next/font/google';
import { Home, ListChecks, Rocket, System } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Otimiza+ - System Optimizer',
  description: 'Optimize your system for peak performance.',
};

interface SystemInfo {
  os: string;
  cpu: string;
  memory: string;
  browser: string;
}

const SystemInformation = () => {
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

const ClientSideSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          
            
              <SidebarMenuItem href="/">
                <Home className="mr-2 h-4 w-4" />
                Início
              </SidebarMenuItem>
            
            
              <SidebarMenuItem href="/system-analysis">
                <System className="mr-2 h-4 w-4" />
                Análise do Sistema
              </SidebarMenuItem>
            
            
              <SidebarMenuItem href="/recommendations">
                <ListChecks className="mr-2 h-4 w-4" />
                Recomendações
              </SidebarMenuItem>
            
            
              <SidebarMenuItem href="/auto-optimize">
                <Rocket className="mr-2 h-4 w-4" />
                Otimização Automática
              </SidebarMenuItem>
            
          
          
            <SystemInformation />
          
        </SidebarContent>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    
      
        
          <ClientSideSidebar>
            
              {children}
            
          </ClientSideSidebar>
        
      
    
  );
}

export default RootLayout;

    