'use client';

import './globals.css';
import { Geist } from 'next/font/google';
import { ListChecks, Rocket, Settings } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import {metadata} from './metadata';
import React from "react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const ClientSideSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          
            
              <SidebarMenuItem href="/">
                <Settings className="mr-2 h-4 w-4" />
                Painel de Controle
              </SidebarMenuItem>
            
            
              <SidebarMenuItem href="/system-analysis">
                <Settings className="mr-2 h-4 w-4" />
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
    <html lang="pt-BR">
      <body className={geistSans.className}>
        
          <ClientSideSidebar>
            
              {children}
            
          </ClientSideSidebar>
        
      
      </body>
    </html>
  );
}

export default RootLayout;

