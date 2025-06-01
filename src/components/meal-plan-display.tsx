
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { GenerateMealPlanOutput } from "@/ai/schemas/generate-meal-plan-schemas";
import { Separator } from "./ui/separator";
import { CheckCircle2 } from "lucide-react";

interface MealPlanDisplayProps {
  mealPlan: GenerateMealPlanOutput | null;
}

export function MealPlanDisplay({ mealPlan }: MealPlanDisplayProps) {
  if (!mealPlan || !mealPlan.dailyPlans || mealPlan.dailyPlans.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Generated Meal Plan</CardTitle>
        <CardDescription>Here's a 7-day personalized meal plan based on your inputs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {mealPlan.dailyPlans.map((dailyPlan, index) => (
            <AccordionItem value={`item-${index}`} key={dailyPlan.day}>
              <AccordionTrigger className="text-lg font-headline text-primary hover:no-underline">
                {dailyPlan.day}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div>
                  <h4 className="font-semibold text-md">Breakfast:</h4>
                  <p className="text-sm text-muted-foreground ml-4">{dailyPlan.breakfast}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-md">Lunch:</h4>
                  <p className="text-sm text-muted-foreground ml-4">{dailyPlan.lunch}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-md">Dinner:</h4>
                  <p className="text-sm text-muted-foreground ml-4">{dailyPlan.dinner}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-md">Snacks:</h4>
                  <p className="text-sm text-muted-foreground ml-4">{dailyPlan.snacks}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {mealPlan.importantConsiderations && mealPlan.importantConsiderations.length > 0 && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="font-headline text-xl mb-3 text-primary">Important Considerations</h3>
              <ul className="space-y-2">
                {mealPlan.importantConsiderations.map((consideration, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
