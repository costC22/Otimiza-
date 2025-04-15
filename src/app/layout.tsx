import './globals.css';
import { Geist } from 'next/font/google';
import { Home, ListChecks, Rocket, Settings } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { SystemInformation } from "@/components/SystemInformation";
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
                <Home className="mr-2 h-4 w-4" />
                Início
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
