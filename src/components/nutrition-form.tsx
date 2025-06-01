
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateMealPlan } from "@/ai/flows/generate-meal-plan";
import type { GenerateMealPlanInput, GenerateMealPlanOutput } from "@/ai/schemas/generate-meal-plan-schemas";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  healthGoals: z.string().min(1, "Health goals are required."),
  allergies: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  medicalConditions: z.string().optional(),
});

type NutritionFormValues = z.infer<typeof formSchema>;

interface NutritionFormProps {
  onMealPlanGenerated: (mealPlan: GenerateMealPlanOutput) => void;
  onError: (errorMessage: string) => void;
}

export function NutritionForm({ onMealPlanGenerated, onError }: NutritionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NutritionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthGoals: "",
      allergies: "",
      dietaryPreferences: "",
      medicalConditions: "",
    },
  });

  async function onSubmit(values: NutritionFormValues) {
    setIsLoading(true);
    try {
      const input: GenerateMealPlanInput = {
        healthGoals: values.healthGoals,
        allergies: values.allergies || "None",
        dietaryPreferences: values.dietaryPreferences || "None",
        medicalConditions: values.medicalConditions || "None",
      };
      const result = await generateMealPlan(input);
      if (result && result.dailyPlans && result.importantConsiderations) {
        onMealPlanGenerated(result);
      } else {
        onError("Failed to generate meal plan. The AI returned incomplete or improperly structured data.");
      }
    } catch (error) {
      console.error("Error generating meal plan:", error);
      let errorMessage = "An unexpected error occurred while generating the meal plan. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Personalized Meal Plan</CardTitle>
        <CardDescription>Fill in your details below to generate a customized meal plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="healthGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Goals</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Weight loss, muscle gain, general wellness" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies (e.g., Peanuts, gluten, dairy)</FormLabel>
                  <FormControl>
                    <Input placeholder="Leave blank or type 'None' if no allergies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dietaryPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Preferences (e.g., Vegetarian, vegan, keto)</FormLabel>
                  <FormControl>
                    <Input placeholder="Leave blank or type 'None' if no specific preferences" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Conditions (e.g., Diabetes, high blood pressure)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Leave blank or type 'None' if no relevant conditions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Meal Plan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
