import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyCQogB99Oll-s7P_DwXoBSpAHsXgbi9Qiw',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
