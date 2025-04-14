'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useState, useCallback} from "react";
import {analyzeSystem} from "@/services/system-analysis";

interface SystemAnalysisProps {
    onAnalysisComplete: () => void;
}

const SystemAnalysis = ({ onAnalysisComplete }: SystemAnalysisProps) => {
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSystemScan = useCallback(async () => {
        setIsLoading(true);
        try {
            const recommendation = await analyzeSystem();
            setAnalysisResult(recommendation);
            setAnalysisError(null);
            toast({
                title: "Análise do Sistema Concluída",
                description: recommendation,
            });
            onAnalysisComplete();
        } catch (error: any) {
            console.error("System analysis error:", error);
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
    }, [onAnalysisComplete]);

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
                    Recomendação: {analysisResult}
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
