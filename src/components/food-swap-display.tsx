
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SuggestFoodSwapsOutput } from "@/ai/schemas/suggest-food-swaps-schemas";

interface FoodSwapDisplayProps {
  suggestion: SuggestFoodSwapsOutput | null;
}

export function FoodSwapDisplay({ suggestion }: FoodSwapDisplayProps) {
  if (!suggestion) {
    return null;
  }

  return (
    <Card className="mt-8 w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Food Swap Suggestion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg font-headline text-primary">Suggested Swap: {suggestion.suggestedFood}</h3>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium text-md font-headline">Nutritional Comparison:</h4>
          <pre className="whitespace-pre-wrap text-sm font-sans bg-muted p-3 rounded-md mt-1 overflow-x-auto">
            {suggestion.nutritionalComparison}
          </pre>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium text-md font-headline">Explanation:</h4>
          <p className="text-sm font-sans text-muted-foreground mt-1 leading-relaxed">{suggestion.explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
