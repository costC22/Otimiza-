'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useCallback} from "react";

const SystemAnalysis = () => {
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSystemScan = useCallback(async () => {
        setIsLoading(true);
        try {
            let systemInfo = '';

            if (typeof window !== 'undefined' && (window as any).__TAURI__) {
                try {
                    const {invoke} = await import('@tauri-apps/api/tauri');
                    systemInfo = await invoke<string>('get_system_info');
                } catch (error: any) {
                    console.error('Falha ao obter informações do sistema via Tauri:', error);
                    systemInfo = `Falha ao obter informações do sistema: ${error.message || 'Erro desconhecido'}`;
                }
            } else {
                console.log('Tauri não está disponível, executando versão web.');
                systemInfo = `Análise do sistema não implementada para versão web. Por favor, use o aplicativo Tauri.`;
            }

            setAnalysisResult(systemInfo);
            setAnalysisError(null);
            toast({
                title: "Análise do Sistema Concluída",
                description: systemInfo,
            });
        } catch (error: any) {
            console.error("Erro na análise do sistema:", error);
            setAnalysisResult(null);
            setAnalysisError(error.message || "Falha ao analisar o sistema.");
            toast({
                title: "Falha na Análise do Sistema",
                description: error.message || "Falha ao analisar o sistema.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            <p className="text-muted-foreground">
                Analise seu sistema em busca de arquivos temporários, processos desnecessários e potenciais gargalos de
                desempenho.
            </p>
            <Button disabled={isLoading} onClick={handleSystemScan}>
                {isLoading ? "Analisando..." : "Executar Análise do Sistema"}
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
