'use server';

/**
 * @fileOverview Provides available drive volumes.
 *
 * - getAvailableVolumes - A function that returns the available drive volumes.
 * - AvailableVolumesOutput - The output type for the getAvailableVolumes function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AvailableVolumesOutputSchema = z.object({
    volumes: z.array(z.string()).describe('An array of available drive volumes.'),
});
export type AvailableVolumesOutput = z.infer<typeof AvailableVolumesOutputSchema>;

export async function getAvailableVolumes(): Promise<AvailableVolumesOutput> {
    return availableVolumesFlow({});
}

const prompt = ai.definePrompt({
    name: 'availableVolumesPrompt',
    output: {
        schema: z.object({
            volumes: z.array(z.string()).describe('An array of available drive volumes.'),
        }),
    },
    prompt: `You are an expert system administrator. Provide a JSON array of drive letters available on the system. Use powershell command "Get-PSDrive -PSProvider FileSystem | Where {$_.Root -match '^[A-Z]:\\'} | ForEach-Object {$_.Root.TrimEnd('\\')}" to get the list of volumes. Return it as a JSON array.
      `,
});

const availableVolumesFlow = ai.defineFlow<z.ZodObject<never>, typeof AvailableVolumesOutputSchema>(
    {
        name: 'availableVolumesFlow',
        inputSchema: z.object({}),
        outputSchema: AvailableVolumesOutputSchema,
    },
    async () => {
        const {output} = await prompt({});
        return output!;
    }
);
