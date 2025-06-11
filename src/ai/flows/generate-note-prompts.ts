// 'use server'
'use server';

/**
 * @fileOverview Generates suggested note prompts based on a profile's data.
 *
 * - generateNotePrompts - A function that generates note prompts.
 * - GenerateNotePromptsInput - The input type for the generateNotePrompts function.
 * - GenerateNotePromptsOutput - The return type for the generateNotePrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNotePromptsInputSchema = z.object({
  profileData: z
    .string()
    .describe('The profile data of the person to connect with.'),
});
export type GenerateNotePromptsInput = z.infer<typeof GenerateNotePromptsInputSchema>;

const GenerateNotePromptsOutputSchema = z.object({
  prompts: z
    .array(z.string())
    .describe('An array of suggested note prompts.'),
});
export type GenerateNotePromptsOutput = z.infer<typeof GenerateNotePromptsOutputSchema>;

export async function generateNotePrompts(input: GenerateNotePromptsInput): Promise<GenerateNotePromptsOutput> {
  return generateNotePromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotePromptsPrompt',
  input: {schema: GenerateNotePromptsInputSchema},
  output: {schema: GenerateNotePromptsOutputSchema},
  prompt: `You are an AI assistant that generates personalized note prompts for connection requests.

  Given the following profile data, generate 3 distinct note prompts that the user can use as a starting point to write a personalized note:
  
  Profile Data: {{{profileData}}}
  
  The prompts should be concise and engaging, tailored to encourage a meaningful connection.
  The output should be an array of strings. Do not begin your answer with any introductory text, and ensure each prompt is unique and relevant to the provided profile data.`,
});

const generateNotePromptsFlow = ai.defineFlow(
  {
    name: 'generateNotePromptsFlow',
    inputSchema: GenerateNotePromptsInputSchema,
    outputSchema: GenerateNotePromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
