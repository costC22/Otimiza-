'use server';

/**
 * @fileOverview Provides a system optimization AI agent.
 *
 * - getSystemOptimizationRecommendation - A function that handles the system optimization process.
 * - SystemOptimizationRecommendationOutput - The return type for the getSystemOptimizationRecommendation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SystemOptimizationRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('A comprehensive step-by-step guide for optimizing system performance.'),
});
export type SystemOptimizationRecommendationOutput = z.infer<typeof SystemOptimizationRecommendationOutputSchema>;

export async function getSystemOptimizationRecommendation(): Promise<SystemOptimizationRecommendationOutput> {
  return systemOptimizationRecommendationFlow({});
}

const prompt = ai.definePrompt({
  name: 'systemOptimizationRecommendationPrompt',
  output: {
    schema: z.object({
      recommendation: z.string().describe('A comprehensive step-by-step guide for optimizing system performance.'),
    }),
  },
  prompt: `You are an expert system administrator. Provide a comprehensive step-by-step guide for optimizing system performance. Include steps for:

1.  Removing temporary files
2.  Optimizing memory
3.  Clearing DNS cache
4.  Disk cleanup
`,
});

const systemOptimizationRecommendationFlow = ai.defineFlow<z.ZodObject<never>, typeof SystemOptimizationRecommendationOutputSchema>(
  {
    name: 'systemOptimizationRecommendationFlow',
    inputSchema: z.object({}),
    outputSchema: SystemOptimizationRecommendationOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
