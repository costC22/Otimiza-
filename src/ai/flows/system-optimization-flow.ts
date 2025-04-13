'use server';

/**
 * @fileOverview A system optimization AI agent.
 *
 * - runSystemOptimization - A function that handles the system optimization process.
 * - RunSystemOptimizationInput - The input type for the runSystemOptimization function.
 * - RunSystemOptimizationOutput - The return type for the runSystemOptimization function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RunSystemOptimizationInputSchema = z.object({
  optimizationType: z.enum(['memory', 'tempFiles', 'dns', 'disk']).describe('The type of optimization to run.'),
});
export type RunSystemOptimizationInput = z.infer<typeof RunSystemOptimizationInputSchema>;

const RunSystemOptimizationOutputSchema = z.object({
  result: z.string().describe('The result of the system optimization.'),
});
export type RunSystemOptimizationOutput = z.infer<typeof RunSystemOptimizationOutputSchema>;

export async function runSystemOptimization(input: RunSystemOptimizationInput): Promise<RunSystemOptimizationOutput> {
  return runSystemOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'runSystemOptimizationPrompt',
  input: {
    schema: z.object({
      optimizationType: z.enum(['memory', 'tempFiles', 'dns', 'disk']).describe('The type of optimization to run.'),
    }),
  },
  output: {
    schema: z.object({
      result: z.string().describe('The result of the system optimization.'),
    }),
  },
  prompt: `You are an expert system administrator. Use the command line (with python) to optimize the system's performance based on the requested optimization type.

Optimization Type: {{{optimizationType}}}

Respond in a way that a user can understand.`,
});

const runSystemOptimizationFlow = ai.defineFlow<
  typeof RunSystemOptimizationInputSchema,
  typeof RunSystemOptimizationOutputSchema
>(
  {
    name: 'runSystemOptimizationFlow',
    inputSchema: RunSystemOptimizationInputSchema,
    outputSchema: RunSystemOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
