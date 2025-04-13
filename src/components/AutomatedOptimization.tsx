'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {runOptimization} from "@/services/system-optimization";
import {useState, useTransition} from "react";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);

  const handleOptimization = () => {
    startTransition(async () => {
      try {
        const result = await runOptimization();
        setOptimizationResult(result);
        setOptimizationError(null);
        toast({
          title: "Otimização Concluída",
          description: result,
        });
      } catch (error: any) {
        console.error("Optimization error:", error);
        setOptimizationResult(null);
        setOptimizationError(error.message || "Ocorreu um erro durante a otimização.");
        toast({
          title: "Falha na Otimização",
          description: error.message || "Ocorreu um erro durante a otimização.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">
        Execute scripts automatizados para limpar arquivos temporários, desativar programas de inicialização
        desnecessários e otimizar as configurações do sistema.
      </p>
      <Button disabled={isPending} onClick={handleOptimization}>
        {isPending ? "Otimizando..." : "Executar Otimização Automática"}
      </Button>

      {optimizationResult && (
        <div className="text-green-500">
          Resultado: {optimizationResult}
        </div>
      )}

      {optimizationError && (
        <div className="text-red-500">
          Erro: {optimizationError}
        </div>
      )}
    </div>
  );
};

export default AutomatedOptimization;
