
'use server';
/**
 * @fileOverview A general purpose AI chatbot flow.
 *
 * - chatWithAI - A function to send a message to the chatbot and get a response.
 */

import {ai} from '@/ai/genkit';
import { UserMessageInputSchema, ChatbotResponseOutputSchema, type UserMessageInput, type ChatbotResponseOutput } from '@/ai/schemas/chat-flow-schemas';

export async function chatWithAI(input: UserMessageInput): Promise<ChatbotResponseOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: UserMessageInputSchema},
  output: {schema: ChatbotResponseOutputSchema},
  prompt: `You are a friendly, helpful, and versatile AI assistant. Your goal is to answer the user's questions on any topic clearly, directly, and concisely.
You can discuss general topics, including things like nutrition, recipes, and general well-being.
However, you must not provide personalized medical advice, diagnoses, or treatment plans. If a user asks for specific medical advice or personalized health recommendations, politely state that you cannot provide medical advice and suggest they consult a qualified healthcare professional.
For general knowledge questions, like "What are some healthy breakfast recipes?", provide helpful, general information.
Avoid using any special formatting such as lists (e.g., "1. Item A") or markdown unless it's essential for presenting complex data or specifically requested by the user. Strive for responses that are straightforward and to the point.

User message: {{{message}}}

Your response:`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: UserMessageInputSchema,
    outputSchema: ChatbotResponseOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

