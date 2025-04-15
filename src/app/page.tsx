'use client';

import SystemAnalysis from '@/components/SystemAnalysis';
import OptimizationRecommendations from '@/components/OptimizationRecommendations';
import AutomatedOptimization from '@/components/AutomatedOptimization';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-primary">Otimiza+</h1>
      <p className="text-muted-foreground mb-8">Otimize seu sistema para obter o máximo de desempenho.</p>

      <Tabs defaultValue="analise" className="w-full max-w-3xl">
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
              <SystemAnalysis/>
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
              <OptimizationRecommendations/>
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
              <AutomatedOptimization/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
