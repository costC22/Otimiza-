'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useTransition, useEffect} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const [availableVolumes, setAvailableVolumes] = useState<string[]>([]);

    useEffect(() => {
        const fetchVolumes = async () => {
            if (typeof window !== 'undefined' && window.__TAURI__) {
                try {
                    const { invoke } = await import('@tauri-apps/api/tauri');
                    const volumes = await invoke<string[]>('get_available_volumes');
                    setAvailableVolumes(volumes);
                } catch (error) {
                    console.error("Failed to fetch available volumes:", error);
                    toast({
                        title: "Failed to fetch volumes",
                        description: "Could not retrieve available volumes.",
                        variant: "destructive",
                    });
                }
            } else {
                setAvailableVolumes([]); // No volumes available in web mode
            }
        };

        fetchVolumes();
    }, []);

  const handleOptimization = async () => {
    startTransition(async () => {
      try {
        const result = await runOptimization(selectedVolume);
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
      

        <Select onValueChange={setSelectedVolume}>
          <SelectTrigger>
            <SelectValue placeholder="Selecionar Volume"/>
          </SelectTrigger>
          <SelectContent>
            {availableVolumes.map(volume => (
              <SelectItem key={volume} value={volume}>{volume}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      
      
        {isPending ? "Otimizando..." : "Executar Otimização Automática"}
      
    
  );
};

export default AutomatedOptimization;

import {getSystemOptimizationRecommendation} from "@/ai/flows/system-optimization-recommendation-flow";

export async function runOptimization(volume?: string): Promise<string> {
    try {
        // Call Genkit flow to get optimization recommendation
        const recommendation = await getSystemOptimizationRecommendation();

        let resultMessage = recommendation.recommendation;

        if (typeof window !== 'undefined' && window.__TAURI__) {
            const { invoke } = await import('@tauri-apps/api/tauri');
            if (volume) {
                try {
                    const defragResult = await invoke<string>('disk_defrag', { volume });
                    resultMessage += `\nResultado da desfragmentação do disco: ${defragResult}`;
                } catch (defragError: any) {
                    console.error('Erro durante a desfragmentação do disco:', defragError);
                    resultMessage += `\nErro durante a desfragmentação do disco: ${defragError.message || 'Desfragmentação do disco falhou.'}`;
                }
            }
        } else {
            resultMessage += `\nDesfragmentação do disco ignorada. Executando em ambiente web.`;
        }
        return resultMessage;
    } catch (error: any) {
        console.error('Erro durante a otimização do sistema:', error);
        throw new Error(error.message || 'A otimização do sistema falhou.');
    }
}
'
