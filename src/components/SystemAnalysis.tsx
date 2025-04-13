'use client';

import {Button} from "@/components/ui/button";
import {analyzeSystem} from "@/services/system-analysis";
import {toast} from "@/hooks/use-toast";
import {useTransition} from "react";
import {useState} from "react";

const SystemAnalysis = () => {
  const [isPending, startTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleSystemScan = () => {
    startTransition(async () => {
      try {
        const analysisResults = await analyzeSystem();
        setAnalysisResult(analysisResults);
        setAnalysisError(null);
        toast({
          title: "Análise do Sistema Concluída",
          description: analysisResults,
        });
      } catch (error: any) {
        console.error("System analysis error:", error);
        setAnalysisResult(null);
        setAnalysisError(error.message || "Falha ao analisar o sistema.");
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
        Analise seu sistema em busca de arquivos temporários, processos desnecessários e potenciais gargalos de
        desempenho.
      </p>
      <Button disabled={isPending} onClick={handleSystemScan}>
        {isPending ? "Analisando..." : "Executar Análise do Sistema"}
      </Button>

      {analysisResult && (
        <div className="text-green-500">
          Resultado: {analysisResult}
        </div>
      )}

      {analysisError && (
        <div className="text-red-500">
          Erro: {analysisError}
        </div>
      )}
    </div>
  );
};

export default SystemAnalysis;
