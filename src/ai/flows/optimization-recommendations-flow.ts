'use server';

/**
 * @fileOverview Provides optimization recommendations for the system.
 *
 * - getOptimizationRecommendations - A function that returns optimization recommendations.
 * - OptimizationRecommendationsOutput - The output type for the getOptimizationRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const OptimizationRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of system optimization recommendations.'),
});
export type OptimizationRecommendationsOutput = z.infer<typeof OptimizationRecommendationsOutputSchema>;

export async function getOptimizationRecommendations(): Promise<OptimizationRecommendationsOutput> {
  return optimizationRecommendationsFlow({});
}

const prompt = ai.definePrompt({
  name: 'optimizationRecommendationsPrompt',
  output: {
    schema: z.object({
      recommendations: z.array(z.string()).describe('An array of system optimization recommendations.'),
    }),
  },
  prompt: `You are an expert system administrator. Provide a list of recommendations to optimize the system's performance. Recommendations should be actionable and easily understood.  The recommendations should not be repetitive and only provide unique suggestions.  Keep each suggestion short and to the point. Return it as a JSON array.
      `,
});

const optimizationRecommendationsFlow = ai.defineFlow<z.ZodObject<never>, typeof OptimizationRecommendationsOutputSchema>(
  {
    name: 'optimizationRecommendationsFlow',
    inputSchema: z.object({}),
    outputSchema: OptimizationRecommendationsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
