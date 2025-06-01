
import {z} from 'genkit';

export const GenerateMealPlanInputSchema = z.object({
  healthGoals: z.string().describe('The health goals of the user, e.g., weight loss, muscle gain, or general wellness.'),
  allergies: z.string().describe('Any food allergies the user has, e.g., peanuts, gluten, or dairy. If none, specify "None".'),
  dietaryPreferences: z.string().describe('The dietary preferences of the user, e.g., vegetarian, vegan, keto, or paleo. If none, specify "None".'),
  medicalConditions: z.string().describe('Any medical conditions the user has, e.g., diabetes, heart disease, or high blood pressure. If none, specify "None".'),
});
export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

const DailyMealPlanSchema = z.object({
  day: z.string().describe("The day of the week or day number (e.g., Day 1, Monday)."),
  breakfast: z.string().describe("Description of the breakfast meal."),
  lunch: z.string().describe("Description of the lunch meal."),
  dinner: z.string().describe("Description of the dinner meal."),
  snacks: z.string().describe("Description of snacks for the day (can be a list or a single string)."),
});

export const GenerateMealPlanOutputSchema = z.object({
  dailyPlans: z.array(DailyMealPlanSchema).describe("An array of daily meal plans, typically for 7 days."),
  importantConsiderations: z.array(z.string()).describe("A list of important general advice points related to the meal plan, like hydration, portion control, etc."),
});
export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;
