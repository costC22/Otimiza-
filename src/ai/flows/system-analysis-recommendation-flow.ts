'use server';

/**
 * @fileOverview Provides a system analysis AI agent.
 *
 * - getSystemAnalysisRecommendation - A function that handles the system analysis process.
 * - SystemAnalysisRecommendationOutput - The return type for the getSystemAnalysisRecommendation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SystemAnalysisRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('An actionable recommendation to address performance bottlenecks identified during system analysis.'),
});
export type SystemAnalysisRecommendationOutput = z.infer<typeof SystemAnalysisRecommendationOutputSchema>;

export async function getSystemAnalysisRecommendation(): Promise<SystemAnalysisRecommendationOutput> {
  return systemAnalysisRecommendationFlow({});
}

const prompt = ai.definePrompt({
  name: 'systemAnalysisRecommendationPrompt',
  output: {
    schema: z.object({
      recommendation: z.string().describe('An actionable recommendation to address performance bottlenecks identified during system analysis.'),
    }),
  },
  prompt: `You are an expert system administrator. Analyze the system and provide one actionable recommendation to address performance bottlenecks. The recommendation should be clear, concise, and easily understood by a non-technical user.`,
});

const systemAnalysisRecommendationFlow = ai.defineFlow<z.ZodObject<never>, typeof SystemAnalysisRecommendationOutputSchema>(
  {
    name: 'systemAnalysisRecommendationFlow',
    inputSchema: z.object({}),
    outputSchema: SystemAnalysisRecommendationOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
