// SummarizeConnectionHistory.ts
'use server';

/**
 * @fileOverview Generates a summary of a connection's history and profile data.
 *
 * - summarizeConnectionHistory - A function that generates a summary of a connection's history.
 * - SummarizeConnectionHistoryInput - The input type for the summarizeConnectionHistory function.
 * - SummarizeConnectionHistoryOutput - The return type for the summarizeConnectionHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConnectionHistoryInputSchema = z.object({
  profileData: z
    .string()
    .describe('Profile data of the connection, including name, job title, and company.'),
  interactionHistory: z
    .string()
    .describe('A summary of past interactions with the connection.'),
});

export type SummarizeConnectionHistoryInput = z.infer<
  typeof SummarizeConnectionHistoryInputSchema
>;

const SummarizeConnectionHistoryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the connection history and profile data.'),
});

export type SummarizeConnectionHistoryOutput = z.infer<
  typeof SummarizeConnectionHistoryOutputSchema
>;

export async function summarizeConnectionHistory(
  input: SummarizeConnectionHistoryInput
): Promise<SummarizeConnectionHistoryOutput> {
  return summarizeConnectionHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConnectionHistoryPrompt',
  input: {schema: SummarizeConnectionHistoryInputSchema},
  output: {schema: SummarizeConnectionHistoryOutputSchema},
  prompt: `You are an AI assistant helping the user remember key details about their connections.

  Based on the following profile data and interaction history, generate a concise "Private Note" draft summarizing the key details about this connection.

  Profile Data: {{{profileData}}}
  Interaction History: {{{interactionHistory}}}

  Summary: `,
});

const summarizeConnectionHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeConnectionHistoryFlow',
    inputSchema: SummarizeConnectionHistoryInputSchema,
    outputSchema: SummarizeConnectionHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
