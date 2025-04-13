'use server';

import {getSystemOptimizationRecommendation} from "@/ai/flows/system-optimization-recommendation-flow";

export async function runOptimization(): Promise<string> {
  try {
    // Call Genkit flow to get optimization recommendation
    const recommendation = await getSystemOptimizationRecommendation();
    return recommendation.recommendation;
  } catch (error: any) {
    console.error('Erro durante a otimização do sistema:', error);
    throw new Error(error.message || 'A otimização do sistema falhou.');
  }
}
