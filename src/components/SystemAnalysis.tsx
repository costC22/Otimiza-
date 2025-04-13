'use client';

import {Button} from "@/components/ui/button";
import {analyzeSystem} from "@/services/system-analysis";
import {toast} from "@/hooks/use-toast";
import {useTransition} from "react";

const SystemAnalysis = () => {
  const [isPending, startTransition] = useTransition();

  const handleSystemScan = async () => {
    startTransition(async () => {
      try {
        const analysisResults = await analyzeSystem();
        toast({
          title: "Análise do Sistema Concluída",
          description: analysisResults,
        });
      } catch (error: any) {
        toast({
          title: "Falha na Análise do Sistema",
          description: error.message || "Falha ao analisar o sistema.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">
        Analise seu sistema em busca de arquivos temporários, processos desnecessários e potenciais gargalos de desempenho.
      </p>
      <Button disabled={isPending} onClick={handleSystemScan}>
        {isPending ? "Analisando..." : "Executar Análise do Sistema"}
      </Button>
    </div>
  );
};

export default SystemAnalysis;
