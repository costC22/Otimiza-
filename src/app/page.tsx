'use client';

import SystemAnalysis from '@/components/SystemAnalysis';
import OptimizationRecommendations from '@/components/OptimizationRecommendations';
import AutomatedOptimization from '@/components/AutomatedOptimization';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useTauri } from '@/hooks/use-tauri';
import { Settings } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const tauri = useTauri();
    const [isTauriAvailable, setIsTauriAvailable] = useState(false);

    useEffect(() => {
        setIsTauriAvailable(!!tauri);
    }, [tauri]);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Otimiza+</h1>
          <p className="text-lg mb-8">Otimize seu sistema para obter o máximo de desempenho.</p>
          
            <Button onClick={() => router.push('/system-analysis')}>
              Iniciar Análise Rápida
            </Button>
          
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6">
        <Tabs defaultValue="analise" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analise">Análise do Sistema</TabsTrigger>
            <TabsTrigger value="recomendações">Recomendações</TabsTrigger>
            <TabsTrigger value="otimização">Otimização Automática</TabsTrigger>
          </TabsList>
          <TabsContent value="analise" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise do Sistema</CardTitle>
                <CardDescription>Verifique seu sistema em busca de possíveis problemas.</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recomendações" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recomendações de Otimização</CardTitle>
                <CardDescription>Recomendações personalizadas para melhorar o desempenho.</CardDescription>
              </CardHeader>
              <CardContent>
                <OptimizationRecommendations />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="otimização" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Otimização Automatizada</CardTitle>
                <CardDescription>Scripts automatizados para otimizar as configurações do sistema.</CardDescription>
              </CardHeader>
              <CardContent>
                <AutomatedOptimization />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Otimiza+. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
