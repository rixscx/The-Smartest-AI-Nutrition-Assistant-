
// src/ai/flows/suggest-food-swaps.ts
'use server';

/**
 * @fileOverview Suggests smart food swaps with nutritional comparisons and explanations, adapting dynamically based on user feedback.
 *
 * - suggestFoodSwaps - A function that handles the suggestion of food swaps.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { SuggestFoodSwapsInputSchema, SuggestFoodSwapsOutputSchema, type SuggestFoodSwapsInput, type SuggestFoodSwapsOutput } from '@/ai/schemas/suggest-food-swaps-schemas';


export async function suggestFoodSwaps(input: SuggestFoodSwapsInput): Promise<SuggestFoodSwapsOutput> {
  return suggestFoodSwapsFlow(input);
}

const incorporateSuggestionsTool = ai.defineTool({
    name: 'incorporateSuggestions',
    description: 'Incorporate user feedback to improve future food swap suggestions.',
    inputSchema: z.object({
      feedback: z.string().describe('User feedback on the suggested food swap.'),
    }),
    outputSchema: z.string().describe('Confirmation that the feedback has been incorporated.'),
  },
  async (input) => {
    // Placeholder implementation for incorporating suggestions
    console.log(`Feedback received: ${input.feedback}`);
    return 'Feedback incorporated successfully.';
  }
);

const prompt = ai.definePrompt({
  name: 'suggestFoodSwapsPrompt',
  input: {schema: SuggestFoodSwapsInputSchema},
  output: {schema: SuggestFoodSwapsOutputSchema},
  tools: [incorporateSuggestionsTool],
  prompt: `You are a nutrition expert. A user wants to swap a food item for a healthier option.

  Original Food: {{{originalFood}}}
  User Profile: {{{userProfile}}}
  Feedback on Previous Suggestions: {{{feedback}}}

  Suggest a smart food swap, provide a nutritional comparison between the original and suggested foods, and explain why the suggested food is a healthier choice. Incorporate any available user feedback to tailor the suggestion to their needs. If the user provides feedback, call the incorporateSuggestions tool.
  `,
});

const suggestFoodSwapsFlow = ai.defineFlow(
  {
    name: 'suggestFoodSwapsFlow',
    inputSchema: SuggestFoodSwapsInputSchema,
    outputSchema: SuggestFoodSwapsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
