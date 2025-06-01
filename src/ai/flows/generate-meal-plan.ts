
'use server';

/**
 * @fileOverview AI agent that generates personalized meal plans based on user profile, preferences, and health goals.
 *
 * - generateMealPlan - A function that handles the meal plan generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateMealPlanInputSchema, GenerateMealPlanOutputSchema, type GenerateMealPlanInput, type GenerateMealPlanOutput } from '@/ai/schemas/generate-meal-plan-schemas';


export async function generateMealPlan(input: GenerateMealPlanInput): Promise<GenerateMealPlanOutput> {
  return generateMealPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  input: {schema: GenerateMealPlanInputSchema},
  output: {schema: GenerateMealPlanOutputSchema},
  prompt: `You are a nutrition expert. Generate a personalized 7-day meal plan based on the user's health goals, allergies, dietary preferences, and medical conditions.
Provide the output as a JSON object that conforms to the output schema.
Each day should include breakfast, lunch, dinner, and snacks.
Also, include a list of important general considerations (like hydration, portion control, customization advice, exercise, and consultation with professionals).

User Profile:
Health Goals: {{{healthGoals}}}
Allergies: {{{allergies}}}
Dietary Preferences: {{{dietaryPreferences}}}
Medical Conditions: {{{medicalConditions}}}

Generate the meal plan now.`,
});

const generateMealPlanFlow = ai.defineFlow(
  {
    name: 'generateMealPlanFlow',
    inputSchema: GenerateMealPlanInputSchema,
    outputSchema: GenerateMealPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI did not return an output for meal plan generation.");
    }
    // Ensure the output structure matches, especially if AI might return a stringified JSON inside a field.
    // This basic check assumes the AI directly returns the structured object.
    // If AI returns output like { mealPlan: "{...}" }, further parsing would be needed.
    // Given schema guidance, direct structured output is expected.
    if (!output.dailyPlans || !output.importantConsiderations) {
        console.error("Unexpected AI output structure:", output);
        throw new Error("AI returned an improperly structured meal plan. Expected dailyPlans and importantConsiderations.");
    }
    return output;
  }
);
