
import {z} from 'genkit';

export const SuggestFoodSwapsInputSchema = z.object({
  originalFood: z.string().describe('The food item to be swapped.'),
  userProfile: z.string().describe('The user profile including dietary restrictions, preferences, and health goals.'),
  feedback: z.string().optional().describe('Optional user feedback on previous suggestions.'),
});
export type SuggestFoodSwapsInput = z.infer<typeof SuggestFoodSwapsInputSchema>;

export const SuggestFoodSwapsOutputSchema = z.object({
  suggestedFood: z.string().describe('The suggested food swap.'),
  nutritionalComparison: z.string().describe('A comparison of the nutritional values of the original and suggested foods.'),
  explanation: z.string().describe('An explanation of why the suggested food is a healthier choice.'),
});
export type SuggestFoodSwapsOutput = z.infer<typeof SuggestFoodSwapsOutputSchema>;
