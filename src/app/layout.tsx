'use client';

import './globals.css';
import {Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider} from "@/components/ui/sidebar";
import { Geist } from 'next/font/google';
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Otimiza+ - System Optimizer',
  description: 'Optimize your system for peak performance.',
};

import {useEffect, useState} from "react";
import { Home, ListChecks, Rocket, System } from 'lucide-react';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    
      
        
          
            
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
            
          
        
      
      
        {children}
        
        
      
    
  );
}

export default RootLayout;
