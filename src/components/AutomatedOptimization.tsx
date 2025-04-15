'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useTransition, useEffect, useCallback} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getSystemOptimizationRecommendation} from "@/ai/flows/system-optimization-recommendation-flow";

const AutomatedOptimization = () => {
    const [isPending, startTransition] = useTransition();
    const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
    const [availableVolumes, setAvailableVolumes] = useState<string[]>([]);
    const [isTauri, setIsTauri] = useState(false);

    useEffect(() => {
        setIsTauri(typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined);
    }, []);

    const fetchVolumes = useCallback(async () => {
        if (isTauri) {
            try {
                const {invoke} = await import('@tauri-apps/api/tauri');
                const volumes = await invoke<string[]>('get_available_volumes');
                setAvailableVolumes(volumes);
            } catch (error) {
                console.error("Falha ao obter volumes", error);
                toast({
                    title: "Falha ao obter volumes",
                    description: "Não foi possível recuperar os volumes disponíveis.",
                    variant: "destructive",
                });
                setAvailableVolumes([]);
            }
        } else {
            setAvailableVolumes([]);
        }
    }, [isTauri]);

    useEffect(() => {
        fetchVolumes();
    }, [fetchVolumes]);

    const handleOptimization = async () => {
        if (!selectedVolume) {
            toast({
                title: "Nenhum Volume Selecionado",
                description: "Por favor, selecione um volume antes de executar a otimização.",
                variant: "warning",
            });
            return;
        }

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
        <div className="flex flex-col space-y-4">
            <p className="text-muted-foreground">
                Executar scripts automatizados para limpar arquivos temporários, desativar programas de inicialização
                desnecessários e otimizar as configurações do sistema.
            </p>

            <Select onValueChange={setSelectedVolume} disabled={!isTauri}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecionar Volume"/>
                </SelectTrigger>
                <SelectContent>
                    {availableVolumes.map((volume) => (
                        <SelectItem key={volume} value={volume}>
                            {volume}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button onClick={handleOptimization} disabled={isPending || !selectedVolume}>
                {isPending ? "Otimizando..." : "Executar Otimização Automática"}
            </Button>
            {!isTauri && (
                <p className="text-muted-foreground">
                    Esta funcionalidade está disponível apenas na versão Tauri.
                </p>
            )}
        </div>
    );
};

export default AutomatedOptimization;

async function runOptimization(volume?: string): Promise<string> {
    try {
        // Call Genkit flow to get optimization recommendation
        const recommendation = await getSystemOptimizationRecommendation();

        let resultMessage = recommendation.recommendation;

        if (typeof window !== 'undefined' && (window as any).__TAURI__) {
            try {
                const {invoke} = await import('@tauri-apps/api/tauri');
                if (volume) {
                    const defragResult = await invoke<string>('disk_defrag', {volume});
                    resultMessage += `\nResultado da desfragmentação do disco: ${defragResult}`;
                }
            } catch (defragError: any) {
                console.error("Erro durante a desfragmentação do disco:", defragError);
                resultMessage += `\nErro durante a desfragmentação do disco: ${defragError.message || "Desfragmentação do disco falhou."}`;
            }
        } else {
            resultMessage += `\nDesfragmentação do disco ignorada. Executando em ambiente web.`;
        }

        return resultMessage;
    } catch (error: any) {
        console.error("Erro durante a otimização do sistema:", error);
        throw new Error(error.message || "A otimização do sistema falhou.");
    }
}
