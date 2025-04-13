import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarProvider} from "@/components/ui/sidebar";

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

  return (
    <html lang="pt-BR">
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
          {/*Moved to ClientLayout*/}
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

