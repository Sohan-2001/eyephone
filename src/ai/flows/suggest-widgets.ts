'use server';

/**
 * @fileOverview An AI agent that suggests relevant widgets based on user usage patterns and current context.
 *
 * - suggestWidgets - A function that suggests widgets.
 * - SuggestWidgetsInput - The input type for the suggestWidgets function.
 * - SuggestWidgetsOutput - The return type for the suggestWidgets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWidgetsInputSchema = z.object({
  usagePatterns: z
    .string()
    .describe(
      'A description of the users usage patterns, including frequently used apps and widgets.'
    ),
  currentContext: z
    .string()
    .describe(
      'A description of the users current context, including time of day, location, and activity.'
    ),
});
export type SuggestWidgetsInput = z.infer<typeof SuggestWidgetsInputSchema>;

const SuggestWidgetsOutputSchema = z.object({
  suggestedWidgets: z
    .array(z.string())
    .describe('A list of suggested widgets based on the user data.'),
});
export type SuggestWidgetsOutput = z.infer<typeof SuggestWidgetsOutputSchema>;

export async function suggestWidgets(input: SuggestWidgetsInput): Promise<SuggestWidgetsOutput> {
  return suggestWidgetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWidgetsPrompt',
  input: {schema: SuggestWidgetsInputSchema},
  output: {schema: SuggestWidgetsOutputSchema},
  prompt: `You are a widget recommendation expert.

Based on the user's usage patterns and current context, suggest a list of widgets that would be most useful to them.

Usage Patterns: {{{usagePatterns}}}
Current Context: {{{currentContext}}}

Widgets: {{suggestedWidgets}}`,
});

const suggestWidgetsFlow = ai.defineFlow(
  {
    name: 'suggestWidgetsFlow',
    inputSchema: SuggestWidgetsInputSchema,
    outputSchema: SuggestWidgetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
