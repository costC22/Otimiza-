'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useTransition, useEffect, useCallback} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTauri } from "@/hooks/use-tauri";
import {getAvailableVolumes} from "@/ai/flows/get-available-volumes-flow";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const [volumes, setVolumes] = useState<string[]>([]);
	const tauri = useTauri();


  const fetchVolumes = useCallback(async () => {
    try {
        const result = await getAvailableVolumes();
        if (result && result.volumes) {
            setVolumes(result.volumes);
        } else {
            console.warn("Nenhum volume foi encontrado");
            toast({
                title: "Erro ao carregar volumes",
                description: "Não foi possível carregar a lista de volumes.",
                variant: "destructive",
            });
        }
    } catch (error) {
        console.error("Falha ao carregar volumes", error);
        toast({
            title: "Erro ao carregar volumes",
            description: "Não foi possível carregar a lista de volumes.",
            variant: "destructive",
        });
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
					result = "Otimização não disponível no navegador.";
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
