
'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {RunSystemOptimizationInput, runSystemOptimization} from "@/ai/flows/system-optimization-flow";
import {useTransition} from "react";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();

  const handleOptimization = async () => {
    startTransition(async () => {
      try {
        const optimizationInput: RunSystemOptimizationInput = {optimizationType: 'tempFiles'};
        const result = await runSystemOptimization(optimizationInput);
        toast({
          title: "Otimização Concluída",
          description: result.result,
        });
      } catch (error: any) {
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
      <p className="text-muted-foreground">Execute scripts automatizados para limpar arquivos temporários, desativar programas de inicialização desnecessários e otimizar as configurações do sistema.</p>
      <Button disabled={isPending} onClick={handleOptimization}>
        {isPending ? "Otimizando..." : "Executar Otimização Automática"}
      </Button>
    </div>
  );
};

export default AutomatedOptimization;
