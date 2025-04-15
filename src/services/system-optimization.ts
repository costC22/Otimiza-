'use server';

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
