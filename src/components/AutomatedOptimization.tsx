'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useTransition, useEffect} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { invoke } from '@tauri-apps/api/tauri';

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);
  const [volumes, setVolumes] = useState<string[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        const result = await invoke('get_available_volumes');
        if (result && typeof result === 'object' && result.volumes) {
          setVolumes(result.volumes);
        } else {
          console.error('Failed to fetch available volumes:', result);
        }
      } catch (error) {
        console.error('Failed to fetch available volumes:', error);
      }
    };

    fetchVolumes();
  }, []);

  const handleOptimization = async () => {
    startTransition(async () => {
      try {
        if (!selectedVolume) {
          toast({
            title: "Erro",
            description: "Por favor, selecione um volume para otimizar.",
            variant: "destructive",
          });
          return;
        }

        const result = await invoke('disk_defrag', { volume: selectedVolume });
        setOptimizationResult(`Otimização concluída com sucesso no volume ${selectedVolume}! ${result}`);
        setOptimizationError(null);
        toast({
          title: "Otimização Concluída",
          description: `Otimização concluída com sucesso no volume ${selectedVolume}!`,
        });
      } catch (error: any) {
        setOptimizationResult(null);
        setOptimizationError(`Ocorreu um erro durante a otimização: ${error.message}`);
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
      

       {
            volumes.length > 0 ? (
              
                
                  Selecione o Volume:
                
                
                  {volumes.map((volume) => (
                     setSelectedVolume(volume)}>{volume}
                  ))}
                
              
            ) : (
              
                Carregando volumes disponíveis...
              
            )
          }
      
        {isPending ? "Otimizando..." : "Executar Otimização Automática"}
      

      {optimizationResult && (
        
          Resultado: {optimizationResult}
        
      )}

      {optimizationError && (
        
          Erro: {optimizationError}
        
      )}
    
  );
};

export default AutomatedOptimization;

    