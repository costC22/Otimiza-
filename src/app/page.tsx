
import SystemAnalysis from '@/components/SystemAnalysis';
import OptimizationRecommendations from '@/components/OptimizationRecommendations';
import AutomatedOptimization from '@/components/AutomatedOptimization';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-primary">OptiKing</h1>
      <p className="text-muted-foreground mb-8">Optimize your system for peak performance.</p>

      <Tabs defaultValue="analysis" className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">System Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="optimization">Auto Optimize</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Analysis</CardTitle>
              <CardDescription>Scan your system for potential issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemAnalysis/>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
              <CardDescription>Tailored recommendations to improve performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <OptimizationRecommendations/>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="optimization" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Optimization</CardTitle>
              <CardDescription>Automated scripts to optimize system settings.</CardDescription>
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
