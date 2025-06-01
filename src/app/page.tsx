
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NutritionForm } from "@/components/nutrition-form";
import { MealPlanDisplay } from "@/components/meal-plan-display";
import { FoodSwapForm } from "@/components/food-swap-form";
import { FoodSwapDisplay } from "@/components/food-swap-display";
import { Chatbot } from "@/components/chatbot";
import { useToast } from "@/hooks/use-toast";
import type { SuggestFoodSwapsOutput } from "@/ai/schemas/suggest-food-swaps-schemas";
import type { GenerateMealPlanOutput } from "@/ai/schemas/generate-meal-plan-schemas";

export default function HomePage() {
  const [mealPlan, setMealPlan] = useState<GenerateMealPlanOutput | null>(null);
  const [foodSwapSuggestion, setFoodSwapSuggestion] = useState<SuggestFoodSwapsOutput | null>(null);
  const { toast } = useToast();

  const handleMealPlanGenerated = (plan: GenerateMealPlanOutput) => {
    setMealPlan(plan);
    toast({
      title: "Meal Plan Generated!",
      description: "Your personalized meal plan is ready.",
      variant: "default",
    });
  };

  const handleFoodSwapSuggested = (suggestion: SuggestFoodSwapsOutput) => {
    setFoodSwapSuggestion(suggestion);
    toast({
      title: "Food Swap Suggested!",
      description: "A smart food swap suggestion is available.",
      variant: "default",
    });
  };
  
  const handleError = (errorMessage: string) => {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <Tabs defaultValue="meal-plan" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 bg-primary/10">
          <TabsTrigger value="meal-plan" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Personalized Meal Plan</TabsTrigger>
          <TabsTrigger value="food-swap" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Smart Food Swap</TabsTrigger>
          <TabsTrigger value="ai-chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Chat Assistant</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meal-plan">
          <div className="space-y-8">
            <NutritionForm onMealPlanGenerated={handleMealPlanGenerated} onError={handleError} />
            <MealPlanDisplay mealPlan={mealPlan} />
          </div>
        </TabsContent>
        
        <TabsContent value="food-swap">
          <div className="space-y-8">
            <FoodSwapForm onFoodSwapSuggested={handleFoodSwapSuggested} onError={handleError} />
            <FoodSwapDisplay suggestion={foodSwapSuggestion} />
          </div>
        </TabsContent>

        <TabsContent value="ai-chat">
          <Chatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
}
