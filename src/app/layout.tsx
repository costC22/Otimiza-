'use client';

import './globals.css';
import {Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider} from "@/components/ui/sidebar";
import ClientLayout from "@/components/ClientLayout";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-BR">
    <body>
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
          <ClientLayout/>
        </SidebarContent>
      </Sidebar>
      <main className="main-content" style={{ marginLeft: '200px', padding: '20px' }}>
        {children}
      </main>
    </SidebarProvider>
    </body>
    </html>
  );
}

export default RootLayout;
