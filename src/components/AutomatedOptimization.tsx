'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {runOptimization} from "@/services/system-optimization";
import {useState, useTransition, useEffect, useCallback} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTauri } from "@/hooks/use-tauri";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const [volumes, setVolumes] = useState<string[]>([]);
	const tauri = useTauri();


  const fetchVolumes = useCallback(async () => {
    if (tauri) {
      try {
        const { invoke } = tauri;
        const output = await invoke<string>('get_system_info');
        const volumes = ['C', 'D'];
        setVolumes(volumes);
      } catch (error) {
        console.error("Falha ao carregar volumes:", error);
        toast({
          title: "Falha ao carregar volumes",
          description: "Não foi possível carregar a lista de volumes.",
          variant: "destructive",
        });
      }
    } else {
      console.warn("Tauri não detectado. Usando volumes padrão.");
      setVolumes(['C', 'D']);
    }
  }, [tauri]);

  useEffect(() => {
    fetchVolumes();
  }, [fetchVolumes]);

  const handleOptimization = async () => {
    startTransition(async () => {
      try {
        let result: string;
				if(tauri){
					const { invoke } = tauri;
					result = await invoke<string>('run_defrag', { volume: selectedVolume || 'C' });
				}else{
					result = await runOptimization(selectedVolume || undefined);
				}
        setOptimizationResult(result);
        setOptimizationError(null);
        toast({
          title: "Otimização Concluída",
          description: result,
        });
      } catch (error: any) {
        console.error("Erro de otimização:", error);
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
    
      
        Realizar a limpeza de arquivos temporários, desativar programas de inicialização
        desnecessários e otimizar as configurações do sistema.
      

      {/* Volume selection */}
      {volumes.length > 0 && (
        
          
            Selecione o Volume para Desfragmentar:
          
          
            
              
                Selecionar Volume
              
            
            
              {volumes.map((volume) => (
                
                  {volume}
                
              ))}
            
          
        
      )}

      
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
