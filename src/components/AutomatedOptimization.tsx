'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useTransition, useEffect} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {runOptimization} from "@/services/system-optimization";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();

  const handleOptimization = async () => {
    startTransition(async () => {
      try {
        const result = await runOptimization();
        toast({
          title: "Otimização Concluída",
          description: result,
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
    
      
        Realizar a limpeza de arquivos temporários, desativar programas de inicialização
        desnecessários e otimizar as configurações do sistema.
      

      
        {isPending ? "Otimizando..." : "Executar Otimização Automática"}
      
    
  );
};

export default AutomatedOptimization;

