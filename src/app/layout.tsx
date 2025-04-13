'use client'

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider} from "@/components/ui/sidebar";
import {useEffect, useState} from "react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Otimiza+ - System Optimizer',
  description: 'Optimize your system for peak performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [systemInfo, setSystemInfo] = useState({
    os: '',
    cpu: '',
    memory: ''
  });

  useEffect(() => {
    async function getSystemInfo() {
      try {
        const osInfo = await import('os');
        const cpuInfo = osInfo.cpus()[0].model;
        const totalMemory = osInfo.totalmem();
        const totalMemoryGB = (totalMemory / (1024 * 1024 * 1024)).toFixed(2);

        setSystemInfo({
          os: osInfo.platform(),
          cpu: cpuInfo,
          memory: `${totalMemoryGB} GB`
        });
      } catch (error) {
        console.error("Failed to fetch system info:", error);
        setSystemInfo({
          os: 'N/A',
          cpu: 'N/A',
          memory: 'N/A'
        });
      }
    }

    getSystemInfo();
  }, []);

  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <a href="/" className="flex items-center space-x-2">
                <span>Início</span>
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <a href="/analysis" className="flex items-center space-x-2">
                <span>Análise do Sistema</span>
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <a href="/recommendations" className="flex items-center space-x-2">
                <span>Recomendações</span>
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <a href="/optimization" className="flex items-center space-x-2">
                <span>Otimização Automática</span>
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-4 p-2 border-t border-gray-700">
            <h4 className="text-sm font-bold">Informações do Sistema</h4>
            <p className="text-xs">Sistema Operacional: {systemInfo.os}</p>
            <p className="text-xs">CPU: {systemInfo.cpu}</p>
            <p className="text-xs">Memória: {systemInfo.memory}</p>
          </div>
        </SidebarContent>
      </Sidebar>
      <main className="main-content">
        {children}
      </main>
    </SidebarProvider>
    </body>
    </html>
  );
}

