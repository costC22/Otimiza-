'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useTransition, useEffect} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {invoke} from '@tauri-apps/api/tauri';
import {useTauri} from "@/hooks/use-tauri";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);
  const [volumes, setVolumes] = useState<string[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const tauri = useTauri();

  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        if (tauri && tauri.invoke) {
          const result = await tauri.invoke('get_available_volumes');
          if (result && typeof result === 'object' && result.volumes) {
            setVolumes(result.volumes);
          } else {
            console.error('Failed to fetch available volumes:', result);
          }
        } else {
          console.error('Tauri invoke is not available.');
        }
      } catch (error) {
        console.error('Failed to fetch available volumes:', error);
      }
    };

    fetchVolumes();
  }, [tauri]);

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

        if (tauri && tauri.invoke) {
          const result = await tauri.invoke('disk_defrag', {volume: selectedVolume});
          setOptimizationResult(`Otimização concluída com sucesso no volume ${selectedVolume}! ${result}`);
          setOptimizationError(null);
          toast({
            title: "Otimização Concluída",
            description: `Otimização concluída com sucesso no volume ${selectedVolume}!`,
          });
        } else {
          console.error('Tauri invoke is not available.');
          toast({
            title: "Erro",
            description: "Tauri não está disponível.",
            variant: "destructive",
          });
        }
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
          
            
              Selecionar Volume:
            
            
              {volumes.map((volume) => (
                setSelectedVolume(volume)}
                  >{volume}
                
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


