'use server';

/**
 * @fileOverview An AI agent for suggesting improvements to user bios.
 *
 * - suggestBioImprovements - A function that takes a user bio and suggests improvements.
 * - SuggestBioImprovementsInput - The input type for the suggestBioImprovements function.
 * - SuggestBioImprovementsOutput - The return type for the suggestBioImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBioImprovementsInputSchema = z.object({
  bio: z.string().describe('The user bio to improve.'),
});
export type SuggestBioImprovementsInput = z.infer<
  typeof SuggestBioImprovementsInputSchema
>;

const SuggestBioImprovementsOutputSchema = z.object({
  improvedBio: z.string().describe('The improved user bio suggestion.'),
});
export type SuggestBioImprovementsOutput = z.infer<
  typeof SuggestBioImprovementsOutputSchema
>;

export async function suggestBioImprovements(
  input: SuggestBioImprovementsInput
): Promise<SuggestBioImprovementsOutput> {
  return suggestBioImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBioImprovementsPrompt',
  input: {schema: SuggestBioImprovementsInputSchema},
  output: {schema: SuggestBioImprovementsOutputSchema},
  prompt: `You are an AI expert in crafting engaging and effective user bios.

  Please review the user's bio and suggest improvements to make it more impactful and appealing.

  User Bio: {{{bio}}}
  \n  Improved Bio:`,
});

const suggestBioImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestBioImprovementsFlow',
    inputSchema: SuggestBioImprovementsInputSchema,
    outputSchema: SuggestBioImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
