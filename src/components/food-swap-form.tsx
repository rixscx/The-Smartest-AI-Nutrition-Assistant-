
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { suggestFoodSwaps } from "@/ai/flows/suggest-food-swaps";
import type { SuggestFoodSwapsInput, SuggestFoodSwapsOutput } from "@/ai/schemas/suggest-food-swaps-schemas";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  originalFood: z.string().min(1, "Original food item is required."),
  userProfile: z.string().min(1, "User profile information is required."),
  feedback: z.string().optional(),
});

type FoodSwapFormValues = z.infer<typeof formSchema>;

interface FoodSwapFormProps {
  onFoodSwapSuggested: (suggestion: SuggestFoodSwapsOutput) => void;
  onError: (errorMessage: string) => void;
}

export function FoodSwapForm({ onFoodSwapSuggested, onError }: FoodSwapFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FoodSwapFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalFood: "",
      userProfile: "Healthy adult aiming for balanced nutrition.", // Default profile
      feedback: "",
    },
  });

  async function onSubmit(values: FoodSwapFormValues) {
    setIsLoading(true);
    try {
      const input: SuggestFoodSwapsInput = {
        originalFood: values.originalFood,
        userProfile: values.userProfile,
        feedback: values.feedback || undefined,
      };
      const result = await suggestFoodSwaps(input);
      if (result.suggestedFood && result.nutritionalComparison && result.explanation) {
        onFoodSwapSuggested(result);
      } else {
        onError("Failed to suggest food swap. The AI returned incomplete information.");
      }
    } catch (error) {
      console.error("Error suggesting food swap:", error);
      onError("An unexpected error occurred while suggesting food swap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Smart Food Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="originalFood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Food Item</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., White rice, potato chips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Profile / Dietary Context</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Weight loss, low carb, high protein" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback on Previous Suggestions (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., I prefer plant-based options" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Suggest Swap
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
